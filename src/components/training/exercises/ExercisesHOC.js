import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadCategories, loadExercises} from '../../../actions';
import {EXERCISE_CATEGORIES} from '../../../constants';

const ExercisesHOCWrapper = (InnerComponent) => {
  class ExercisesHOC extends Component {
    state = {
      isListSequencial: true,
      loading: true,
    };

    async componentDidMount() {
      await Promise.all([
        this.props.loadCategories(EXERCISE_CATEGORIES),
        this.props.loadExercises(),
      ]);

      this.setState({loading: false});
    }

    handleToggleListOptions = (isListSequencial) => {
      this.setState({isListSequencial});
    };

    render() {
      const {categories, exercises} = this.props;
      const filteredExercises = exercises.filter(
        (e) => e.categories && e.categories.length > 0,
      );
      const sortedExercises = filteredExercises.sort(({isPremium}) =>
        isPremium ? 1 : -1,
      );

      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          exercises={sortedExercises}
          categories={categories[EXERCISE_CATEGORIES]}
          onToggleListOptions={this.handleToggleListOptions}
        />
      );
    }
  }

  ExercisesHOC.propTypes = {
    categories: PropTypes.objectOf(PropTypes.any).isRequired,
    exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
    loadCategories: PropTypes.func.isRequired,
    loadExercises: PropTypes.func.isRequired,
  };

  function mapStateToProps({categories, exercises}) {
    return {categories, exercises};
  }

  return connect(mapStateToProps, {
    loadCategories,
    loadExercises,
  })(ExercisesHOC);
};

export default ExercisesHOCWrapper;
