import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, StyleSheet} from 'react-native';
import ForceCrashHOC from './ForceCrashHOC';

const ForceCrash = ({onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.container} />
);

export default ForceCrashHOC(ForceCrash);

ForceCrash.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
