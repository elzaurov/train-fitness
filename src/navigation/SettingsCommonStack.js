import React from 'react';
import {
    ContactScreen,
    NotesScreen,
    NotificationsScreen,
    PlanScreen,
    ProfileScreen,
    SettingsScreen,
} from '../screens';
import {Header} from '../layout';

export const SettingsCommonStack = Stack => (
    <>
        <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                header: props => (
                    <Header
                        {...props}
                        screen="Profile"
                        mode="back"
                        hasTabs
                        backButton
                        isDarkMode
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
                        screen="Notifications"
                        mode="back"
                        hasTabs
                        backButton
                        isDarkMode
                    />
                ),
            }}
        />
        <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
                header: props => (
                    <Header
                        {...props}
                        screen="Settings"
                        mode="back"
                        hasTabs
                        backButton
                        isDarkMode
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
                        screen="Contact"
                        mode="back"
                        backButton
                        isDarkMode
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
                        screen="Notes"
                        mode="back"
                        backButton
                        isDarkMode
                    />
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
                        screen="Plan"
                        mode="back"
                        backButton
                        isDarkMode
                    />
                ),
            }}
        />
    </>
);
