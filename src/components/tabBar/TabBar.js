import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {View, StyleSheet, SafeAreaView, ViewPropTypes} from 'react-native';
import Intercom from 'react-native-intercom';
import {Icon} from '@traineffective/te-component-library';
import {Layout, Colors} from '../../constants';
import {PremiumActionHOC} from '../premium';
import TabBarItem from './TabBarItem';
import { AppStorage } from '../../utils';
import { userRegisterIntercom } from '../../analytics/user';

const storage = new AppStorage('intercom_user');


const PremiumTabBarItem = PremiumActionHOC(TabBarItem);

const icons = {
    Progress: 'progress',
    Feed: 'feed',
    Train: 'training',
    Profile: 'feed',
    Learn: 'learn',
};

const TabBar = ({navigation, style, state}) => {
    const {routes, index: activeRouteIndex} = state;
    const {uid} = useSelector(reduxState => reduxState.profile);
    const fullscreen = useSelector(state => state.android_player.fullscreen);
    const activeRoute = routes[activeRouteIndex];
    const handleTabPress = useCallback(
        name => {
            if (!uid) {
                return;
            }
            navigation.navigate(name);
        },
        [navigation, uid],
    );

    return (
        <SafeAreaView
            style={[
                {
                    backgroundColor:
                        activeRoute.name === 'Feed'
                            ? Colors.white
                            : Colors.deepDark,
                },
                style,
            ]}>
            {!fullscreen && (
                <View style={[styles.iconsContainer]}>
                    {routes
                        .filter(({name}) => name !== 'Profile')
                        .map(route => (
                            <TabBarItem
                                onPress={() => handleTabPress(route.name)}
                                key={route.key}
                                text={route.name}
                                tintColor={
                                    route === activeRoute
                                        ? activeRoute.name === 'Feed'
                                            ? Colors.gray8
                                            : Colors.white
                                        : Colors.gray9
                                }
                                style={styles.item}>
                                <Icon
                                    name={icons[route.name]}
                                    color={
                                        route === activeRoute
                                            ? activeRoute.name === 'Feed'
                                                ? Colors.gray8
                                                : Colors.white
                                            : Colors.gray9
                                    }
                                />
                            </TabBarItem>
                        ))}
                    <PremiumTabBarItem
                        isPremium
                        tintColor={Colors.gray6}
                        key="chat"
                        text="Mentor"
                        style={styles.item}
                        onPress={async () => {
                            storage.get().then(async (res) => {
                                if (!res?.registered) {
                                    await userRegisterIntercom(uid);
                                }
                                Intercom.displayMessenger();
                            }).catch(async (err) => {
                                await userRegisterIntercom(uid);
                                Intercom.displayMessenger();
                            });

                        }}>
                        <Icon name="mentor" color={Colors.gray6} />
                    </PremiumTabBarItem>
                </View>
            )}
        </SafeAreaView>
    );
};

TabBar.propTypes = {
    navigation: PropTypes.shape({navigate: PropTypes.func}).isRequired,
    state: PropTypes.shape({
        routes: PropTypes.array,
        index: PropTypes.number,
    }).isRequired,
    style: ViewPropTypes.style,
};

TabBar.defaultProps = {
    style: {},
    labelStyle: {},
};

export default TabBar;

const styles = StyleSheet.create({
    // container: {
    //     // backgroundColor: Colors.deepDark,
    //     backgroundColor:  activeRoute.name === 'Feed'
    //     ? Colors.white
    //     : 'red'
    // },
    iconsContainer: {
        paddingLeft: Layout.padding / 2,
        paddingRight: Layout.padding / 2,
        paddingTop: Layout.padding / 2,
        paddingBottom: Layout.padding / 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item: {
        flex: 0,
        width: '20%',
    },
});
