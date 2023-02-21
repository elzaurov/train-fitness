import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Alert} from 'react-native';
import {updateStats} from '../../../actions';
import {withMilestones} from '../../../hocs';
import {
  MILESTONE_STARTED_FIRST_ACTIVITY,
  MILESTONE_STARTED_FIRST_MIND_ACTIVITY,
  MILESTONE_FINISHED_FIRST_ACTIVITY,
  MILESTONE_FINISHED_FIRST_MIND_ACTIVITY,
} from '../../../constants';

const LearningVideoHOCWrapper = (InnerComponent) => {
  class LearningVideoHOC extends Component {
    state = {
      formVisible: false,
      progress: 0,
      duration: 0,
    };

    componentDidMount() {
      const {learningVideo, assertMilestone} = this.props;
      const {videoEmbedURL} = learningVideo;
      const isYoutube = videoEmbedURL && videoEmbedURL.includes('youtube');

      if (!isYoutube) {
        this.trackProgress();
      }

      assertMilestone(
        [
          MILESTONE_STARTED_FIRST_ACTIVITY,
          MILESTONE_STARTED_FIRST_MIND_ACTIVITY,
        ],
        {
          activityType: learningVideo.type,
        },
      );
    }

    componentWillUnmount() {
      this.stopProgress(true);

      const {learningVideo, assertMilestone} = this.props;

      assertMilestone(
        [
          MILESTONE_FINISHED_FIRST_ACTIVITY,
          MILESTONE_FINISHED_FIRST_MIND_ACTIVITY,
        ],
        {
          activityType: learningVideo.type,
        },
      );
    }

    handleAndroidPlay = () => {
      this.trackProgress();
    };

    handleProgress = ({duration}) => {
      if (duration && !this.state.duration) {
        this.setState({duration});
      }
    };

    handleChangeState = ({state}) => {
      if (state === 'playing') {
        this.trackProgress();
      } else {
        this.stopProgress();
      }
    };

    trackProgress = () => {
      this.progress = setInterval(() => {
        const {duration} = this.progress;
        const minute = 60000;
        const fiveMinutes = minute * 5;
        const {progress} = this.state;
        let newProgress = progress + 1000;

        if (duration && progress > duration) {
          newProgress = duration;
        } else if (!duration && progress > fiveMinutes) {
          newProgress = fiveMinutes;
        }

        this.setState({progress: newProgress});
      }, 1000);
    };

    stopProgress = async (isUnmount) => {
      clearInterval(this.progress);
      await this.calculateExperience(isUnmount);

      return null;
    };

    calculateExperience = async () => {
      const {learningVideo, t} = this.props;
      const {progress} = this.state;
      const type = learningVideo.type ? 'classroom' : 'gamebrain';
      const metadataType = learningVideo.type ? 'classroom' : 'game-brain';

      if (progress > 0) {
        const metadata = {classroom: 2, gamebrain: 5};

        const exp = metadata[type] || 2;
        const minute = 60000;
        const minutes = Number((progress / minute).toFixed(2));

        const stats = {
          exp: exp * Math.ceil(minutes),
          [type]: minutes,
          metadata: {
            ...learningVideo,
            url: `/learning/${metadataType}/${learningVideo.key}`,
            type: metadataType,
          },
        };

        if (minutes > 0.3) {
          this.setState({progress: 0});

          await this.props.updateStats({stats});

          Alert.alert(
            t('alert.title'),
            `${t('alert.message.part1')} ${stats.exp}xp ${t(
              'alert.message.part2',
            )} "${learningVideo.name}"!`,
            [{text: t('alert.buttons.ok'), onPress: () => {}}],
            {cancelable: true},
          );
        }

        return null;
      }
    };

    handleError = (e) => null;

    handleToggleReply = (data) => {
      const {editedComment, showInput = false} = data || {};

      this.setState((prevState) => ({
        formVisible: !prevState.formVisible,
        editedComment,
        showInput,
      }));
    };

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onAndroidPlay={this.handleAndroidPlay}
          onChangeState={this.handleChangeState}
          onProgress={this.handleProgress}
          onSetRef={this.handleSetRef}
          onError={this.handleError}
          onToggleReply={this.handleToggleReply}
        />
      );
    }
  }

  LearningVideoHOC.propTypes = {
    learningVideo: PropTypes.objectOf(PropTypes.any).isRequired,
    updateStats: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    assertMilestone: PropTypes.func.isRequired,
  };

  return connect(null, {
    updateStats,
  })(withMilestones(LearningVideoHOC));
};

export default LearningVideoHOCWrapper;
