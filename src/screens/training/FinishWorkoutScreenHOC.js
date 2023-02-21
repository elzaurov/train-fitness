import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {connect} from 'react-redux';
import {
    updateCurrentProgram,
    updateStats,
    completeScheduleItem,
    stopTimer,
    updateStreak,
} from '../../actions';
import {sumStats} from '../../utils';
import {Header} from '../../layout';

const FinishWorkoutScreenHOCWrapper = InnerComponent => {
    class FinishWorkoutScreenHOC extends Component {
        static navigationOptions = {
            title: 'FINISH WORKOUT',
            header: props => <Header {...props} backButton />,
        };

        state = {
            completing: false,
            timestamp: null,
            schedule: {},
            metadata: {},
            workout: {},
            opened: false,
            loading: false,
            stats: null,
            hours: '',
            minutes: '',
            seconds: '',
        };

        componentDidMount() {
            const {timer} = this.props;
            const {currentProgram, metadata, playlist, schedule, workout} =
                this.props.route.params?.data ?? {};

            let start = timer.start || moment().valueOf();

            if (timer.pauseTimestamp) {
                const diff = moment().diff(
                    moment(timer.pauseTimestamp),
                    'milliseconds',
                );
                start = timer.start + diff;
            }

            const diff = moment(timer.end).diff(moment(start));
            const duration = moment.duration(diff);

            this.setState({
                hours: String(duration.hours()),
                minutes: String(duration.minutes()),
                seconds: String(duration.seconds()),
                currentProgram,
                workout,
                playlist,
                schedule,
                metadata,
            });
        }

        handleCompleteClick = () => {
            const {navigation} = this.props;
            const {
                currentProgram,
                metadata,
                schedule,
                hours,
                minutes,
                seconds,
            } = this.state;

            const stats = this.calculateStats();
            const time =
                Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);

            if (currentProgram) {
                this.props.updateCurrentProgram(currentProgram);
            }

            if (!stats.exp) {
                stats.exp = 0;
            }

            this.setState({completing: true}, () => {
                const newStats = {...stats, workouts: 1};

                Promise.all([
                    this.updateStats(newStats),
                    this.updateSchedule(newStats, Number(time)),
                    this.props.stopTimer(),
                    this.props.updateStreak(),
                ]).then(() => {
                    navigation.push('RewardMenu', {
                        data: {
                            metadata: {
                                ...metadata,
                                time: Math.round(Number(time) / 60),
                                experience: stats.exp,
                            },
                            schedule: {...schedule, time},
                            stats,
                        },
                    });
                });
            });
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
        }

        calculateStats = () => {
            const {playlist} = this.state;
            const totalStats = {};

            for (const key in playlist) {
                const {exercise, reps, sets} = playlist[key];
                const totalReps = reps * sets || 0;
                const {stats} = exercise;
                sumStats(totalStats, stats, totalReps);
            }

            delete totalStats.reps;
            delete totalStats.sets;

            return totalStats;
        };

        hadleChangeDuration = ({state, text}) => {
            this.setState({[state]: text});
        };

        render() {
            return (
                <InnerComponent
                    {...this.state}
                    {...this.props}
                    onCompleteClick={this.handleCompleteClick}
                    onChangeDuration={this.hadleChangeDuration}
                    canComplete={validateTimeFields(this.state)}
                />
            );
        }
    }

    FinishWorkoutScreenHOC.propTypes = {
        navigation: PropTypes.objectOf(PropTypes.any).isRequired,
        route: PropTypes.object.isRequired,
        timer: PropTypes.objectOf(PropTypes.any).isRequired,
        updateCurrentProgram: PropTypes.func.isRequired,
        updateStats: PropTypes.func.isRequired,
        completeScheduleItem: PropTypes.func.isRequired,
        updateStreak: PropTypes.func.isRequired,
        stopTimer: PropTypes.func.isRequired,
    };

    function mapStateToProps({timer, tracker}) {
        return {timer, tracker};
    }

    return connect(mapStateToProps, {
        updateStats,
        updateCurrentProgram,
        completeScheduleItem,
        stopTimer,
        updateStreak,
    })(FinishWorkoutScreenHOC);
};

export default FinishWorkoutScreenHOCWrapper;

function validateTimeFields({hours, minutes, seconds}) {
    if (hours === '' || Number.isNaN(Number(hours)) || Number(hours) < 0) {
        return false;
    }

    if (
        minutes === '' ||
        Number.isNaN(Number(minutes)) ||
        Number(minutes) < 0
    ) {
        return false;
    }

    if (
        seconds === '' ||
        Number.isNaN(Number(seconds)) ||
        Number(seconds) < 0
    ) {
        return false;
    }

    return true;
}
