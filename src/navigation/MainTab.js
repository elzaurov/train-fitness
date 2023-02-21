import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabBar} from '../components';
import TrackerStack from './TrackerStack';
import FeedStack from './FeedStack';
import LearnStack from './LearnStack';
import DiscoverStack from './DiscoverStack';
import TrainingStack from './TrainingStack';

const Tab = createBottomTabNavigator();

export default () => {
    return (
        <Tab.Navigator tabBar={props => <TabBar {...props} />}>
            <Tab.Screen name="Feed" component={FeedStack} />
            <Tab.Screen name="Progress" component={TrackerStack} />
            <Tab.Screen name="Train" component={TrainingStack} />
            <Tab.Screen name="Learn" component={LearnStack} />
        </Tab.Navigator>
    );
};
