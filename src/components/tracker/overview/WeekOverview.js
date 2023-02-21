import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ViewPropTypes} from 'react-native';
import moment from 'moment';
import {TitleText} from '../../layout';
import WeekOverviewGoal from './WeekOverviewGoal';
import MindActivityIcon from '../../svg/MindActivityIcon';
import {Colors, DATE_FORMAT} from '../../../constants';
import BodyActivityIcon from '../../svg/BodyActvityIcon';

const WeekOverview = ({schedule, dailyGoal, selectedDate, style}) => {
  // TEMPORARY - will be removed when the daily goal date format changes
  const dateTimestamp = moment(selectedDate, DATE_FORMAT)
    .tz('Europe/London') // backward compatibility with Lucas's code
    .startOf('day')
    .format('x');

  const selectedDay = schedule && schedule[selectedDate];
  const selectedDayGoal = dailyGoal.days[dateTimestamp] || dailyGoal.default;

  // calculating the total time categorized by mindTime and bodyTime
  const times = Object.values(selectedDay || []).reduce(
    (ac, activity) => {
      let {bodyTime, mindTime, time} = ac;

      if (activity.completed === true) {
        if (activity.type === 'course' || activity.name === 'Game Brain') {
          mindTime += Math.round(activity.time / 60);
        } else {
          bodyTime += Math.round(activity.time / 60);
        }

        time += Math.round(activity.time / 60);
      }

      return {
        bodyTime,
        mindTime,
        time,
      };
    },
    {
      bodyTime: 0,
      mindTime: 0,
      time: 0,
    },
  );

  return (
    <View style={[style]}>
      <View style={styles.container}>
        <View style={styles.stat}>
          <BodyActivityIcon fill={Colors.orange} style={styles.icon} />
          <TitleText style={[styles.statText, styles.bodyText]}>Body</TitleText>
          <TitleText style={styles.statValue}>
            {String(times.bodyTime)}
          </TitleText>
        </View>
        <View style={styles.goal}>
          <WeekOverviewGoal {...times} goal={selectedDayGoal} />
        </View>
        <View style={styles.stat}>
          <MindActivityIcon fill={Colors.dodgerBlur} style={styles.icon} />
          <TitleText style={[styles.statText, styles.mindText]}>Mind</TitleText>
          <TitleText style={styles.statValue}>
            {String(times.mindTime)}
          </TitleText>
        </View>
      </View>
    </View>
  );
};

WeekOverview.propTypes = {
  schedule: PropTypes.object.isRequired,
  dailyGoal: PropTypes.shape({
    default: PropTypes.number,
    days: PropTypes.object,
  }).isRequired,
  selectedDate: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
};

WeekOverview.defaultProps = {
  style: {},
};

export default WeekOverview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  goal: {
    flex: 2.5,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statText: {
    fontWeight: 'normal',
    marginTop: 8,
    fontSize: 14,
  },
  icon: {
    maxHeight: 35,
  },
  mindText: {
    color: Colors.dodgerBlur,
  },
  bodyText: {
    color: Colors.orange,
  },
  statValue: {
    fontSize: 32,
  },
});
