import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ModalHeader} from '../components';
import {WebViewScreen} from '../screens';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator>
    <Stack.Screen
      name="WebView"
      component={WebViewScreen}
      options={{header: (props) => (
              <ModalHeader
                  {...props}
                  back={{
                      screen: 'Main',
                      params: {
                          screen: 'Progress'
                      },
                  }}
              />
          )}}
    />
  </Stack.Navigator>
);
