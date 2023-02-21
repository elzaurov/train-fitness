import React from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../constants';

const PrmeiumOverlay = () => (
  <View style={styles.container}>
    <MaterialCommunityIcons
      style={styles.icon}
      name="lock"
      color={Colors.white}
      size={32}
    />
  </View>
);

export default PrmeiumOverlay;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1000,
  },
  icon: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    marginTop: 'auto',
  },
});
