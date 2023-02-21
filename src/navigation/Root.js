import React, { useRef, useMemo, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {subject} from '../analytics';
import {ANALYTICS_TOPIC_NAVIGATION} from '../constants';
import {getPathFromNavState} from '../utils/helpers';
import {UpgradeModal, StreakModal, Initialize} from '../components';
import {useUser} from '../hooks';

import AppStack from './AppStack';
import AuthStack from './AuthStack';

const Navigation = () => {
    const routeNameRef = useRef();
    const navigationRef = useRef();
    const [initialize, user] = useUser();

    const handleReady = () => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
    };
    const handleStateChange = () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        const path = getPathFromNavState(navigationRef.current.getRootState());
        subject.next({
            topic: ANALYTICS_TOPIC_NAVIGATION,
            prevRoute: previousRouteName,
            currentRoute: currentRouteName,
            path,
        });
        routeNameRef.current = currentRouteName;
    };

    const Stack = useMemo(() => (user ? AppStack : AuthStack), [user]);
    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={handleReady}
            onStateChange={handleStateChange}>
            <Stack />
            <Initialize
                user={user}
                initialize={initialize}
                navigation={navigationRef.current}
            />
            <UpgradeModal navigation={navigationRef.current} />
            <StreakModal />
        </NavigationContainer>
    );
};

export default Navigation;
