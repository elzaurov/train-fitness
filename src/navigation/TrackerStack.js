import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
    CrossTrainingScreen,
    ExerciseScreen,
    LearningVideoScreen,
    NewScheduleScreen,
    NewProgramScreen,
    NewWorkoutScreen,
    TrackerScreen,
    GoalSettings,
    GuideScreen,
} from '../screens';
import {Header} from '../layout';
import {SettingsCommonStack} from './SettingsCommonStack';
import {CourseScreenContainer} from '../containers';
import {showStreakModal} from '../actions';
import {store} from '../store/index';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator headerMode="screen">
        <Stack.Screen
            name="Tracker"
            component={TrackerScreen}
            options={{
                header: props => (
                    <Header
                        {...props}
                        hideLeaderBoard
                        mode="standard"
                        screen="Progress"
                        isDarkMode
                        onPressStreak={() => {
                            store.dispatch(showStreakModal());
                        }}
                    />
                ),
            }}
        />
        <Stack.Screen
            name="NewSchedule"
            component={NewScheduleScreen}
            options={{
                header: props => (
                    <Header
                        {...props}
                        mode="back"
                        screen="Add"
                        backButton
                        hasTabs
                        isDarkMode
                    />
                ),
            }}
        />
        <Stack.Screen
            name="Workout"
            component={NewWorkoutScreen}
            options={{
                header: props => (
                    <Header
                        {...props}
                        mode="back"
                        screen="Workouts"
                        backButton
                        hasTabs
                        isDarkMode
                    />
                ),
            }}
        />
        <Stack.Screen
            name="Exercise"
            component={ExerciseScreen}
            options={{
                header: props => (
                    <Header
                        {...props}
                        mode="back"
                        screen="Exercise"
                        backButton
                        hasTabs
                        isDarkMode
                    />
                ),
            }}
        />
        <Stack.Screen
            name="Course"
            component={CourseScreenContainer}
            options={{
                header: props => (
                    <Header
                        {...props}
                        mode="standard"
                        screen="Progress"
                        isDarkMode
                    />
                ),
            }}
        />
        <Stack.Screen
            name="Learning"
            component={LearningVideoScreen}
            options={{
                header: props => (
                    <Header
                        {...props}
                        mode="back"
                        screen="Learning"
                        backButton
                        hasTabs
                        isDarkMode
                    />
                ),
            }}
        />
        <Stack.Screen
            name="Program"
            component={NewProgramScreen}
            options={{
                header: props => (
                    <Header
                        {...props}
                        mode="back"
                        screen="Program"
                        backButton
                        hasTabs
                        isDarkMode
                    />
                ),
            }}
        />
        <Stack.Screen
            name="CrossTraining"
            component={CrossTrainingScreen}
            options={{
                header: props => (
                    <Header
                        {...props}
                        mode="back"
                        screen="Cross Training"
                        backButton
                        hasTabs
                        isDarkMode
                    />
                ),
            }}
        />
        <Stack.Screen
            name="GoalSettings"
            component={GoalSettings}
            options={{
                header: props => (
                    <Header
                        {...props}
                        mode="back"
                        screen="Goal Settings"
                        isDarkMode
                    />
                ),
            }}
        />
        <Stack.Screen
            name="Guide"
            component={GuideScreen}
            options={{
                header: () => null,
            }}
        />
        {/* Spread common routes */}
        {/* {SettingsCommonStack(Stack)} */}
    </Stack.Navigator>
);
