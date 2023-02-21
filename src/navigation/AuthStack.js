import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
    ForgotPasswordScreen,
    LoginScreen,
    SignUpScreen,
    WelcomeScreen,
} from '../screens';
import {AuthHeader} from '../components';

const Stack = createStackNavigator();

const AuthStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerTransparent: true,
            header: props => <AuthHeader {...props} backButton />,
        }}>
        <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{
                header: props => <AuthHeader {...props} backButton={false} />,
            }}
        />
        <Stack.Screen name="SignIn" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
);

export default AuthStack;
