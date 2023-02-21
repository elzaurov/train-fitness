import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadSingleLearningVideo} from '../../actions';

const VideoThumbnailHOCWrapper = (InnerComponent) => {
  class VideoThumbnailHOC extends Component {
    state = {
      loading: true,
      video: {},
    };

    async componentDidMount() {
      const {videoId, videoPath} = this.props;

      const video = await this.props.loadSingleLearningVideo(
        videoPath,
        videoId,
      );

      this.setState({video, loading: false});
    }

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  VideoThumbnailHOC.propTypes = {
    videoId: PropTypes.string.isRequired,
    videoPath: PropTypes.string.isRequired,
    loadSingleLearningVideo: PropTypes.func.isRequired,
  };

  return connect(null, {
    loadSingleLearningVideo,
  })(VideoThumbnailHOC);
};

export default VideoThumbnailHOCWrapper;
