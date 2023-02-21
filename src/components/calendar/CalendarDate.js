import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RegularText} from '../layout';
import {Colors, Layout} from '../../constants';

const CalendarDate = ({
  day,
  date,
  isToday,
  isTomorrow,
  onDateChange,
  isAfterSignUpDate,
  t,
}) => (
  <View style={styles.datepicker}>
    <TouchableOpacity
      onPress={() => (isAfterSignUpDate ? null : onDateChange(-1))}>
      <MaterialCommunityIcons
        style={styles.icon}
        name="chevron-left"
        size={32}
        color={Colors.white}
      />
    </TouchableOpacity>

    {isToday || isTomorrow ? (
      <View style={styles.dateWrapper}>
        <RegularText style={styles.dateDay}>
          {isToday ? t('today') : t('tomorrow')}
        </RegularText>
        <RegularText style={styles.subdate}>{date}</RegularText>
      </View>
    ) : (
      <View style={styles.dateWrapper}>
        <RegularText style={styles.dateDay}>{day}</RegularText>
        <RegularText style={styles.subdate}>{date}</RegularText>
      </View>
    )}
    <TouchableOpacity onPress={() => onDateChange(1)}>
      <MaterialCommunityIcons
        style={styles.icon}
        name="chevron-right"
        size={32}
        color={Colors.white}
      />
    </TouchableOpacity>
  </View>
);

CalendarDate.propTypes = {
  day: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  isToday: PropTypes.bool.isRequired,
  isTomorrow: PropTypes.bool.isRequired,
  onDateChange: PropTypes.func.isRequired,
  isAfterSignUpDate: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('calendarDateComponent')(CalendarDate);

const styles = StyleSheet.create({
  datepicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Layout.margin * 1.5,
  },
  dateWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    fontSize: 18,
  },
  dateDay: {
    fontSize: 16,
  },
  subdate: {
    color: Colors.dustyGray,
    fontSize: 10,
    marginTop: -3,
  },
});
