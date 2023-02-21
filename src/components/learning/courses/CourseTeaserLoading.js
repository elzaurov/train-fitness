import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors, Layout} from '../../../constants';

const CourseTeaserLoading = () => <View style={styles.loading} />;

export default CourseTeaserLoading;

const styles = StyleSheet.create({
  loading: {
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: Colors.loadingOverlay,
    borderRadius: 2,
    marginBottom: Layout.margin,
    marginRight: Layout.margin,
    height: (Layout.window.width - Layout.padding * 3) * 0.46,
    width: (Layout.window.width - Layout.padding * 3) * 0.46,
  },
});
