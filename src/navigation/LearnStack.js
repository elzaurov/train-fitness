/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Header} from '../layout';
import {showStreakModal} from '../actions';
import {store} from '../store/index';

import {LearnScreen} from '../screens/learn';
import {CoursesScreen} from '../screens/courses';
import {CourseScreen} from '../screens/course';
import {LessonsScreen} from '../screens/lessons';
import {CourseDetailsScreen} from '../screens/courseDetails';
import {SingleLessonScreen} from '../screens/singleLesson';
import {ClassesProgressScreen} from '../screens/classesProgress';
import {SettingsCommonStack} from './SettingsCommonStack';
import {LearningVideoScreen, SessionListScreen} from '../screens';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator headerMode="screen">
        <Stack.Screen
            name="Learn"
            component={LearnScreen}
            options={{
                header: props => (
                    <Header
                        {...props}
                        isDarkMode
                        mode="standard"
                        screen="Learn"
                        hideLeaderBoard
                        onPressStreak={() => {
                            store.dispatch(showStreakModal());
                        }}
                    />
                ),
            }}
        />
        <Stack.Screen
            name="Courses"
            component={CoursesScreen}
            options={{
                header: props => null,
            }}
        />
        <Stack.Screen // rename
            name="Course"
            component={CourseScreen}
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
            name="Lessons"
            component={LessonsScreen}
            options={{
                header: props => null,
            }}
        />
        <Stack.Screen
            name="CourseDetails"
            component={CourseDetailsScreen}
            options={{
                header: props => null,
            }}
        />
        <Stack.Screen
            name="SessionList"
            component={SessionListScreen}
            options={{
                header: props => null,
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
            name="SingleLesson"
            component={SingleLessonScreen}
            options={{
                header: props => null,
            }}
        />
        <Stack.Screen
            name="ClassesProgress"
            component={ClassesProgressScreen}
            options={{
                header: props => null,
            }}
        />
        {/* {SettingsCommonStack(Stack)} */}
    </Stack.Navigator>
);
