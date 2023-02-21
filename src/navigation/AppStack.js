import React from 'react';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import MainTab from './MainTab';
import PaywallStack from './PaywallStack';
import OnboardingStack from './OnboardingStack';
import PerformingStack from './PerformingStack';
import WebViewStack from './WebViewStack';
import ProfileStack from './ProfileStack';
import {SettingsCommonStack} from './SettingsCommonStack';

const Stack = createStackNavigator();

const AppStack = () => {
    const {videoLockGesture, fullscreen} = useSelector(
        state => state.android_player,
    );
    const user = useSelector(state => state.user?.user);
    const {
        metadata: {creationTime, lastSignInTime},
    } = user;
    const userJustRegistered = creationTime === lastSignInTime;
    const hasPosition = useSelector(state => state.onBoarding?.position);
    const showOnBoarding = userJustRegistered && !hasPosition;

    return (
        <Stack.Navigator
            screenOptions={{gestureEnabled: !(fullscreen || videoLockGesture)}}>
            <Stack.Screen
                name={showOnBoarding ? 'Onboarding' : 'Main'}
                options={{
                    header: () => null,
                }}
                component={showOnBoarding ? OnboardingStack : MainTab}
            />
            <Stack.Screen
                name={showOnBoarding ? 'Main' : 'Onboarding'}
                options={{
                    header: () => null,
                }}
                component={showOnBoarding ? MainTab : OnboardingStack}
            />
            <Stack.Screen
                name="Performing"
                options={{
                    header: () => null,
                }}
                component={PerformingStack}
            />
            <Stack.Screen
                name="Paywall"
                options={{
                    header: () => null,
                }}
                component={PaywallStack}
            />
            <Stack.Screen
                name="WebView"
                options={{
                    header: () => null,
                }}
                component={WebViewStack}
            />
            {SettingsCommonStack(Stack)}
        </Stack.Navigator>
    );
};

export default AppStack;
