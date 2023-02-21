import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {TabView, TabBar} from 'react-native-tab-view';
import {StyleSheet} from 'react-native';
import {useTabs, TabBarLabel} from '@traineffective/te-component-library';
import {WeeklyRanking, AllTimeRanking} from '../../components';
import {Colors} from '../../constants';
import LeaderboardScreenHOC from './LeaderboardScreenHOC';

const LeaderboardScreen = ({generalLoaded, index, onIndexChange, t}) => {
    const {styles: tabStyles} = useTabs({isDarkMode: false});

    return (
        <TabView
            navigationState={{
                index,
                routes: [
                    {key: 'weekly', title: t('weekly')},
                    {key: 'general', title: t('general')},
                ],
            }}
            renderScene={({route}) => {
                switch (route.key) {
                    case 'general':
                        return generalLoaded ? <AllTimeRanking /> : null;
                    default:
                        return <WeeklyRanking />;
                }
            }}
            onIndexChange={onIndexChange}
            renderTabBar={props => (
                <TabBar
                    {...props}
                    scrollEnabled
                    style={[tabStyles.tabWrapper, styles.tabBarWrapper]}
                    tabStyle={[{height: 48, marginRight: -80}]}
                    activeColor={tabStyles.tabActive.color}
                    inactiveColor={tabStyles.tabInActive.color}
                    renderLabel={TabBarLabel}
                    indicatorContainerStyle={tabStyles.indicatorStyle}
                    indicatorStyle={tabStyles.indicatorStyle}
                />
            )}
        />
    );
};

LeaderboardScreen.propTypes = {
    generalLoaded: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    onIndexChange: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};

export default LeaderboardScreenHOC(
    withTranslation('leaderboardScreen')(LeaderboardScreen),
);

const styles = StyleSheet.create({
    tabs: {
        backgroundColor: Colors.white,
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
});
