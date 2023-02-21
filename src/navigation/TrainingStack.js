import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    TrainScreen,
    EffectiveJourneyScreen,
    TrainingSessionScreen,
    EffectiveDetailsScreen,
    JourneyProgressScreen,
    TrainingDetailsScreen,
    TimerScreen,
    WriteTrainNoteScreens,
    WellDoneScreen,
    SessionListScreen,
    NewProgramScreen,
    NewWorkoutScreen,
    DoingWorkoutScreen,
    DoingCrossTrainingScreen,
    CrossTrainingScreen,
    ExerciseScreen,
    DoingWorkoutEvaluationScreen,
    RewardMenuScreen,
    DoingCrossTrainingEvaluationScreen
} from '../screens';
import { CourseScreen } from '../screens/course';
import { Header } from '../layout';
import { showStreakModal, setShowModal } from '../actions';
import { store } from '../store/index';
import { SettingsCommonStack } from './SettingsCommonStack';
import { CourseScreenContainer } from '../containers';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator headerMode="screen">
        <Stack.Screen
            name="Train"
            component={TrainScreen}
            options={{
                header: props => (
                    <Header
                        {...props}
                        mode="standard"
                        screen=""
                        isDarkMode
                        hideLeaderBoard
                        hideSearchIcon={false}
                        onPressStreak={() => {
                            store.dispatch(showStreakModal());
                        }}
                        onPressSearchFilter={() => {
                            store.dispatch(setShowModal(true));
                        }}
                    />
                ),
            }}
        />
        <Stack.Screen
            name="EffectiveJourney"
            component={EffectiveJourneyScreen}
            options={{
                header: props => null,
            }}
        />
        <Stack.Screen
            name="Program"
            component={NewProgramScreen}
            options={{
                header: props => null,
            }}
        />
        <Stack.Screen
            name="Workout"
            component={DoingWorkoutScreen}
            options={{
                header: props => null,
            }}
        />
        <Stack.Screen
            name="Exercise"
            component={ExerciseScreen}
            options={ExerciseScreen.navigationOptions}
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
            name="TrainingSession"
            component={TrainingSessionScreen}
            options={{
                header: props => null,
            }}
        />
        <Stack.Screen
            name="Course"
            component={CourseScreenContainer}
            options={{
                header: props => null,
            }}
        />

        <Stack.Screen
            name="CourseVideos"
            component={CourseScreen}
            options={{
                header: props => null,
            }}
        />

        <Stack.Screen
            name="EffectiveDetails"
            component={EffectiveDetailsScreen}
            options={{
                header: props => null,
            }}
        />
        <Stack.Screen
            name="JourneyProgress"
            component={JourneyProgressScreen}
            options={{
                header: props => null,
            }}
        />
        <Stack.Screen
            name="TrainingDetails"
            component={TrainingDetailsScreen}
            options={{
                header: props => null,
            }}
        />
        <Stack.Screen
            name="Timer"
            component={TimerScreen}
            options={{
                header: props => null,
            }}
        />
        <Stack.Screen
            name="WriteNote"
            component={WriteTrainNoteScreens}
            options={{
                header: props => null,
            }}
        />
        <Stack.Screen
            name="WellDone"
            component={WellDoneScreen}
            options={{
                header: props => null,
            }}
        />
        <Stack.Screen
            name="TSessionList"
            component={SessionListScreen}
            options={{
                header: props => null,
            }}
        />
        <Stack.Screen
            name="CrossTraining"
            component={DoingCrossTrainingScreen}
            options={{
                header: props => null,
            }}
        />

        <Stack.Screen
            name="CrossTrainingPreview"
            component={CrossTrainingScreen}
            options={{
                header: props => null,
            }}
        />

        <Stack.Screen
            name="CrossTrainingEvaluation"
            component={DoingCrossTrainingEvaluationScreen}
            options={DoingCrossTrainingEvaluationScreen.navigationOptions}
        />

        <Stack.Screen
            name="WorkoutPreview"
            component={NewWorkoutScreen}
            options={{
                header: props => null,
            }}
        />

    </Stack.Navigator>
);
