import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {RegularText} from '../../layout';
import {generateBadgesCount} from '../../../utils';
import {Layout} from '../../../constants';

const StatsOverview = ({gamification, badges, stats, t}) => {
  let badgesCount = generateBadgesCount(stats);
  badgesCount += badges.length;
  const {activities, daysOverall} = gamification;
  const items = [
    {value: activities, text: t('activities')},
    {value: badgesCount, text: t('badgesCount')},
    {value: daysOverall, text: t('days')},
  ];

  const statsComponents = items.map(({value, text}) => (
    <View key={text} style={styles.item}>
      <RegularText style={styles.value}>{value}</RegularText>
      <RegularText style={styles.text}>{text}</RegularText>
    </View>
  ));

  return <View style={styles.stats}>{statsComponents}</View>;
};

StatsOverview.propTypes = {
  gamification: PropTypes.objectOf(PropTypes.any).isRequired,
  stats: PropTypes.objectOf(PropTypes.any).isRequired,
  t: PropTypes.func.isRequired,
};

export default StatsOverview;

const styles = StyleSheet.create({
  stats: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: Layout.window.width,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingBottom: Layout.halfPadding,
  },
  item: {
    alignItems: 'center',
  },
  value: {
    fontSize: 20,
  },
  text: {
    marginTop: -8,
  },
});
