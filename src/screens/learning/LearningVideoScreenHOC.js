import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Header} from '../../layout';
import {loadSingleLearningVideo} from '../../actions';
import {analytics} from '../../config';
import {logEvent} from '../../utils';
import {
  LEARNING_VIDEO_VIEW_EVENT,
  ANALYTICS_GAMEBRAIN_OPENED,
  ANALYTICS_CLASSROOM_OPENED,
} from '../../constants';

const LearningVideoScreenHOCWrapper = (InnerComponent) => {
  class LearningVideoScreenHOC extends Component {
    static navigationOptions = {
      title: 'LEARNING VIDEO',
      header: (props) => <Header {...props} backButton={true} />,
    };

    state = {
      loading: true,
      learningVideo: {},
      videoPath: '',
    };

    async componentDidMount() {
      const {learningVideos} = this.props;
      const {id: videoId, videoPath} = this.props.route.params ?? {};

      let learningVideo;

      if (videoPath === 'game-brain') {
        logEvent(ANALYTICS_GAMEBRAIN_OPENED);
      } else if (videoPath === 'classroom') {
        logEvent(ANALYTICS_CLASSROOM_OPENED);
      }

      if (learningVideos[videoPath]) {
        [learningVideo] = learningVideos[videoPath].filter(
          ({key}) => key === videoId,
        );
      }

      if (!learningVideo) {
        learningVideo = await this.props.loadSingleLearningVideo(
          videoPath,
          videoId,
        );
      }

      analytics.logEvent(LEARNING_VIDEO_VIEW_EVENT, {
        id: videoId,
        name: learningVideo.name,
        type: videoPath,
      });

      this.setState({
        learningVideo,
        videoPath,
        loading: false,
      });
    }

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  LearningVideoScreenHOC.propTypes = {
    route: PropTypes.object.isRequired,
    learningVideos: PropTypes.objectOf(PropTypes.any).isRequired,
    loadSingleLearningVideo: PropTypes.func.isRequired,
  };

  function mapStateToProps({learningVideos}) {
    return {learningVideos};
  }

  return connect(mapStateToProps, {
    loadSingleLearningVideo,
  })(LearningVideoScreenHOC);
};

export default LearningVideoScreenHOCWrapper;
