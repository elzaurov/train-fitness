import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadWorkout} from '../../actions';

const WorkoutsHOCWrapper = (InnerComponent) => {
  class WorkoutsHOC extends Component {
    state = {
      phases: [],
      loading: true,
    };

    async componentDidMount() {
      this.setState({loading: true});
      const {phases} = this.props;

      const loadedPhases = await Promise.all(
        phases.map(async (phase) => {
          const {workouts} = phase;
          const loadedWorkouts = await Promise.all(
            workouts.map((workoutKey) => this.props.loadWorkout(workoutKey)),
          );

          return {
            ...phase,
            workouts: loadedWorkouts,
          };
        }),
      );

      this.setState({
        loading: false,
        phases: loadedPhases,
      });
    }

    handleWorkoutSelect = (id) => {
      this.props.navigation.push('Workout', {id});
    };

    render() {
      return (
        <InnerComponent
          {...this.props}
          {...this.state}
          onWorkoutSelect={this.handleWorkoutSelect}
        />
      );
    }
  }

  WorkoutsHOC.propTypes = {
    loadWorkout: PropTypes.func.isRequired,
    phases: PropTypes.array.isRequired,
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  const mapDispatchToProps = {
    loadWorkout,
  };

  return connect(null, mapDispatchToProps)(WorkoutsHOC);
};

export default WorkoutsHOCWrapper;
