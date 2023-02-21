import React, {useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Header, BrowseHeader} from '..';
import FeedScreen from '../../screens/feed/FeedScreen';
import {BrowseScreen} from '../../screens';
import TrackerScreen from '../../screens/tracker/TrackerScreen';
import {TabBar} from '../../components';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const getHeaderByRouteName = name => {
    switch (name) {
        case 'Feed':
            return props => (
                <Header
                    {...props}
                    mode="standard"
                    screen={name}
                    backButton
                    isFeed
                />
            );
        case 'Training':
            return props => <BrowseHeader {...props} />;
        case 'Progress':
            return props => (
                <Header {...props} screen={name} mode="standard" backButton />
            );
    }
};

const Tab = createBottomTabNavigator();

const MainTab = ({navigation, route}) => {
    useLayoutEffect(() => {
        const currentRoute = getFocusedRouteNameFromRoute(route) ?? 'Progress';
        const header = getHeaderByRouteName(currentRoute);
        navigation.setOptions({header});
    }, [navigation, route]);

    return (
        <Tab.Navigator tabBar={TabBar}>
            <Tab.Screen name="Progress" component={TrackerScreen} />
            <Tab.Screen name="Feed" component={FeedScreen} />
            <Tab.Screen name="Training" component={BrowseScreen} />
        </Tab.Navigator>
    );
};

MainTab.propTypes = {
    navigation: PropTypes.shape({
        setOptions: PropTypes.func,
    }).isRequired,
    route: PropTypes.object.isRequired,
};

export default MainTab;
