import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import ScheduleItem from './ScheduleItem';
import {Layout} from '../../constants';

const ScheduleDay = ({editable, schedule}) => {
  const firstItem = schedule.findIndex((i) => !i.completed) || 0;

  return (
    <Carousel
      layout="default"
      firstItem={firstItem}
      ref={(c) => {
        this.carousel = c;
      }}
      data={schedule}
      renderItem={(props) => <ScheduleItem editable={editable} {...props} />}
      sliderWidth={Layout.window.width - 32}
      itemWidth={Layout.window.width - 96}
    />
  );
};

ScheduleDay.propTypes = {
  editable: PropTypes.bool,
  schedule: PropTypes.arrayOf(PropTypes.any).isRequired,
};

ScheduleDay.defaultProps = {
  editable: false,
};

export default ScheduleDay;
