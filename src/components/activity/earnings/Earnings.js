import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ViewPropTypes} from 'react-native';
import {Section} from '../../common';
import ExperienceEarning from './ExperienceEarning';
import StatEarning from './StatEarning';
import BadgeEarning from './BadgeEarnings';
import {Layout} from '../../../constants';

const Earnings = ({earnings, style}) => {
  let experience;
  let stats;
  let badges;

  if (!earnings) {
    return null;
  }

  if (earnings.experience) {
    experience = (
      <ExperienceEarning
        experience={earnings.experience}
        style={styles.earningItem}
      />
    );
  }

  if (earnings.stats && earnings.stats.length) {
    stats = earnings.stats.map((stat) => (
      <StatEarning key={stat.title} {...stat} style={styles.earningItem} />
    ));
  }

  if (earnings.badges && earnings.badges.length) {
    badges = earnings.badges.map((badge) => (
      <BadgeEarning key={badge.title} {...badge} style={styles.earningItem} />
    ));
  }

  return (
    <Section title="Earnings" style={style}>
      <View style={styles.earnings}>
        {stats}
        {badges}
        {experience}
      </View>
    </Section>
  );
};

Earnings.propTypes = {
  earnings: PropTypes.object.isRequired,
  style: ViewPropTypes.style,
};

Earnings.defaultProps = {
  style: {},
};

export default Earnings;

const styles = StyleSheet.create({
  earnings: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  earningItem: {
    width: Layout.window.width / 4 - 8,
    height: 100,
    marginBottom: 24,
    flex: 0,
  },
});
