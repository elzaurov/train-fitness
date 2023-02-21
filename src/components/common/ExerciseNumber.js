import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {RegularText} from '../layout';
import {Colors} from '../../constants';

const ExerciseNumber = ({current, total, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <RegularText style={styles.currentText}>{current}</RegularText>
    <RegularText style={styles.divisorText}>/</RegularText>
    <RegularText style={styles.totalText}>{total}</RegularText>
  </TouchableOpacity>
);

ExerciseNumber.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPress: PropTypes.func,
};

ExerciseNumber.defaultProps = {
  onPress: () => null,
};

export default ExerciseNumber;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  currentText: {
    marginLeft: 1,
    marginRight: 1,
    fontSize: 18,
    color: Colors.white,
  },
  divisorText: {
    marginLeft: 1,
    marginRight: 1,
    fontSize: 17,
    color: Colors.white,
  },
  totalText: {
    marginLeft: 1,
    marginRight: 1,
    fontSize: 17,
    color: Colors.dustyGray,
  },
});
