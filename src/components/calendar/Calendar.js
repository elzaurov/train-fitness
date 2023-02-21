import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {NotAvailableFeature, ScheduleDay} from '../common';
import CalendarHOC from './CalendarHOC';
import CalendarDate from './CalendarDate';

const Calendar = ({
  day,
  date,
  isToday,
  isTomorrow,
  loading,
  plan,
  schedule,
  timestamp,
  updating,
  onDateChange,
  isAfterSignUpDate,
}) => {
  if (loading) {
    return <View />;
  }

  if (plan.isBasic) {
    return <NotAvailableFeature />;
  }

  const newSchedule =
    schedule.length > 2 ? schedule : [...schedule, {timestamp}];

  return (
    <View>
      <CalendarDate
        day={day}
        date={date}
        isToday={isToday}
        isTomorrow={isTomorrow}
        isAfterSignUpDate={isAfterSignUpDate}
        onDateChange={onDateChange}
      />
      {!updating && <ScheduleDay editable={true} schedule={newSchedule} />}
    </View>
  );
};

Calendar.propTypes = {
  day: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  isToday: PropTypes.bool.isRequired,
  isTomorrow: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  plan: PropTypes.objectOf(PropTypes.any).isRequired,
  schedule: PropTypes.arrayOf(PropTypes.object).isRequired,
  timestamp: PropTypes.number.isRequired,
  updating: PropTypes.bool.isRequired,
  isAfterSignUpDate: PropTypes.bool.isRequired,
  onDateChange: PropTypes.func.isRequired,
};

export default CalendarHOC(Calendar);
