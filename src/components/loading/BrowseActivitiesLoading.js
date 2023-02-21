import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Rect} from 'react-content-loader/native';
import Loading from './Loading';
import {Layout, Colors} from '../../constants';

const BrowseActivitiesLoading = () => (
  <View style={styles.container}>
    <Loading
      viewBox="0 0 240 100"
      height={Layout.window.width * (3 / 4)}
      style={styles.section}>
      <Rect x={10} width={200} height={100} rx={4} />
      <Rect x={220} width={200} height={100} rx={4} />
    </Loading>
    <Loading
      viewBox="0 0 240 100"
      height={Layout.window.width * (1 / 2)}
      style={styles.section}>
      <Rect x={10} width={100} height={100} rx={4} />
      <Rect x={120} width={100} height={100} rx={4} />
      <Rect x={230} width={100} height={100} rx={4} />
    </Loading>
    <Loading
      viewBox="0 0 240 100"
      height={Layout.window.width * (1 / 2)}
      style={styles.section}>
      <Rect x={10} width={100} height={100} rx={4} />
      <Rect x={120} width={100} height={100} rx={4} />
      <Rect x={230} width={100} height={100} rx={4} />
    </Loading>
  </View>
);

export default BrowseActivitiesLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  section: {
    marginTop: 16,
    marginBottom: 24,
  },
});
