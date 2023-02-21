import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors, Layout} from '../../constants';

const ActivityLoading = () => (
  <View style={styles.container}>
    <View style={styles.coverImage} />
    <View style={styles.section}>
      <View style={styles.title} />
      <View style={styles.descriptionLine} />
      <View style={styles.descriptionLine} />
      <View style={styles.descriptionLine} />
    </View>
    <View style={styles.section}>
      <View style={styles.title} />
      <View style={styles.descriptionLine} />
      <View style={styles.descriptionLine} />
      <View style={styles.descriptionLine} />
    </View>
  </View>
);

export default ActivityLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  coverImage: {
    height: '40%',
    backgroundColor: Colors.loadingOverlay,
  },
  section: {
    padding: Layout.padding,
    marginTop: 16,
    marginBottom: 16,
  },
  title: {
    height: 24,
    backgroundColor: Colors.loadingOverlay,
    width: '30%',
    marginBottom: 16,
  },
  descriptionLine: {
    height: 16,
    backgroundColor: Colors.loadingOverlay,
    marginBottom: 8,
  },
});
