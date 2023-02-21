import React, {Component} from 'react';
import {Alert} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {connect} from 'react-redux';
import {loadCrossTraining} from '../../actions';
import {DATE_FORMAT} from '../../constants';
import {addScheduleItem} from '../../actions';

const CrossTrainingScreenHOCWrapper = (InnerComponent) => {
  class CrossTrainingScreenHOC extends Component {
    static navigationOptions = {
      header: () => null,
    };

    state = {
      loading: true,
      scheduling: false,
      activity: {},
    };

    async componentDidMount() {
      const {id, date, scheduleId, type} = this.props.route.params ?? {};

      const activity = await this.props.loadCrossTraining({
        type,
        id,
        date,
        scheduleId,
      });

      this.setState({
        activity,
        loading: false,
      });
    }

    addToToday = async () => {
      const {fullSchedule, navigation, remoteConfigs, trackerScreenInfo} = this.props;
      const {activity} = this.state;
      const date = moment().format(DATE_FORMAT);
      const numberActitivitesPerDay =
        remoteConfigs.number_of_activities_per_day;

      if (
        fullSchedule[date] &&
        fullSchedule[date].length >= numberActitivitesPerDay
      ) {
        Alert.alert(
          "Today's Limit Reached",
          `You can't schedule more than ${numberActitivitesPerDay} activities for today`,
        );
      } else {
        let scheduleId;

        if (trackerScreenInfo[date]) {

          const scheduledObject = trackerScreenInfo[
            date
          ]?.trainings?.scheduled.find(
            obj => obj.key === activity.key,
          );


          if (scheduledObject?.scheduleId) {
            scheduleId = scheduledObject.scheduleId;
          }
        }

        if (!scheduleId) {
          const {uid, id} = await this.props.addScheduleItem({
            date,
            scheduleItem: {
              ...activity,
              type: 'cross-training',
              id: activity.key,
            },
          });
          scheduleId = uid;
        }

        navigation.navigate('CrossTraining', {
          id: activity.key,
          scheduleId,
          date,
          type: 'cross-training',
          canStart: true,
        });
      }
    };

    handleAddToCalendarPress = async () => {
      const addToDate = this.props.route.params?.onAddToCalendarPress;

      try {
        this.setState({scheduling: true});

        if (addToDate) {
          await addToDate();
        } else {
          await this.addToToday();
        }
      } finally {
        this.setState({scheduling: false});
      }
    };

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onAddToCalendarPress={this.handleAddToCalendarPress}
        />
      );
    }
  }

  CrossTrainingScreenHOC.propTypes = {
    navigation: PropTypes.shape({navigate: PropTypes.func}).isRequired,
    route: PropTypes.object.isRequired,
    loadCrossTraining: PropTypes.func.isRequired,
    addScheduleItem: PropTypes.func.isRequired,
    fullSchedule: PropTypes.object.isRequired,
    remoteConfigs: PropTypes.any.isRequired,
  };

  const mapStateToProps = (state) => ({
    fullSchedule: state.schedule,
    remoteConfigs: state.remoteConfigs,
    trackerScreenInfo: state.trackerScreenInfo,
  });

  return connect(mapStateToProps, {
    loadCrossTraining,
    addScheduleItem,
  })(CrossTrainingScreenHOC);
};

export default CrossTrainingScreenHOCWrapper;
