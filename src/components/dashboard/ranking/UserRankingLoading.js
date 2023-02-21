import React from 'react';
import {StyleSheet, View} from 'react-native';
import {UserPhotoLoading} from '../../common';
import {Colors, Layout} from '../../../constants';

const UserRankingLoading = () => (
  <View style={styles.row}>
    <UserPhotoLoading size={36} />
    <View style={styles.comment}>
      <View style={styles.name} />
      <View style={styles.text} />
    </View>
  </View>
);

export default UserRankingLoading;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: Layout.padding,
    // marginBottom: Layout.halfMargin,
  },
  comment: {
    width: Layout.window.width - 45 - Layout.padding - Layout.halfPadding,
    paddingLeft: Layout.halfPadding,
    marginTop: 3,
  },
  name: {
    backgroundColor: Colors.loadingOverlay,
    height: 12,
    width: 80,
    marginBottom: 10,
    borderRadius: 2,
  },
  text: {
    backgroundColor: Colors.loadingOverlay,
    height: 12,
    width: 100,
    borderRadius: 2,
    marginBottom: 16,
  },
});
