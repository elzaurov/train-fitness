import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {RegularText, ScreenScrollView} from '../../components';
import DashboardScreenHOC from './DashboardScreenHOC';
// import { Layout } from '../../constants';
import {CheckPlanWrapper} from '../../layout';
import {Colors, Layout} from '../../constants';

const DashboardScreen = ({navigation, t}) => {
  const items = [
    // { screen: 'TodayWorkouts', text: t('workoutsForToday'), icon: 'calendar' },
    {screen: 'Leaderboard', text: t('leaderboard'), icon: 'trophy-variant'},
    {screen: 'StatsGraph', text: t('statsGraph'), icon: 'chart-line'},
    {
      screen: 'LatestComments',
      text: t('latestComments'),
      icon: 'message-video',
    },
    {screen: 'LatestNotes', text: t('latestNotes'), icon: 'message-text'},
  ];

  const screenItems = items.map(({screen, text, icon}) => (
    <TouchableOpacity
      key={screen}
      onPress={() => navigation.push(screen)}
      style={styles.item}>
      <View style={styles.wrapper}>
        <View style={styles.iconWrapper}>
          <MaterialCommunityIcons name={icon} size={28} color={Colors.white} />
        </View>
        <View style={styles.nameWrapper}>
          <RegularText style={styles.name}>{text.toUpperCase()}</RegularText>
        </View>
      </View>
    </TouchableOpacity>
  ));

  return (
    <CheckPlanWrapper navigation={navigation}>
      <ScreenScrollView style={styles.view}>
        <View style={styles.dailySchedule}>
          <View style={styles.dailyScheduleWrapper}>
            <MaterialCommunityIcons
              name="calendar"
              size={28}
              color={Colors.white}
            />
            <RegularText style={styles.dailyScheduleTitle}>
              {t('workoutsForToday').toUpperCase()}
            </RegularText>
          </View>
        </View>
        {screenItems}
      </ScreenScrollView>
    </CheckPlanWrapper>
  );
};

DashboardScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  t: PropTypes.func.isRequired,
};

export default DashboardScreenHOC(
  withTranslation('dashboardScreen')(DashboardScreen),
);

const styles = StyleSheet.create({
  dailySchedule: {
    marginBottom: Layout.margin,
    paddingBottom: Layout.padding,
    borderBottomWidth: 1,
    borderColor: Colors.separator,
  },
  dailyScheduleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.margin,
  },
  dailyScheduleTitle: {
    paddingLeft: Layout.padding,
    fontSize: 16,
  },
  item: {
    backgroundColor: Colors.background,
    marginBottom: Layout.margin,
    borderRadius: 2,
    overflow: 'hidden',
  },
  wrapper: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    width: 56,
    height: 56,
  },
  nameWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    height: 56,
    width: Layout.window.width - Layout.padding * 2 - 56,
  },
  name: {
    color: Colors.black,
    paddingLeft: Layout.padding,
    fontSize: 16,
  },
});
