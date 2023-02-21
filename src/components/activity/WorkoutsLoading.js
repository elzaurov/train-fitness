import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors, Layout} from '../../constants';

const WorkoutsLoading = () => (
  <View style={styles.container}>
    <View style={styles.item} />
    <View style={styles.item} />
    <View style={styles.item} />
    <View style={styles.item} />
  </View>
);

export default WorkoutsLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Layout.padding,
  },
  item: {
    height: 100,
    borderRadius: 5,
    backgroundColor: Colors.loadingOverlay,
    marginBottom: 16,
  },
});
