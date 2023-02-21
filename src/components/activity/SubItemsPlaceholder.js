import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../../constants';

const SubItemsPlaceholder = () => <View style={styles.placeholder} />;

const styles = StyleSheet.create({
  placeholder: {
    height: 300,
    backgroundColor: Colors.placeholder,
  },
});

export default SubItemsPlaceholder;
