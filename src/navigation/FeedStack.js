import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FeedScreen from '../screens/feed/FeedScreen';
import {CrossTrainingScreen, LeaderboardScreen, NewWorkoutScreen, RepliesScreen, WriteNoteScreen} from '../screens';
import {Header} from '../layout';
import {SettingsCommonStack} from './SettingsCommonStack';
import {showStreakModal} from '../actions';
import {store} from '../store/index';
import { CourseScreenContainer } from '../containers';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator headerMode="screen">
        <Stack.Screen
            name="Feed"
            component={FeedScreen}
            options={{
                header: props => {
                    return (
                        <Header
                            {...props}
                            screen="Feed"
                            mode="standard"
                            isDarkMode={false}
                            onPressStreak={() => {
                                store.dispatch(showStreakModal());
                            }}
                        />
                    );
                },
            }}
        />
        <Stack.Screen
            name="Replies"
            component={RepliesScreen}
            options={{
                header: props => (
                    <Header {...props} screen="Replies" mode="back" />
                ),
            }}
        />
        <Stack.Screen
            name="WriteNote"
            component={WriteNoteScreen}
            options={{
                header: props => (
                    <Header {...props} screen="Post" mode="back" />
                ),
            }}
        />
        <Stack.Screen
            name="Leaderboard"
            component={LeaderboardScreen}
            options={{
                header: props => (
                    <Header
                        {...props}
                        screen="Leaderboard"
                        mode="back"
                        hasTabs
                        backButton
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
    </Stack.Navigator>
);
