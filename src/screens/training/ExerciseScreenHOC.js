import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logEvent} from '../../utils';
import {loadExercise, updateStreak} from '../../actions';
import {HeaderProgressBar, ExerciseNumber} from '../../components';
import {ANALYTICS_EXERCISE_OPENED} from '../../constants';

const ExerciseScreenHOCWrapper = InnerComponent => {
    class ExerciseScreenHOC extends Component {
        constructor(props) {
            super(props);

            const {
                currentExerciseIndex = 1,
                lastExerciseIndex = 1,
                canStart,
            } = this.props.route.params ?? {};

            this.state = {
                loading: true,
                exercise: {},
                disableTimer: props.route.params?.disableTimer ?? false,
                currentExerciseIndex,
                lastExerciseIndex,
                canStart,
            };
        }

        static navigationOptions = ({route, navigation}) => ({
            header: props => {
                return (
                    <HeaderProgressBar
                        {...props}
                        title={route.params?.name ?? 'EXERCISE'}
                        percentage={route.params?.percentage ?? 0}
                        rightItem={
                            route.params?.onCompleteExercise ? (
                                <ExerciseNumber
                                    onPress={() => navigation.popToTop()}
                                    current={
                                        (route.params?.currentExerciseIndex ??
                                            0) + 1
                                    }
                                    total={route.params?.totalExercises ?? 1}
                                />
                            ) : null
                        }
                    />
                );
            },
        });

        async componentDidMount() {
            const {exercises} = this.props;
            const exerciseId = this.props.route.params?.id;

            const exercise = exercises[exerciseId]
                ? exercises[exerciseId]
                : await this.props.loadExercise(exerciseId);

            logEvent(ANALYTICS_EXERCISE_OPENED, {
                id: exercise.key,
                name: exercise.name,
            });

            this.setState({
                exercise,
                loading: false,
            });
        }

        handleCompleteExercise = timeSpent => {
            const onCompleteExercise =
                this.props.route.params?.onCompleteExercise;
            if (onCompleteExercise) {
                onCompleteExercise(timeSpent);
                this.props.updateStreak();
            }
        };

        render() {
            return (
                <InnerComponent
                    {...this.state}
                    {...this.props}
                    onCompleteExercise={this.handleCompleteExercise}
                />
            );
        }
    }

    ExerciseScreenHOC.propTypes = {
        route: PropTypes.object.isRequired,
        exercises: PropTypes.any.isRequired,
        loadExercise: PropTypes.func.isRequired,
        updateStreak: PropTypes.func.isRequired,
    };

    function mapStateToProps({exercises}) {
        return {exercises};
    }

    return connect(mapStateToProps, {loadExercise, updateStreak})(
        ExerciseScreenHOC,
    );
};

export default ExerciseScreenHOCWrapper;
