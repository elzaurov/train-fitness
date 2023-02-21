import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
    PaymentSuccessScreen,
    PaywallScreen,
    FeaturesScreen,
    PlansScreen,
} from '../screens';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator headerMode="none">
        <Stack.Screen name="Paywall" component={PaywallScreen} />
        <Stack.Screen name="Features" component={FeaturesScreen} />
        <Stack.Screen name="Plans" component={PlansScreen} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
    </Stack.Navigator>
);
