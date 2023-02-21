import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {HeaderProgress} from '../../layout';

const ExerciseRepsScreenHOCWrapper = (InnerComponent) => {
  class ExerciseRepsScreenHOC extends PureComponent {
    static navigationOptions = {
      header: (props) => <HeaderProgress {...props} title="EXERCISE" />,
    };

    state = {
      loading: true,
      exercise: {},
      reps: null,
    };

    async componentDidMount() {
      const {exercise, onCompleteExercise} = this.props.route.params ?? {};

      this.setState({
        loading: false,
        exercise,
        onCompleteExercise,
        reps: exercise.stats.reps ? exercise.stats.reps : 1,
      });
    }

    handleIncrementRep = () => {
      const {reps} = this.state;

      this.setState({reps: reps + 1});
    };

    handleDecrementRep = () => {
      const {reps} = this.state;

      if (reps >= 1) {
        this.setState({reps: reps - 1});
      } else {
        this.setState({reps});
      }
    };

    handleNext = () => {
      const {navigation} = this.props;
      const {exercise, onCompleteExercise, reps} = this.state;

      // Trick part for updating the reps number
      const exerciseWithReps = Object.assign({}, exercise);
      exerciseWithReps.stats = Object.assign({}, exercise.stats);
      exerciseWithReps.stats.reps = reps;

      navigation.navigate('Exercise', {
        exercise: exerciseWithReps,
        onCompleteExercise,
      });
    };

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onIncrementRep={this.handleIncrementRep}
          onDecrementRep={this.handleDecrementRep}
          onNext={this.handleNext}
        />
      );
    }
  }

  ExerciseRepsScreenHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    route: PropTypes.object.isRequired,
  };

  return ExerciseRepsScreenHOC;
};

export default ExerciseRepsScreenHOCWrapper;
