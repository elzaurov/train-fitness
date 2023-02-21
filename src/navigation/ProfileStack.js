import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
    SettingsScreen,
    ModifyPlanScreen,
    PlanScreen,
    ProfileScreen,
    NotificationsScreen,
    NotesScreen,
    ContactScreen,
    WriteNoteScreen,
    RepliesScreen,
} from '../screens';
import {Header} from '../layout';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        screenOptions={{
            header: props => <Header {...props} mode="back" backButton />,
        }}>
        <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                header: props => (
                    <Header
                        {...props}
                        mode="back"
                        screen="Profile"
                        backButton
                        hasTabs
                        isDarkMode={true}
                    />
                ),
            }}
        />
        <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
                header: props => (
                    <Header {...props} mode="back" backButton hasTabs />
                ),
            }}
        />
        <Stack.Screen
            name="Plan"
            component={PlanScreen}
            options={{
                header: props => (
                    <Header
                        {...props}
                        mode="back"
                        screen="Plan"
                        backButton
                        hasTabs
                    />
                ),
            }}
        />
        <Stack.Screen
            name="ModifyPlan"
            component={ModifyPlanScreen}
            options={{
                header: props => (
                    <Header
                        {...props}
                        mode="back"
                        screen="Modify Plan"
                        backButton
                        hasTabs
                    />
                ),
            }}
        />
        <Stack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{
                header: props => (
                    <Header
                        {...props}
                        mode="back"
                        screen="Notifications"
                        backButton
                        hasTabs
                    />
                ),
            }}
        />
        <Stack.Screen
            name="Notes"
            component={NotesScreen}
            options={{
                header: props => (
                    <Header
                        {...props}
                        mode="back"
                        screen="Notes"
                        backButton
                        hasTabs
                    />
                ),
            }}
        />
        <Stack.Screen
            name="WriteNote"
            component={WriteNoteScreen}
            options={{
                header: props => (
                    <Header
                        {...props}
                        mode="back"
                        screen="Write A Note"
                        backButton
                        hasTabs
                    />
                ),
            }}
        />
        <Stack.Screen
            name="Contact"
            component={ContactScreen}
            options={{
                header: props => (
                    <Header
                        {...props}
                        mode="back"
                        screen="Contact"
                        backButton
                        hasTabs
                    />
                ),
            }}
        />
        <Stack.Screen
            name="Replies"
            component={RepliesScreen}
            options={{
                header: props => (
                    <Header
                        {...props}
                        mode="back"
                        screen="Replies"
                        backButton
                        hasTabs
                    />
                ),
            }}
        />
    </Stack.Navigator>
);
