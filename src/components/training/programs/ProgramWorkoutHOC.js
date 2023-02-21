import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadWorkout} from '../../../actions';

const ProgramScreenHOCWrapper = (InnerComponent) => {
  class ProgramScreenHOC extends Component {
    state = {
      loading: true,
    };

    componentDidMount() {
      const {workoutId} = this.props;

      this.props.loadWorkout(workoutId).then(() => {
        this.setState({loading: false});
      });
    }

    render() {
      const {workouts, workoutId} = this.props;

      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          workout={workouts[workoutId] || {}}
        />
      );
    }
  }

  ProgramScreenHOC.propTypes = {
    workoutId: PropTypes.string.isRequired,
    workouts: PropTypes.objectOf(PropTypes.any).isRequired,
    loadWorkout: PropTypes.func.isRequired,
  };

  function mapStateToProps({workouts}) {
    return {workouts};
  }

  return connect(mapStateToProps, {
    loadWorkout,
  })(ProgramScreenHOC);
};

export default ProgramScreenHOCWrapper;
