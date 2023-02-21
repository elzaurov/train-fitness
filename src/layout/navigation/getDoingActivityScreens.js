import React from 'react';

import {
  ExerciseScreen,
  DoingWorkoutScreen,
  DoingCrossTrainingScreen,
  DoingCrossTrainingEvaluationScreen,
  DoingWorkoutEvaluationScreen,
} from '../../screens';

const getDoingActivityScreens = (Stack) => (
  <>
    <Stack.Screen
      name="DoingWorkout"
      component={DoingWorkoutScreen}
      options={DoingWorkoutScreen.navigationOptions}
    />
    <Stack.Screen
      name="DoingExercise"
      component={ExerciseScreen}
      options={ExerciseScreen.navigationOptions}
    />
    <Stack.Screen
      name="DoingCrossTraining"
      component={DoingCrossTrainingScreen}
      options={DoingCrossTrainingScreen.navigationOptions}
    />
    <Stack.Screen
      name="DoingCrossTrainingEvaluation"
      component={DoingCrossTrainingEvaluationScreen}
      options={DoingCrossTrainingEvaluationScreen.navigationOptions}
    />
    <Stack.Screen
      name="DoingWorkoutEvaluation"
      component={DoingWorkoutEvaluationScreen}
      options={DoingWorkoutEvaluationScreen.navigationOptions}
    />
  </>
);

export default getDoingActivityScreens;
