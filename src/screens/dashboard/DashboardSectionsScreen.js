import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
// import { StyleSheet } from 'react-native';
import {
  DailySchedule,
  LatestComments,
  LatestNotes,
  Ranking,
  SectionView,
  // StatsGraph,
} from '../../components';
import DashboardScreenHOC from './DashboardScreenHOC';
// import { Layout } from '../../constants';
import {CheckPlanWrapper} from '../../layout';

const DashboardScreen = ({navigation, t}) => {
  const sections = [
    {
      key: 0,
      icon: 'calendar-today',
      title: t('workoutsForToday'),
      data: [{Component: DailySchedule, props: {navigation}}],
    },
    {
      key: 1,
      icon: 'trophy-variant',
      contentStyle: {padding: 0},
      title: t('leaderboard'),
      // collapsed: false,
      data: [{Component: Ranking, props: {navigation}}],
      tabs: [
        {value: 'weekly', name: t('weekly')},
        {value: 'general', name: t('general')},
      ],
    },
    {
      key: 2,
      icon: 'message-video',
      title: t('latestComments'),
      data: [{Component: LatestComments, props: {navigation}}],
    },
    {
      key: 3,
      icon: 'message-text',
      title: t('latestNotes'),
      data: [{Component: LatestNotes, props: {navigation}}],
    },
  ];

  return (
    <CheckPlanWrapper navigation={navigation}>
      <SectionView sections={sections} />
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

// const styles = StyleSheet.create({});
