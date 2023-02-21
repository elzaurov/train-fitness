import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text} from 'react-native';
import {Timer} from '../../common';
import {Colors, Layout} from '../../../constants';

const Rest = ({setDuration, set, onNextState}) => (
  <View style={styles.container}>
    <View style={styles.topContainer}>
      <Text style={styles.topText}>You should rest for</Text>
    </View>
    <Timer
      duration={15}
      onNextState={onNextState}
      digits={0}
      disableAutoChange
      isCountdown
    />
    <Text style={styles.setText}>SET {set}</Text>
    <Text style={styles.secondsText}>{setDuration.toFixed(1)}s</Text>
  </View>
);

export default Rest;

Rest.propTypes = {
  set: PropTypes.number.isRequired,
  setDuration: PropTypes.number.isRequired,
  onNextState: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: 1.5 * Layout.padding,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  topContainer: {
    height: Layout.window.height * 0.19,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  topText: {
    fontSize: 45,
    fontWeight: '200',
    textAlign: 'center',
    color: Colors.white,
  },
  setText: {
    fontSize: 50,
    fontWeight: '200',
    textAlign: 'center',
    color: Colors.secondary2,
  },
  secondsText: {
    fontSize: 25,
    fontWeight: '200',
    textAlign: 'center',
    color: Colors.white,
  },
});
