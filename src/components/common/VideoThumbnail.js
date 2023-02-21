/* eslint-disable no-mixed-operators */
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import VideoThumbnailHOC from './VideoThumbnailHOC';
import {Colors, Layout} from '../../constants';

const VideoThumbnail = ({
  isBasicPlan,
  loading,
  navigation,
  style,
  video,
  videoId,
  videoPath,
  isFullWidth,
}) => (
  <View
    style={[
      style,
      {
        width: isFullWidth
          ? Layout.window.width
          : Layout.window.width - Layout.padding * 2,
      },
    ]}>
    {loading ? (
      <View style={styles.loading} />
    ) : (
      <TouchableOpacity
        onPress={() =>
          isBasicPlan
            ? navigation.navigate('Learning')
            : navigation.push('Learning', {id: videoId, videoPath})
        }>
        <FastImage
          style={[
            styles.thumbnail,
            {
              width: isFullWidth
                ? Layout.window.width
                : Layout.window.width - Layout.padding * 2,
            },
          ]}
          source={{uri: video.thumbnail}}
        />
      </TouchableOpacity>
    )}
  </View>
);

VideoThumbnail.propTypes = {
  isBasicPlan: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  style: PropTypes.any,
  video: PropTypes.objectOf(PropTypes.any).isRequired,
  videoId: PropTypes.string.isRequired,
  videoPath: PropTypes.string.isRequired,
  isFullWidth: PropTypes.bool.isRequired,
};

VideoThumbnail.defaultProps = {
  style: {},
};

export default VideoThumbnailHOC(VideoThumbnail);

const styles = StyleSheet.create({
  loading: {
    backgroundColor: Colors.loadingOverlay,
    height: (193 / 343) * (Layout.window.width - Layout.padding * 2),
  },
  thumbnail: {
    borderRadius: 2,
    height: (193 / 343) * (Layout.window.width - Layout.padding * 2),
  },
});
