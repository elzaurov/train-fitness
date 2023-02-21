import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import {loadSchedule} from '../../../actions';

const StatsGraphHOCWrapper = (InnerComponent) => {
  class StatsGraphHOC extends Component {
    state = {
      loading: true,
      points: [],
    };

    async componentDidMount() {
      const schedule = await this.props.loadSchedule();

      this.setState({loading: false});
      this.getGraphPoints(schedule);
    }

    UNSAFE_componentWillReceiveProps({schedule}) {
      this.getGraphPoints(schedule);
    }

    getGraphPoints(schedule) {
      const today = moment().endOf('day').valueOf();
      const last7days = moment().subtract(7, 'days').startOf('day').valueOf();
      const filteredSchedules = [].concat
        .apply(
          [],
          Object.keys(schedule).map((key) => schedule[key]),
        )
        .filter((s) => s.timestamp >= last7days && s.timestamp <= today);
      const pointsByDate = {};
      const timeByDate = {};

      for (let i = 0; i < 7; i += 1) {
        const day = moment().add(-i, 'days').format('DD/MMM');
        pointsByDate[day] = 0;
        timeByDate[day] = 0;
      }

      for (let i = 0; i < filteredSchedules.length; i += 1) {
        const scheduleItem = filteredSchedules[i];
        const day = moment(scheduleItem.timestamp).format('DD/MMM');
        pointsByDate[day] += scheduleItem.experience || 0;
        timeByDate[day] += (scheduleItem.time || 0) / 60;
      }

      const points = Object.keys(pointsByDate).map((day) => ({
        name: day,
        experience: pointsByDate[day] || 0,
        time: Math.round(timeByDate[day]) || 0,
      }));

      this.setState({points: points.reverse()});
    }

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  StatsGraphHOC.propTypes = {
    schedule: PropTypes.objectOf(PropTypes.any).isRequired,
    loadSchedule: PropTypes.func.isRequired,
  };

  function mapStateToProps({schedule, stats}) {
    return {schedule, stats};
  }

  return connect(mapStateToProps, {
    loadSchedule,
  })(StatsGraphHOC);
};

export default StatsGraphHOCWrapper;
