import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Alert} from 'react-native';
import moment from 'moment';
import {
  loadCurrentProgram,
  loadProgram,
  loadScheduleItem,
  addScheduleItem,
} from '../../actions';
import {analytics} from '../../config';
import {withMilestones} from '../../hocs';
import {
  PROGRAM_VIEW_EVENT,
  ANALYTICS_SCHEDULED_PROGRAM_OPENED,
  ANALYTICS_ADD_TO_CALENDAR_SELECTED,
  DATE_FORMAT,
  ANALYTICS_PROGRAM_OPENED,
  MILESTONE_STARTED_FIRST_BODY_ACTIVITY,
  MILESTONE_STARTED_FIRST_ACTIVITY,
} from '../../constants';
import {logEvent} from '../../utils';
import { trackerScreenInfo } from '../../store/reducers';

const ProgramScreenHOCWrapper = (InnerComponent) => {
  class ProgramScreenHOC extends Component {
    state = {
      currentProgram: undefined,
      currentWorkout: undefined,
      loading: true,
      programId: undefined,
      schedule: undefined,
      onAddToCalendarPress: undefined,
      scheduling: false,
    };

    async componentDidMount() {
      logEvent(ANALYTICS_PROGRAM_OPENED);

      const {assertMilestone} = this.props;
      const {
        id: programId,
        date,
        scheduleId,
        onAddToCalendarPress,
        disabledPhases,
      } = this.props.route.params;

      const program = await this.props.loadProgram(programId);
      
      const eventParams = {
        id: program.key,
        name: program.name,
      };

      if (date && scheduleId) {
        logEvent(ANALYTICS_SCHEDULED_PROGRAM_OPENED);

        assertMilestone(
          [
            MILESTONE_STARTED_FIRST_ACTIVITY,
            MILESTONE_STARTED_FIRST_BODY_ACTIVITY,
          ], 
          {activityType: 'program'},
        );

        const [schedule, currentProgram] = await Promise.all([
          this.props.loadScheduleItem({date, scheduleId}),
          this.props.loadCurrentProgram(programId),
        ]);

        eventParams.date = date;
        eventParams.schedule_id = scheduleId;

        if (schedule) {
          const workoutKeys = program.phases
            .map((phase) => phase.workouts)
            .reduce((w1, w2) => [...w1, ...w2], []);
          let currentWorkout = workoutKeys[0];

          if (currentProgram) {
            const {nextWorkout} = currentProgram;
            const nextWorkoutIndex = nextWorkout % workoutKeys.length;
            currentWorkout = workoutKeys[nextWorkoutIndex];
          }

          this.setState({schedule, currentProgram, currentWorkout});
        }
      }

      analytics.logEvent(PROGRAM_VIEW_EVENT, eventParams);

      this.setState({
        programId,
        onAddToCalendarPress,
        loading: false,
        disabledPhases: disabledPhases??false,
      });
    }

    addToToday = async () => {
      const { navigation, programs, fullSchedule, remoteConfigs, trackerScreenInfo } = this.props;
      const program = programs[this.state.programId];
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
            obj => obj.key === program.key,
          );


          if (scheduledObject?.scheduleId) {
            scheduleId = scheduledObject.scheduleId;
          }
        }
        
        if (!scheduleId) {
          const { uid, id } = await this.props.addScheduleItem({
            date,
            scheduleItem: {
              ...program,
              type: 'program',
              id: program.key,
            },
          });
          scheduleId = uid;
        }

        navigation.push('Performing', {
          screen: 'Program',
          params: { id: program?.key, scheduleId, date },
        });
      }
    };

    handleAddToCalendarPress = async () => {
      logEvent(ANALYTICS_ADD_TO_CALENDAR_SELECTED);

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
      const {programId} = this.state;
      const {programs} = this.props;

      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          program={programs[programId] || {}}
          onAddToCalendarPress={this.handleAddToCalendarPress}
        />
      );
    }
  }

  ProgramScreenHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    route: PropTypes.object.isRequired,
    programs: PropTypes.objectOf(PropTypes.any).isRequired,
    loadCurrentProgram: PropTypes.func.isRequired,
    loadProgram: PropTypes.func.isRequired,
    loadScheduleItem: PropTypes.func.isRequired,
    onAddToCalendarPress: PropTypes.func,
    addScheduleItem: PropTypes.func.isRequired,
    assertMilestone: PropTypes.func.isRequired,
    schedule: PropTypes.object,
    fullSchedule: PropTypes.any.isRequired,
    remoteConfigs: PropTypes.any.isRequired,
  };

  ProgramScreenHOC.defaultProps = {
    onAddToCalendarPress: null,
  };

  const mapStateToProps = (state) => ({
    programs: state.programs,
    fullSchedule: state.schedule,
    remoteConfigs: state.remoteConfigs,
    trackerScreenInfo: state.trackerScreenInfo,
  });

  const enhancedProgramScreenHOCWrapper = withMilestones(ProgramScreenHOC);

  enhancedProgramScreenHOCWrapper.navigationOptions = {
    title: 'PROGRAM',
    header: () => null,
  };

  return connect(mapStateToProps, {
    loadCurrentProgram,
    loadProgram,
    loadScheduleItem,
    addScheduleItem,
  })(enhancedProgramScreenHOCWrapper);
};

export default ProgramScreenHOCWrapper;
