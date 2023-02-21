import React from 'react';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, ViewPropTypes, TouchableOpacity} from 'react-native';
import {RegularText} from '../layout';
import {Colors} from '../../constants';

const DailyGoal = ({dailyGoal, selectedDate, onEditPress, style}) => {
  const selectedDayGoal = dailyGoal.days[selectedDate] || dailyGoal.default;
  const isDailyGoalSettled = !!dailyGoal.days[selectedDate];

  const settledColor = isDailyGoalSettled ? Colors.white : Colors.silver;

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onEditPress}>
      <RegularText style={styles.titleText}>Daily goal:</RegularText>
      <RegularText style={[styles.valueText, {color: settledColor}]}>
        {selectedDayGoal} mins
      </RegularText>
      <MaterialCommunityIcons color={settledColor} name="pencil" size={16} />
    </TouchableOpacity>
  );
};

DailyGoal.propTypes = {
  // eslint-disable-next-line react/no-typos
  style: ViewPropTypes.style,
  dailyGoal: PropTypes.shape({
    default: PropTypes.number.isRequired,
    days: PropTypes.object,
  }),
  selectedDate: PropTypes.string.isRequired,
  onEditPress: PropTypes.func.isRequired,
};

DailyGoal.defaultProps = {
  style: {},
  dailyGoal: {
    days: {},
  },
};

export default DailyGoal;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: Colors.mineShaft,
    borderRadius: 4,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 14,
    marginRight: 8,
  },
  valueText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
  },
});
