import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RegularText} from '../layout';
import {Colors, Layout} from '../../constants';

const AddToCalendarButton = ({onAddToCalendarPress, t}) => (
  <TouchableOpacity style={styles.addToCalendar} onPress={onAddToCalendarPress}>
    <MaterialCommunityIcons
      style={styles.calendarIcon}
      name="calendar-plus"
      size={32}
      color={Colors.white}
    />
    <RegularText style={styles.text}>{t('addToCalendar')}</RegularText>
  </TouchableOpacity>
);

AddToCalendarButton.propTypes = {
  onAddToCalendarPress: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('addToCalendarButtonComponent')(
  AddToCalendarButton,
);

const styles = StyleSheet.create({
  addToCalendar: {
    backgroundColor: Colors.secondary,
    padding: Layout.padding,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarIcon: {
    marginRight: Layout.halfMargin,
  },
  text: {
    fontSize: 18,
  },
});
