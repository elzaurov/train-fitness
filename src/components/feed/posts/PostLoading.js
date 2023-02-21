import React from 'react';
import {StyleSheet, View} from 'react-native';
import {UserPhotoLoading} from '../../common';
import {Colors, Layout} from '../../../constants';

const PostLoading = () => (
  <View style={styles.column}>
    <View style={styles.header}>
      <UserPhotoLoading size={40} />
      <View style={styles.post}>
        <View style={styles.name} />
      </View>
    </View>
    <View style={styles.image} />
    <View style={styles.body}>
      <View style={styles.post}>
        <View style={styles.name} />
        <View style={styles.text} />
        <View style={styles.replyWrapper}>
          <View style={styles.thumb} />
          <View style={styles.thumb} />
        </View>
      </View>
    </View>
  </View>
);

export default PostLoading;

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: Layout.padding,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: Layout.margin + Layout.halfMargin,
    marginLeft: Layout.margin,
  },
  post: {
    width: Layout.window.width - 45 - Layout.padding - Layout.halfPadding,
    paddingLeft: Layout.halfMargin,
    marginTop: 10,
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
    marginBottom: Layout.padding,
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
  image: {
    backgroundColor: Colors.loadingOverlay,
    height: 300,
    width: Layout.window.width,
    marginBottom: 15,
  },
});
