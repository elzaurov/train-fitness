import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors, Layout} from '../../../constants';

const TeaserLoading = () => <View style={styles.loading} />;

export default TeaserLoading;

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
    height: Layout.window.width - Layout.padding * 2,
    width: Layout.window.width - Layout.padding * 2,
  },
});
