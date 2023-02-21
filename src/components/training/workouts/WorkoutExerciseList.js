import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
import PlaylistVideo from '../../common/PlaylistVideo';

const WorkoutExerciseList = ({
  exercises,
  hasSchedule,
  playlist,
  selectedExerciseKey,
  onCompleteExercise,
  onRemoveCompleteExercise,
  onSelectExercise,
}) => {
  const exerciseList = exercises.map((exercise) => (
    <PlaylistVideo
      type="exercise"
      key={exercise.key}
      hasSchedule={hasSchedule}
      video={exercise}
      isChecked={!!playlist[exercise.key]}
      isSequencePlaylist={false}
      selected={selectedExerciseKey === exercise.key}
      onCompleteVideo={onCompleteExercise}
      onRemoveCompleteVideo={onRemoveCompleteExercise}
      onSelectVideo={onSelectExercise}
    />
  ));

  return <ScrollView bounces={false}>{exerciseList}</ScrollView>;
};

WorkoutExerciseList.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasSchedule: PropTypes.bool.isRequired,
  playlist: PropTypes.objectOf(PropTypes.any).isRequired,
  selectedExerciseKey: PropTypes.string.isRequired,
  onCompleteExercise: PropTypes.func.isRequired,
  onRemoveCompleteExercise: PropTypes.func.isRequired,
  onSelectExercise: PropTypes.func.isRequired,
};

export default WorkoutExerciseList;
