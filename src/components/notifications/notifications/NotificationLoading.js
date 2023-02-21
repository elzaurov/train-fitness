import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors, Layout} from '../../../constants';

const NotificationLoading = () => (
  <View style={styles.notification}>
    <View style={styles.thumbnail} />
    <View style={styles.content}>
      <View style={styles.time} />
      <View style={styles.text} />
    </View>
  </View>
);

export default NotificationLoading;

const styles = StyleSheet.create({
  notification: {
    borderBottomWidth: 1,
    borderColor: Colors.separator,
    padding: Layout.padding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    backgroundColor: Colors.loadingOverlay,
    width: 42,
    height: 42,
    minWidth: 42,
    borderRadius: 2,
    marginRight: 12,
  },
  time: {
    backgroundColor: Colors.loadingOverlay,
    height: 12,
    width: 80,
    borderRadius: 2,
    marginBottom: 6,
  },
  text: {
    backgroundColor: Colors.loadingOverlay,
    height: 14,
    width: 150,
    borderRadius: 2,
  },
});
