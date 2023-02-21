import 'react-native-gesture-handler';
import React from 'react';
import {LogBox} from 'react-native';
import {MenuProvider} from 'react-native-popup-menu';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {StoreProvider} from './store';
import Root from './navigation/Root';
import {en} from './locales';
import {AppContainer, ErrorHandler, Events, NetworkStatus} from './components';
import {useCheckUpdate, useInAppMessaging} from './hooks';

i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    lng: 'en',
    resources: {
        en,
    },
});

LogBox.ignoreLogs([
    'Warning: isMounted',
    'Module RCTImageLoader requires',
    'Class RCTCxxModule was',
    'Remote debugger',
    'Task orphaned for request',
    "Warning: Can't call setState",
    'Module RNFetchBlob',
    'AnimatedComponent',
    'ScrollFlatListHOC',
    'componentWillMount',
    'componentWillReceiveProps',
    'Non-serializable values were found in the navigation state',
    'RFC2822',
    // See: https://github.com/react-navigation/react-navigation/issues/7839
    'Sending \`onAnimatedValueUpdate\` with no listeners registered.',
]);

const App = () => {
    useCheckUpdate();
    useInAppMessaging();
    return (
        <StoreProvider>
            <ErrorHandler>
                <MenuProvider>
                    <Events />
                    <NetworkStatus />
                    <AppContainer>
                        <Root />
                    </AppContainer>
                </MenuProvider>
            </ErrorHandler>
        </StoreProvider>
    );
};

export default App;
