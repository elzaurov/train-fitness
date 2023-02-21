import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Animated, Alert} from 'react-native';
import moment from 'moment';
import {sumStats, AppStorage, logEvent} from '../../utils';
import {
    loadWorkout,
    loadExercise,
    loadScheduleItem,
    updateStats,
    updateCurrentProgram,
    updateMilestones,
    completeScheduleItem,
    updateStreak,
} from '../../actions';
import {withMilestones} from '../../hocs';

import {
    ANALYTICS_SCHEDULED_WORKOUT_OPENED,
    ANALYTICS_SCHEDULED_WORKOUT_FINISHED,
    MILESTONE_FINISHED_FIRST_ACTIVITY,
    MILESTONE_FINISHED_FIRST_BODY_ACTIVITY,
    MILESTONE_STARTED_FIRST_ACTIVITY,
    MILESTONE_STARTED_FIRST_BODY_ACTIVITY,
    DATE_FORMAT,
    FINISH_IN_PAST_MAX_DAYS,
} from '../../constants';

const DoingWorkoutScreenHOCWrapper = InnerComponent => {
    class DoingWorkoutScreenHOC extends Component {
        constructor(props) {
            super(props);
            // Create storage instance for last index of finished exercise
            const {id, date} = this.props.route.params ?? {};
            const storageKey = `workout__finished_index_${id}_${date}`;
            this.workoutStorage = new AppStorage(storageKey);

            this.state = {
                canStart: false,
                loading: true,
                inProgress: false,
                workout: {},
                exercises: [],
                exerciseIndex: 0,
                lastExerciseIndex: 0,
                submitting: false,
                scrollY: new Animated.Value(0),
            };
        }

        async componentDidMount() {
            const {assertMilestone} = this.props;
            let {exercises} = this.state;

            const {
                id: workoutId,
                scheduleId,
                date,
                currentProgram,
            } = this.props.route.params ?? {};

            assertMilestone(
                [
                    MILESTONE_STARTED_FIRST_ACTIVITY,
                    MILESTONE_STARTED_FIRST_BODY_ACTIVITY,
                ],
                {activityType: 'workout'},
            );
            const workout = await this.props.loadWorkout(workoutId);

            let schedule;

            const eventParams = {
                id: workout.key,
                name: workout.name,
            };

            if (date && scheduleId) {
                logEvent(ANALYTICS_SCHEDULED_WORKOUT_OPENED);

                schedule = await this.props.loadScheduleItem({
                    date,
                    scheduleId,
                });

                eventParams.date = date;
                eventParams.schedule_id = scheduleId;
            }

            // Load exercises
            const exercisesPromises = [];
            workout.exercises.forEach(e => {
                exercisesPromises.push(this.props.loadExercise(e));
            });
            exercises = await Promise.all(exercisesPromises);

            exercises = exercises.map(e => ({
                ...e,
                time: 0,
            }));

            let canStart = false;
            if (schedule) {
                canStart = moment(schedule.date, DATE_FORMAT).isSameOrBefore(
                    moment(),
                );
                // &&
                // moment().diff(moment(schedule.date, DATE_FORMAT), 'days') <
                //     FINISH_IN_PAST_MAX_DAYS;
            }

            const scheduledDate =
                schedule && moment(schedule.date, DATE_FORMAT);

            this.setState({
                workout,
                exercises,
                schedule,
                currentProgram,
                loading: false,
                lastExerciseIndex: exercises.length - 1,
                canStart,
                scheduledDate,
            });
            try {
                const storedExercises = await this.workoutStorage.get();
                const newExerciseIndex = storedExercises.filter(
                    item => item.time,
                );

                this.setState({
                    exercises: storedExercises,
                    exerciseIndex: newExerciseIndex.length,
                });
            } catch (error) {
                this.workoutStorage.set(exercises);
            }
        }

        handleGoBackToTracker = () => {
            this.props.navigation.navigate('Main');
        };

        handleNextExercise = newIndex => {
            const {exercises, lastExerciseIndex} = this.state;
            const {canStart} = this.state;
            this.setState(
                {
                    inProgress: true,
                },
                () => {
                    const currentExercise = exercises[newIndex];

                    const isLastExerciseCompleted = newIndex > exercises.length;

                    if (!isLastExerciseCompleted) {
                        this.setState(
                            {
                                exerciseIndex: newIndex,
                            },
                            () => {
                                this.props.navigation.navigate('Exercise', {
                                    id: currentExercise.key,
                                    canStart,
                                    onCompleteExercise:
                                        this.handleCompleteExercise,
                                    name: currentExercise.name,
                                    percentage:
                                        (newIndex + 1) / exercises.length,
                                    totalExercises: exercises.length,
                                    currentExerciseIndex: newIndex,
                                    lastExerciseIndex,
                                });
                            },
                        );
                    }
                },
            );
        };

        handleCompleteExercise = time => {
            const {navigation} = this.props;
            const {exercises, exerciseIndex, lastExerciseIndex, canStart} =
                this.state;

            // Update time spent on the exercise
            exercises[exerciseIndex].time = time;

            this.setState(
                {
                    exercises,
                    exerciseIndex: exerciseIndex + 1,
                },
                () => {
                    if (lastExerciseIndex === exerciseIndex) {
                        this.evaluateWorkout();
                    } else {
                        const currentExercise = exercises[exerciseIndex + 1];
                        this.workoutStorage.set(exercises);
                        navigation.push('Exercise', {
                            id: currentExercise.key,
                            canStart,
                            onCompleteExercise: this.handleCompleteExercise,
                            name: currentExercise.name,
                            percentage: (exerciseIndex + 2) / exercises.length,
                            currentExercise: exerciseIndex + 1,
                            totalExercises: exercises.length,
                            currentExerciseIndex: exerciseIndex + 1,
                            lastExerciseIndex,
                        });
                    }
                },
            );
        };

        handleSubmitWorkout = () => {
            const {exercises} = this.state;
            const completedExercises = exercises.filter(e => e.time).length;

            if (completedExercises < exercises.length) {
                const missingExercises = exercises.length - completedExercises;
                Alert.alert(
                    `You have ${missingExercises} exercises left`,
                    'Are you sure you want to finish?',
                    [
                        {text: 'CANCEL', onPress: null},
                        {text: 'YES', onPress: () => this.evaluateWorkout()},
                    ],
                    {cancelable: false},
                );
            } else {
                this.evaluateWorkout();
            }
        };

        evaluateWorkout = async () => {
            const {navigation} = this.props;
            const {workout, exercises} = this.state;
            const duration = exercises.map(e => e.time).reduce((a, b) => a + b);

            this.setState({exerciseIndex: 0});
            await this.workoutStorage.remove();

            navigation.push('WorkoutEvaluation', {
                activity: workout,
                duration,
                onFinishActivity: this.submitWorkout,
            });
        };

        submitWorkout = async duration => {
            const {navigation, assertMilestone} = this.props;
            const {workout, exercises, schedule, currentProgram} = this.state;
            const {thumbnail, name, url, sizedImages} = workout;

            if (currentProgram) {
                this.props.updateCurrentProgram(currentProgram);
            }

            const seconds = Math.floor(duration / 1000);
            const minutes = seconds / 60;

            const stats = this.calculateStats(exercises);

            if (!stats.exp) {
                stats.exp = 0;
            }

            try {
                this.setState({submitting: true});

                const newStats = {...stats, workouts: 1};

                const tasks = [
                    this.updateStats(newStats),
                    this.updateSchedule(newStats, seconds),
                ];

                await Promise.all(tasks);

                logEvent(ANALYTICS_SCHEDULED_WORKOUT_FINISHED);

                assertMilestone(
                    [
                        MILESTONE_FINISHED_FIRST_ACTIVITY,
                        MILESTONE_FINISHED_FIRST_BODY_ACTIVITY,
                    ],
                    {activityType: 'workout'},
                );

                navigation.push('RewardMenu', {
                    data: {
                        metadata: {
                            key: workout.key,
                            thumbnail,
                            name,
                            url,
                            sizedImages,
                            category: 'Workouts',
                            time: minutes,
                            experience: stats.exp,
                        },
                        schedule: {...schedule, time: seconds},
                        stats,
                    },
                });
            } finally {
                this.setState({submitting: false});
            }
        };

        calculateStats = exercises => {
            const totalStats = {};

            for (const key in exercises) {
                const {stats} = exercises[key];
                const totalReps = stats.reps * stats.sets || 0;
                sumStats(totalStats, stats, totalReps);
            }

            delete totalStats.reps;
            delete totalStats.sets;

            return totalStats;
        };

        async updateStats(stats) {
            const {workout} = this.state;

            await this.props.updateStats({
                action: 'workouts',
                stats: {
                    ...stats,
                    metadata: {
                        url: `/workout/${workout.key}`,
                        type: 'workout',
                        ...workout,
                    },
                },
            });
        }

        async updateSchedule(stats, time) {
            const {exp, ...sts} = stats;
            const {schedule} = this.state;
            const {date, uid} = schedule;

            await this.props.completeScheduleItem({
                scheduleId: uid,
                stats: sts,
                date,
                exp,
                time,
            });
            await this.props.updateStreak();
        }

        render() {
            console.log(
                '🚀 ~ file: DoingWorkoutScreenHOC.js ~ line 368 ~ DoingWorkoutScreenHOC ~ render ~ this.state',
                this.state.canStart,
            );

            return (
                <InnerComponent
                    {...this.state}
                    {...this.props}
                    onNextExercise={this.handleNextExercise}
                    onCompleteExercise={this.handleCompleteExercise}
                    onSubmitWorkout={this.handleSubmitWorkout}
                    onGoBackToTracker={this.handleGoBackToTracker}
                />
            );
        }
    }

    DoingWorkoutScreenHOC.propTypes = {
        navigation: PropTypes.objectOf(PropTypes.any).isRequired,
        route: PropTypes.objectOf(PropTypes.any).isRequired,
        workouts: PropTypes.any.isRequired,
        loadWorkout: PropTypes.func.isRequired,
        loadExercise: PropTypes.func.isRequired,
        loadScheduleItem: PropTypes.func.isRequired,
        updateCurrentProgram: PropTypes.func.isRequired,
        updateStats: PropTypes.func.isRequired,
        updateStreak: PropTypes.func.isRequired,
        completeScheduleItem: PropTypes.func.isRequired,
        assertMilestone: PropTypes.func.isRequired,
    };

    const mapStateToProps = state => ({
        workouts: state.workouts,
    });

    const enhancedDoingWorkoutScreenHOC = withMilestones(DoingWorkoutScreenHOC);

    enhancedDoingWorkoutScreenHOC.navigationOptions = {
        header: () => null,
    };

    return connect(mapStateToProps, {
        loadWorkout,
        loadExercise,
        loadScheduleItem,
        updateStats,
        updateCurrentProgram,
        completeScheduleItem,
        updateMilestones,
        updateStreak,
    })(enhancedDoingWorkoutScreenHOC);
};

export default DoingWorkoutScreenHOCWrapper;
