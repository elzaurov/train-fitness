import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import PlaylistVideo from '../../common/PlaylistVideo';
import { showUpgradeModal } from '../../../actions';

import { useDispatch, useSelector } from 'react-redux';

const CourseVideoList = ({
  videos,
  hasSchedule,
  playlist,
  selectedVideoKey,
  onCompleteVideo,
  onRemoveCompleteVideo,
  onSelectVideo,
}) => {
  const dispatch = useDispatch();

  const currentPlan = useSelector((state) => state.plan);
  const firstVideoKey = videos.length > 0 ? videos[0].key : null;

  const onCompleteVideoLocal = (item) => {
    if (firstVideoKey && firstVideoKey === item.video?.key && currentPlan.isFree === true) {
      dispatch(showUpgradeModal());
    }
    if (onCompleteVideo) {
      onCompleteVideo(item);
    }
  };

  const videoList =
    videos &&
    videos.map((video, index) => (
      <PlaylistVideo
        type="video"
        key={video.key}
        hasSchedule={hasSchedule}
        video={video}
        isChecked={!!playlist[video.key]}
        isInsidePlaylist={
          Object.keys(playlist).filter((key) => key === video.key).length > 0
        }
        isNextVideo={
          videos[Object.keys(playlist).length]
            ? videos[Object.keys(playlist).length].key === video.key
            : false
        }
        isSequencePlaylist={true}
        selected={selectedVideoKey === video.key}
        onCompleteVideo={onCompleteVideoLocal}
        onRemoveCompleteVideo={onRemoveCompleteVideo}
        onSelectVideo={onSelectVideo}
      />
    ));

  return <ScrollView bounces={false}>{videoList}</ScrollView>;
};

CourseVideoList.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasSchedule: PropTypes.bool.isRequired,
  playlist: PropTypes.objectOf(PropTypes.any).isRequired,
  selectedVideoKey: PropTypes.string.isRequired,
  onCompleteVideo: PropTypes.func.isRequired,
  onRemoveCompleteVideo: PropTypes.func.isRequired,
  onSelectVideo: PropTypes.func.isRequired,
};

export default CourseVideoList;
