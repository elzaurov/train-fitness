import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from './VideoPlayer';
import ActivityVideoHOC from './ActivityVideoHOC';

const ActivityVideo = ({disposed, ...props}) =>
  !disposed ? <VideoPlayer controls {...props} /> : null;

ActivityVideo.propTypes = {
  disposed: PropTypes.bool.isRequired,
};

export default ActivityVideoHOC(ActivityVideo);
