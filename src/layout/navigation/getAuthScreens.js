import React from 'react';

import {
  ForgotPasswordScreen,
  LoginScreen,
  SignUpScreen,
  WelcomeScreen,
  PaywallScreen_Legacy,
} from '../../screens';

const getAuthScreens = (Stack) => (
  <>
    <Stack.Screen
      name="WelcomeScreen"
      component={WelcomeScreen}
      options={WelcomeScreen.navigationOptions}
    />
    <Stack.Screen
      name="SignIn"
      component={LoginScreen}
      options={LoginScreen.navigationOptions}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUpScreen}
      options={SignUpScreen.navigationOptions}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPasswordScreen}
      options={ForgotPasswordScreen.navigationOptions}
    />
    <Stack.Screen
      name="PaywallAuth"
      component={PaywallScreen_Legacy}
      options={PaywallScreen_Legacy.navigationOptions}
    />
  </>
);

export default getAuthScreens;
