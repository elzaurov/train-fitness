import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ViewPropTypes, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {RegularText} from '../../layout';
import {Colors, Layout, DATE_FORMAT} from '../../../constants';

const WeekDailyStat = ({
    selectedDate,
    schedule,
    dailyGoal,
    style,
    onDateChange,
}) => (
    <View style={[styles.container, style]}>
        {moment.weekdays().map((item, idx) => {
            // getting selected day's timestamp
            const date = moment(selectedDate, DATE_FORMAT)
                .startOf('isoWeek')
                .add(idx, 'days');

            const dateKey = date.format(DATE_FORMAT);

            // TEMPORARY - will be removed when the daily goal date format changes
            const dateTimestamp = moment(date)
                .tz('Europe/London')
                .startOf('d')
                .format('x');

            // calculating the total duration of the completed activities
            let dayTime;

            if (schedule && schedule[dateKey]) {
                dayTime = Object.values(schedule[dateKey]).reduce(
                    (ac, {time, completed}) =>
                        completed === true ? ac + Math.round(time / 60) : ac,
                    0,
                );
            } else {
                dayTime = 0;
            }

            // calculating the percentage of the completeness of the day
            const selectedDayGoal =
                dailyGoal.days[dateTimestamp] || dailyGoal.default;
            let dayStat = dayTime / selectedDayGoal;

            if (dayStat > 1) {
                dayStat = 1;
            } else if (dayStat < 0) {
                dayStat = 0;
            }

            // setting border around the selected day
            let selectedDateBorder;

            if (date.format(DATE_FORMAT) === selectedDate) {
                selectedDateBorder = <View style={styles.selectedDateBorder} />;
            }

            return (
                <TouchableOpacity
                    key={date.format('x')}
                    style={styles.dayContainer}
                    onPress={() => onDateChange(date.format(DATE_FORMAT))}>
                    {selectedDateBorder}
                    <View style={styles.dayStat} />
                    <View style={[styles.dayStatOverlay, {opacity: dayStat}]} />
                    <RegularText style={styles.text}>
                        {date.format('ddd')}
                    </RegularText>
                </TouchableOpacity>
            );
        })}
    </View>
);

WeekDailyStat.propTypes = {
    style: ViewPropTypes.style,
    schedule: PropTypes.object,
    selectedDate: PropTypes.string.isRequired,
    dailyGoal: PropTypes.shape({
        default: PropTypes.number,
        days: PropTypes.object,
    }).isRequired,
    onDateChange: PropTypes.func.isRequired,
};

WeekDailyStat.defaultProps = {
    style: {},
    schedule: {},
};

export default WeekDailyStat;

const CIRCLE_SIZE = (Layout.window.width / 7) * 0.7;
const CIRCLE_BORDER_OFFSET = 8;
const CIRCLE_BORDER_SIZE = CIRCLE_SIZE + CIRCLE_BORDER_OFFSET;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayContainer: {
        width: CIRCLE_BORDER_SIZE,
        height: CIRCLE_BORDER_SIZE,
        justifyContent: 'space-around',
    },
    dayStat: {
        position: 'absolute',
        top: CIRCLE_BORDER_OFFSET / 2,
        left: CIRCLE_BORDER_OFFSET / 2,
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        backgroundColor: Colors.mineShaft,
        borderRadius: CIRCLE_SIZE / 2,
        justifyContent: 'center',
    },
    dayStatOverlay: {
        position: 'absolute',
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        left: CIRCLE_BORDER_OFFSET / 2,
        top: CIRCLE_BORDER_OFFSET / 2,
        borderRadius: CIRCLE_SIZE / 2,
        backgroundColor: Colors.green,
    },
    text: {
        color: Colors.white,
        textAlign: 'center',
    },
    selectedDateBorder: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: CIRCLE_BORDER_SIZE,
        height: CIRCLE_BORDER_SIZE,
        borderRadius: CIRCLE_BORDER_SIZE / 2,
        borderWidth: 2,
        borderColor: Colors.white,
    },
});
