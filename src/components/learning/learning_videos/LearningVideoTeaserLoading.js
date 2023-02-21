import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors, Layout} from '../../../constants';

const LearningVideoTeaserLoading = () => <View style={styles.loading} />;

export default LearningVideoTeaserLoading;

const styles = StyleSheet.create({
  loading: {
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: Layout.margin,
    backgroundColor: Colors.loadingOverlay,
    borderRadius: 2,
    width: Layout.window.width - Layout.padding * 2,
    height: (193 / 343) * (Layout.window.width - Layout.padding * 2),
  },
});
