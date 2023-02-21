/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import moment from 'moment';
import Time from './Time';
import {Colors} from '../../../constants';
import TimerHOC from './TimerHOC';

const Timer = ({start, timer, rest, isInitOfExercise}) => (
  <View>
    <Time
      time={timer - start}
      showMinutes={!isInitOfExercise}
      textStyle={[
        styles.timeText,
        {
          color: rest ? Colors.secondary2 : Colors.white,
          fontSize: isInitOfExercise ? 96 : 64,
          width: isInitOfExercise
            ? 200
            : moment.duration(timer - start).hours() > 0
            ? 130
            : 110,
        },
      ]}
      dotStyle={[
        styles.timeDotText,
        {color: rest ? Colors.secondary2 : Colors.white},
      ]}
    />
  </View>
);

Timer.propTypes = {
  isInitOfExercise: PropTypes.any.isRequired,
  start: PropTypes.number.isRequired,
  timer: PropTypes.number.isRequired,
  rest: PropTypes.bool.isRequired,
};

export default TimerHOC(Timer);

const styles = StyleSheet.create({
  timeText: {
    fontWeight: '200',
    textAlign: 'center',
  },
  timeDotText: {
    fontWeight: '200',
    width: 18,
    fontSize: 80,
    textAlign: 'center',
  },
});
