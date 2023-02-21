import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadWorkouts, loadCategories} from '../../actions';

const WorkoutsScreenHOCWrapper = (InnerComponent) => {
  class WorkoutsScreenHOC extends Component {
    state = {
      workouts: [],
      categories: [],
      selectedCategories: [],
      loading: true,
    };

    async componentDidMount() {

      this.setState({loading: true});

      const [workouts, categories] = await Promise.all([
        this.props.loadWorkouts(),
        this.props.loadCategories('exercises'),
      ]);

      // redux backward compatibility
      const workoutsArray = Object.entries(workouts).map(([key, workout]) => ({
        ...workout,
        key,
        categories:
          workout.categories &&
          workout.categories.map((categoryKey) =>
            categories.find((category) => category.key === categoryKey),
          ),
      }));

      this.setState({
        workouts: workoutsArray,
        categories,
        loading: false,
      });
    }

    handleSelectWorkout = (id) => {
      this.props.navigation.push('Workout', {id});
    };

    handleCategorySelect = (category) => {
      this.setState((state) => {
        let selectedCategories;

        if (category.label === 'All') {
          selectedCategories = [];
        } else if (state.selectedCategories.includes(category)) {
          selectedCategories = state.selectedCategories.filter(
            (cat) => cat !== category,
          );
        } else {
          selectedCategories = [...state.selectedCategories, category];
        }

        return {selectedCategories};
      });
    };

    render() {
      // NOTE: performance issue in this kind of filtering, refactor needed
      let filteredWorkouts;

      if (
        this.state.selectedCategories &&
        this.state.selectedCategories.length
      ) {
        filteredWorkouts = this.state.workouts.filter((workout) =>
          // eslint-disable-next-line max-len
          this.state.selectedCategories.every(
            (category) =>
              workout.categories && workout.categories.includes(category),
          ),
        );
      } else {
        filteredWorkouts = this.state.workouts;
      }

      const sortedWorkouts = filteredWorkouts.sort(({isPremium}) =>
        isPremium ? 1 : -1,
      );

      return (
        <InnerComponent
          {...this.props}
          {...this.state}
          workouts={sortedWorkouts}
          onWorkoutSelect={this.handleSelectWorkout}
          onCategorySelect={this.handleCategorySelect}
        />
      );
    }
  }

  WorkoutsScreenHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    loadWorkouts: PropTypes.func.isRequired,
    loadCategories: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state) => ({
    userRole: state.userRole,
  });

  const mapDispatchToProps = {
    loadWorkouts,
    loadCategories,
  };

  return connect(mapStateToProps, mapDispatchToProps)(WorkoutsScreenHOC);
};

export default WorkoutsScreenHOCWrapper;
