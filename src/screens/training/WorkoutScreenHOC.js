import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Alert} from 'react-native';
import moment from 'moment';
import {loadScheduleItem, loadWorkout, addScheduleItem} from '../../actions';
import {Header} from '../../layout';
import {logEvent} from '../../utils';
import {ANALYTICS_ADD_TO_CALENDAR_SELECTED, DATE_FORMAT} from '../../constants';

const WorkoutScreenHOCWrapper = InnerComponent => {
    class WorkoutScreenHOC extends Component {
        static navigationOptions = {
            title: 'WORKOUT',
            header: props => <Header {...props} backButton />,
        };

        _isMounted = false;

        state = {
            currentProgram: undefined,
            loading: true,
            workoutId: undefined,
            schedule: undefined,
            onAddToCalendarPress: undefined,
            scheduling: false,
        };

        async componentDidMount() {
            this._isMounted = true;
            const {
                id: workoutId,
                date,
                scheduleId,
                currentProgram,
                onAddToCalendarPress,
                showButton,
            } = this.props.route.params ?? {};
            let schedule;

            const workout = await this.props.loadWorkout(workoutId);

            const eventParams = {
                id: workout.key,
                name: workout.name,
            };

            if (date && scheduleId) {
                schedule = await this.props.loadScheduleItem({
                    date,
                    scheduleId,
                });

                eventParams.date = date;
                eventParams.schedule_id = scheduleId;
            }

            if (this._isMounted) {
                this.setState({
                    currentProgram,
                    schedule,
                    workoutId,
                    onAddToCalendarPress,
                    showButton,
                    loading: false,
                });
            }
        }

        componentWillUnmount() {
            this._isMounted = false;
        }

        addToToday = async () => {
            const { workouts, fullSchedule, navigation, remoteConfigs, trackerScreenInfo } =
                this.props;
            const date = moment().format(DATE_FORMAT);
            const workout = workouts[this.state.workoutId];
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
                        obj => obj.key === workout.key,
                    );


                    if (scheduledObject?.scheduleId) {
                        scheduleId = scheduledObject.scheduleId;
                    }
                }

                if (!scheduleId) {
                    const { uid, id } = await this.props.addScheduleItem({
                        date,
                        scheduleItem: {
                            ...workout,
                            type: 'workout',
                            id: workout.key,
                        },
                    });
                    scheduleId = uid;
                }
                navigation.navigate('Performing', {
                    screen: 'Workout',
                    params: {
                        id: workout.key,
                        scheduleId,
                        date,
                        type: 'workout',
                        canStart: true,
                    },
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
            const {workoutId} = this.state;
            const {workouts} = this.props;

            return (
                <InnerComponent
                    {...this.state}
                    {...this.props}
                    workout={workouts[workoutId] || {}}
                    onAddToCalendarPress={this.handleAddToCalendarPress}
                />
            );
        }
    }

    WorkoutScreenHOC.propTypes = {
        navigation: PropTypes.objectOf(PropTypes.any).isRequired,
        route: PropTypes.object.isRequired,
        workouts: PropTypes.objectOf(PropTypes.any).isRequired,
        loadScheduleItem: PropTypes.func.isRequired,
        loadWorkout: PropTypes.func.isRequired,
        addScheduleItem: PropTypes.func.isRequired,
        fullSchedule: PropTypes.object.isRequired,
        remoteConfigs: PropTypes.any.isRequired,
    };

    WorkoutScreenHOC.defaultProps = {
        onAddToCalendarPress: null,
    };

    const mapStateToProps = state => ({
        workouts: state.workouts,
        fullSchedule: state.schedule,
        remoteConfigs: state.remoteConfigs,
        trackerScreenInfo: state.trackerScreenInfo,
    });

    return connect(mapStateToProps, {
        loadScheduleItem,
        loadWorkout,
        addScheduleItem,
    })(WorkoutScreenHOC);
};

export default WorkoutScreenHOCWrapper;
