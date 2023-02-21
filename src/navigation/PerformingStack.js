import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
    DoingCrossTrainingEvaluationScreen,
    DoingCrossTrainingScreen,
    DoingWorkoutEvaluationScreen,
    DoingWorkoutScreen,
    ExerciseScreen,
    // FinishWorkoutScreen,
    LearningScreen,
    LearningVideoScreen,
    ProgramScreen,
    RewardMenuScreen,
    TeamScreen,
    WriteNoteScreen,
} from '../screens';
import {Header} from '../layout';
import {CourseScreenContainer} from '../containers';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator headerMode="screen">
        <Stack.Screen
            name="Program"
            component={ProgramScreen}
            options={ProgramScreen.navigationOptions}
        />
        <Stack.Screen
            name="Course"
            component={CourseScreenContainer}
            options={{
                header: props => (
                    <Header
                        {...props}
                        mode="back"
                        screen="Course"
                        hasTabs
                        isDarkMode
                    />
                ),
            }}
        />
        <Stack.Screen
            name="Workout"
            component={DoingWorkoutScreen}
            options={DoingWorkoutScreen.navigationOptions}
        />
        <Stack.Screen
            name="Exercise"
            component={ExerciseScreen}
            options={ExerciseScreen.navigationOptions}
        />
        <Stack.Screen
            name="CrossTraining"
            component={DoingCrossTrainingScreen}
            options={DoingCrossTrainingScreen.navigationOptions}
        />
        <Stack.Screen
            name="CrossTrainingEvaluation"
            component={DoingCrossTrainingEvaluationScreen}
            options={DoingCrossTrainingEvaluationScreen.navigationOptions}
        />
        <Stack.Screen
            name="WorkoutEvaluation"
            component={DoingWorkoutEvaluationScreen}
            options={DoingWorkoutEvaluationScreen.navigationOptions}
        />
        <Stack.Screen
            name="RewardMenu"
            component={RewardMenuScreen}
            options={RewardMenuScreen.navigationOptions}
        />
        <Stack.Screen
            name="WriteNote"
            component={WriteNoteScreen}
            options={WriteNoteScreen.navigationOptions}
        />
        <Stack.Screen
            name="Team"
            component={TeamScreen}
            options={TeamScreen.navigationOptions}
        />
        <Stack.Screen
            name="Learning"
            component={LearningScreen}
            options={LearningScreen.navigationOptions}
        />
        <Stack.Screen
            name="LearningVideo"
            component={LearningVideoScreen}
            options={LearningVideoScreen.navigationOptions}
        />
    </Stack.Navigator>
);
