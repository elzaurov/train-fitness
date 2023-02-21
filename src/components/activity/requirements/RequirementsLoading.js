import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../../../constants';

const RequirementsLoading = () => (
  <View style={styles.container}>
    {[...new Array(3)].map((item, idx) => (
      <View key={idx} style={styles.item}>
        <View style={styles.icon} />
        <View style={styles.text} />
      </View>
    ))}
  </View>
);

export default RequirementsLoading;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    alignItems: 'center',
  },
  icon: {
    backgroundColor: Colors.loadingOverlay,
    margin: 16,
    width: 32,
    height: 32,
  },
  text: {
    backgroundColor: Colors.loadingOverlay,
    width: 48,
    height: 16,
  },
});
