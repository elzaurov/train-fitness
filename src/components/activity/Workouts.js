import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Workout from './Workout';

// NOTE: candidate to be reused inside the "ViewProgram" details page

const Workouts = ({workouts, onWorkoutSelect, userRole, ...rest}) => (
  <View {...rest}>
    {workouts.map(({key, ...props}) => (
      <TouchableOpacity
        style={styles.workout}
        key={key}
        onPress={() => onWorkoutSelect(key)}>
        <Workout userRole={userRole} {...props} />
      </TouchableOpacity>
    ))}
  </View>
);

Workouts.propTypes = {
  workouts: PropTypes.array.isRequired,
  onWorkoutSelect: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
};

export default Workouts;

const styles = StyleSheet.create({
  workout: {
    marginBottom: 16,
  },
});
