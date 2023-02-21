import React from 'react';
import {StyleSheet, View} from 'react-native';
import {UserPhotoLoading} from '../../common';
import {Colors, Layout} from '../../../constants';

const CommentLoading = () => (
  <View style={styles.row}>
    <UserPhotoLoading size={36} />
    <View style={styles.comment}>
      <View style={styles.name} />
      <View style={styles.text} />
      <View style={styles.replyWrapper}>
        <View style={styles.reply} />
        <View style={styles.thumb} />
        <View style={styles.thumb} />
      </View>
    </View>
  </View>
);

export default CommentLoading;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: Layout.margin + Layout.halfMargin,
  },
  comment: {
    width: Layout.window.width - 45 - Layout.padding - Layout.halfPadding,
    paddingLeft: Layout.halfPadding,
    marginTop: 3,
  },
  name: {
    backgroundColor: Colors.loadingOverlay,
    height: 12,
    width: 100,
    marginBottom: 10,
    borderRadius: 2,
  },
  text: {
    backgroundColor: Colors.loadingOverlay,
    height: 12,
    width: 200,
    borderRadius: 2,
    marginBottom: 16,
  },
  replyWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  reply: {
    backgroundColor: Colors.loadingOverlay,
    height: 12,
    width: 50,
    borderRadius: 2,
    marginRight: Layout.halfMargin,
  },
  thumb: {
    backgroundColor: Colors.loadingOverlay,
    height: 12,
    width: 20,
    borderRadius: 2,
    marginRight: Layout.halfMargin,
  },
});
