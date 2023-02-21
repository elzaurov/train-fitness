import React from 'react';
import PropTypes from 'prop-types';
import {View, ViewPropTypes} from 'react-native';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, TitleText} from '../../layout';
import Activity from './Activity';
import {Colors, DATE_FORMAT} from '../../../constants';

const Activities = ({
  selectedDate,
  schedule,
  navigation,
  onRemoveSchedule,
  style,
}) => {
  let activities;

  if (schedule && schedule[selectedDate]) {
    activities = Object.values(schedule[selectedDate]).map((activity) => (
      <Activity
        {...activity}
        key={activity.uid}
        onRemoveSchedule={() => onRemoveSchedule(activity)}
        navigation={navigation}
        selectedDate={selectedDate}
      />
    ));
  }

  const calendarDate = moment(selectedDate, DATE_FORMAT).calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'Do MMMM',
  });

  const title = `${calendarDate}'s Trainings`;

  return (
    <View style={[styles.container, style]}>
      {activities && activities.length > 0 && (
        <View style={styles.titleContainer}>
          <TitleText style={styles.title}>{title}</TitleText>
        </View>
      )}
      {activities}
    </View>
  );
};

Activities.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  schedule: PropTypes.object,
  navigation: PropTypes.object.isRequired,
  onRemoveSchedule: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
};

Activities.defaultProps = {
  schedule: {},
  style: {},
};

export default Activities;

const styles = {
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    letterSpacing: 1.2,
  },
  addMore: {
    borderRadius: 4,
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
  },
  addMoreText: {
    fontSize: 16,
    marginLeft: 16,
    padding: 0,
    marginBottom: 0,
  },
};
