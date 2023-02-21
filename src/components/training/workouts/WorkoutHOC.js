import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadExercises, updateStreak} from '../../../actions';

const WorkoutHOCWrapper = InnerComponent => {
    class WorkoutHOC extends Component {
        state = {
            exercises: [],
            loading: true,
            selectedExercise: {},
            playlist: {},
        };

        async componentDidMount() {
            const {schedule, workout} = this.props;

            const tasks = exercises.map(async id =>
                await this.props.loadExercise(id)
            );

            const exercises = await Promise.all(tasks);

            exercises.sort((e1, e2) => {
                const index1 = workout.exercises.indexOf(e1.key);
                const index2 = workout.exercises.indexOf(e2.key);

                return index1 > index2 ? 1 : -1;
            });

            const cachedPlaylist = await AsyncStorage.getItem('playlist');
            let playlist = {};

            if (cachedPlaylist && schedule) {
                const {scheduleId, data} = JSON.parse(cachedPlaylist);

                if (scheduleId === schedule.uid) {
                    playlist = data;
                } else {
                    AsyncStorage.removeItem('playlist');
                }
            }

            this.setState({
                loading: false,
                selectedExercise: exercises[0] || {},
                exercises,
                playlist,
            });
        }

        handleSelectExercise = selectedExercise => {
            this.setState({selectedExercise});
        };

        handleCompleteExercise = ({exercise, reps, sets}) => {
            const {playlist} = this.state;

            playlist[exercise.key] = {exercise, reps, sets};

            this.setState({playlist}, () => {
                this.updateLocalStoragePlaylist();
                this.props.updateStreak();
            });
        };

        handleRemoveCompleteExercise = key => {
            const {playlist} = this.state;

            delete playlist[key];

            this.setState({playlist}, () => {
                this.updateLocalStoragePlaylist();
            });
        };

        updateLocalStoragePlaylist() {
            const {schedule} = this.props;
            const {playlist} = this.state;

            AsyncStorage.setItem(
                'playlist',
                JSON.stringify({
                    scheduleId: schedule.uid,
                    data: playlist,
                }),
            );
        }

        handleFinish = () => {
            const {currentProgram, schedule, workout} = this.props;
            const {playlist} = this.state;
            const {thumbnail, name, url, sizedImages} = workout;

            this.props.navigation.push('FinishWorkout', {
                data: {
                    currentProgram,
                    playlist,
                    schedule,
                    workout,
                    metadata: {
                        key: workout.key,
                        thumbnail,
                        name,
                        url,
                        sizedImages,
                        category: 'Workouts',
                    },
                },
            });
        };

        render() {
            const {exercises, playlist} = this.state;
            const completedExercises = Object.keys(playlist).length;

            return (
                <InnerComponent
                    {...this.props}
                    {...this.state}
                    hasCheckedItems={completedExercises > 0}
                    hasUncheckedItems={completedExercises !== exercises.length}
                    onCompleteExercise={this.handleCompleteExercise}
                    onRemoveCompleteExercise={this.handleRemoveCompleteExercise}
                    onSelectExercise={this.handleSelectExercise}
                    onFinish={this.handleFinish}
                />
            );
        }
    }

    WorkoutHOC.propTypes = {
        currentProgram: PropTypes.objectOf(PropTypes.any),
        navigation: PropTypes.objectOf(PropTypes.any).isRequired,
        schedule: PropTypes.objectOf(PropTypes.any),
        workout: PropTypes.objectOf(PropTypes.any).isRequired,
        loadExercises: PropTypes.func.isRequired,
        updateStreak: PropTypes.func.isRequired,
    };

    WorkoutHOC.defaultProps = {
        currentProgram: undefined,
        schedule: undefined,
    };

    return connect(null, {
        loadExercises,
        updateStreak,
    })(WorkoutHOC);
};

export default WorkoutHOCWrapper;
