import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
    BrowseCollectionScreen,
    BrowseScreen,
    ExerciseScreen,
    LearningVideoScreen,
    NewCourseScreen,
    NewProgramScreen,
    NewWorkoutScreen,
    CrossTrainingScreen,
} from '../screens';
import {Header} from '../layout';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator headerMode="screen">
        <Stack.Screen
            name="Discover"
            component={BrowseScreen}
            options={BrowseScreen.navigationOptions}
        />
        <Stack.Screen
            name="Collection"
            component={BrowseCollectionScreen}
            options={{
                header: props => (
                    <Header
                        {...props}
                        screen="Collection"
                        mode="back"
                        isDarkMode
                    />
                ),
            }}
        />
        <Stack.Screen
            name="Workout"
            component={NewWorkoutScreen}
            options={NewWorkoutScreen.navigationOptions}
        />
        <Stack.Screen
            name="Course"
            component={NewCourseScreen}
            options={NewCourseScreen.navigationOptions}
        />
        <Stack.Screen
            name="Program"
            component={NewProgramScreen}
            options={NewProgramScreen.navigationOptions}
        />
        <Stack.Screen
            name="Exercise"
            component={ExerciseScreen}
            options={{
                header: props => (
                    <Header
                        {...props}
                        screen="Exercise"
                        mode="back"
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
                        screen="Learning"
                        mode="back"
                        isDarkMode
                    />
                ),
            }}
        />
        <Stack.Screen
            name="CrossTraining"
            component={CrossTrainingScreen}
            options={CrossTrainingScreen.navigationOptions}
        />
    </Stack.Navigator>
);
