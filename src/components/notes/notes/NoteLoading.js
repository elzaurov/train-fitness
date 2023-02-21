import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors, Layout} from '../../../constants';
import {CommentLoading} from '../../comments';

const NoteLoading = () => (
  <View style={styles.note}>
    <View style={[styles.row, styles.metadata]}>
      <View style={styles.feeling} />
      <View style={styles.category} />
    </View>
    <CommentLoading />
  </View>
);

export default NoteLoading;

const styles = StyleSheet.create({
  note: {
    // marginBottom: Layout.margin + Layout.halfMargin,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  metadata: {
    paddingLeft: 45 + Layout.halfPadding,
    width: Layout.window.width - 45 - Layout.padding - Layout.halfPadding,
    flexWrap: 'wrap',
    position: 'relative',
    marginBottom: 4,
  },
  feeling: {
    backgroundColor: Colors.loadingOverlay,
    height: 14,
    width: 14,
    borderRadius: 14,
  },
  category: {
    backgroundColor: Colors.loadingOverlay,
    marginLeft: Layout.halfPadding,
    height: 8,
    width: 100,
    borderRadius: 2,
  },
});
