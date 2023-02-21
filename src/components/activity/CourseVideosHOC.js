import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadSingleLearningVideo} from '../../actions';

const CourseVideosHOCWrapper = (InnerComponent) => {
  class CourseVideosHOC extends Component {
    state = {
      videos: [],
      loading: true,
    };

    async componentDidMount() {
      const {videos} = this.props;

      const loadedVideos = await Promise.all(
        videos.map((videoKey) => {
          const [type, key] = videoKey.split('/');
          return this.props.loadSingleLearningVideo(type, key);
        }),
      );

      this.setState({
        loading: false,
        videos: loadedVideos,
      });
    }

    handleVideoSelect = (key, type) => {
      const { navigation } = this.props;
      navigation.push('Learning', { id: key, videoPath: type });
    };

    render() {
      return (
        <InnerComponent
          {...this.props}
          {...this.state}
          onVideoSelect={this.handleVideoSelect}
        />
      );
    }
  }

  CourseVideosHOC.propTypes = {
    type: PropTypes.string.isRequired,
    videos: PropTypes.array.isRequired,
    loadSingleLearningVideo: PropTypes.func.isRequired,
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  const mapDispatchToProps = {
    loadSingleLearningVideo,
  };

  return connect(null, mapDispatchToProps)(CourseVideosHOC);
};

export default CourseVideosHOCWrapper;
