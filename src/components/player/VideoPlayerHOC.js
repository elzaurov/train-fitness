import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const VideoPlayerHOCWrapper = (InnerComponent) => {
  class VideoPlayerHOC extends Component {
    constructor(props) {
      super(props);

      this.state = {fullscreen: false};
    }

    render() {
      const {remoteConfigs} = this.props;
      const type = remoteConfigs.video_player_type;

      return <InnerComponent {...this.props} {...this.state} type={type} />;
    }
  }

  VideoPlayerHOC.propTypes = {
    remoteConfigs: PropTypes.shape({
      video_player: PropTypes.string,
    }).isRequired,
  };

  const mapStateToProps = (state) => ({
    remoteConfigs: state.remoteConfigs,
  });

  return connect(mapStateToProps)(VideoPlayerHOC);
};

export default VideoPlayerHOCWrapper;
