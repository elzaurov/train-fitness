import React from 'react';
import PropTypes from 'prop-types';
import {LoadingFullScreen, Workout} from '../../components';
import WorkoutScreenHOC from './WorkoutScreenHOC';

const WorkoutScreen = ({
  currentProgram,
  navigation,
  loading,
  schedule,
  workout,
  onAddToCalendarPress,
}) => {
  if (loading) {
    return <LoadingFullScreen secondary hideImage />;
  }

  return (
    <Workout
      currentProgram={currentProgram}
      navigation={navigation}
      schedule={schedule}
      workout={workout}
      onAddToCalendarPress={onAddToCalendarPress}
    />
  );
};

WorkoutScreen.propTypes = {
  currentProgram: PropTypes.objectOf(PropTypes.any),
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  loading: PropTypes.bool.isRequired,
  schedule: PropTypes.objectOf(PropTypes.any),
  workout: PropTypes.objectOf(PropTypes.any).isRequired,
  onAddToCalendarPress: PropTypes.func,
};

WorkoutScreen.defaultProps = {
  currentProgram: undefined,
  schedule: undefined,
  onAddToCalendarPress: undefined,
};

export default WorkoutScreenHOC(WorkoutScreen);
