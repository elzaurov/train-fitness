import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text} from 'react-native';
import {Timer} from '../../common';
import {Colors, Layout} from '../../../constants';

const Prepare = ({onNextState}) => (
  <View style={styles.container}>
    <View style={styles.topContainer}>
      <Text style={styles.topText}>Get ready in</Text>
    </View>
    <Timer duration={5} onNextState={onNextState} digits={0} isCountdown />
  </View>
);

export default Prepare;

Prepare.propTypes = {
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  resumeText: {
    fontSize: 25,
  },
  repText: {
    color: Colors.secondary2,
  },
  timeText: {
    color: Colors.white,
  },
  topText: {
    fontSize: 45,
    fontWeight: '200',
    textAlign: 'center',
    color: Colors.white,
  },
});
