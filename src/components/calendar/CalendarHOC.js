import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {connect} from 'react-redux';
import {loadSchedule, loadProfile} from '../../actions';

const CalendarHOCWrapper = (InnerComponent) => {
  class CalendarHOC extends Component {
    state = {
      day: moment().startOf('day').utc().format('dddd').toUpperCase(),
      daysCount: 0,
      isToday: true,
      isTomorrow: false,
      loading: true,
      updating: false,
      timestamp: moment().startOf('day').utc().valueOf(),
      date: moment().startOf('day').utc().format('ll'),
      // eslint-disable-next-line react/prop-types
      isAfterSignUpDate: moment(this.props.profile.createdAt).isAfter(moment()),
    };

    async componentDidMount() {
      await this.props.loadSchedule();
      await this.props.loadProfile();

      this.setState({loading: false});
    }

    handleDateChange = (value) => {
      const {timestamp} = this.state;
      const daysCount = this.state.daysCount + value;

      const newDate = moment(timestamp).add(value, 'day');

      const isToday = daysCount === 0;
      const isTomorrow = daysCount === 1;
      const isAfterSignUpDate = moment(this.props.profile.createdAt).isAfter(
        newDate,
      );

      this.setState({updating: true}, () => {
        this.setState({
          daysCount,
          isToday,
          isTomorrow,
          isAfterSignUpDate,
          day: newDate.format('dddd').toUpperCase(),
          date: newDate.format('ll'),
          timestamp: newDate.valueOf(),
          updating: false,
        });
      });
    };

    render() {
      const {schedule} = this.props;
      const {timestamp} = this.state;

      const daySchedule = schedule[timestamp] || [];

      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          schedule={daySchedule}
          onDateChange={this.handleDateChange}
        />
      );
    }
  }

  function mapStateToProps({plan, schedule, profile}) {
    return {plan, schedule, profile};
  }

  CalendarHOC.propTypes = {
    schedule: PropTypes.objectOf(PropTypes.any).isRequired,
    loadSchedule: PropTypes.func.isRequired,
    loadProfile: PropTypes.func.isRequired,
  };

  return connect(mapStateToProps, {
    loadSchedule,
    loadProfile,
  })(CalendarHOC);
};

export default CalendarHOCWrapper;
