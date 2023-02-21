import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Layout, Colors} from '../../constants';

const PracticesLoading = () => (
  <View style={styles.container}>
    <View style={styles.item} />
  </View>
);

export default PracticesLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    width: Layout.window.width - 96,
    backgroundColor: Colors.loadingOverlay,
    borderRadius: 5,
  },
});
