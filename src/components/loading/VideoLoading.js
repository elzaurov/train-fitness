import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Colors, Layout} from '../../constants';

const VideoLoading = () => (
  <View style={styles.loading}>
    <ActivityIndicator size="large" color={Colors.white} />
  </View>
);

export default VideoLoading;

const styles = StyleSheet.create({
  loading: {
    height: Layout.window.width * (9 / 16),
    width: Layout.window.width,
    backgroundColor: Colors.loadingOverlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
