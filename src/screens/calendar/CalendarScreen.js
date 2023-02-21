import React from 'react';
import PropTypes from 'prop-types';
// import { StyleSheet } from 'react-native';
import {Calendar} from '../../components/calendar';
import CalendarScreenHOC from './CalendarScreenHOC';
import {CheckPlanWrapper, ScreenScrollView} from '../../layout';

const CalendarScreen = ({navigation}) => (
  <CheckPlanWrapper navigation={navigation}>
    <ScreenScrollView>
      <Calendar />
    </ScreenScrollView>
  </CheckPlanWrapper>
);

CalendarScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CalendarScreenHOC(CalendarScreen);

// const styles = StyleSheet.create({});
