import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadExercises, loadCategories, updateStreak, loadExercise} from '../../actions';
import {sumStats} from '../../utils';

const ExercisesHOCWrapper = (InnerComponent) => {
  class ExercisesHOC extends Component {
    state = {
      exercises: [],
      loading: true,
    };

    async componentDidMount() {
      const {exercises} = this.props;

      this.setState({
        loading: true,
      });

      const tasks = exercises.map(async id => 
         await this.props.loadExercise(id)
      );
      tasks.push(this.props.loadCategories('exercises'));


      const result = await Promise.all(tasks);

      const loadedCategories = result.pop();
      const loadedExercises = result;

      const categorizedExercises = loadedExercises
        .map((exercise) => ({
          ...exercise,
          categories:
            exercise.categories &&
            exercise.categories.map((catKey) =>
              loadedCategories.find(({key}) => key === catKey),
            ),
        }));

      this.setState({
        exercises: categorizedExercises,
        loading: false,
      });
    }

    handleCompleteExercise = async ({key, name}, timeSpent) => {
      const {navigation, storedExercises, updateStreak} = this.props;

      const exercise = storedExercises[key];
      await updateStreak();

      navigation.push('WorkoutEvaluation', {
        duration: timeSpent,
        individually: true,
        onFinishActivity: async duration => {

          const seconds = Math.floor(duration / 1000);
          const minutes = seconds / 60;

          const totalStats = {};
          const {stats} = exercise;
          const totalReps = stats.reps * stats.sets || 0;
          sumStats(totalStats, stats, totalReps);

          if (!totalStats.exp) {
            totalStats.exp = 0;
          }

          navigation.push('RewardMenu', {
            data: {
              stats,
              metadata: {
                key,
                name: exercise.name,
                thumbnail: exercise.thumbnail,
                sizedImages: exercise.sizedImages,
                url: null,
                navigateAfterDone: () => navigation.replace('Main', {screen: 'Train'}), //Changed as name change from training to train now 
                category: 'Exercises',
                time: minutes,
                experience: totalStats.exp,
              },
            },
          });
        },
      });
    };

    handleExerciseSelect = ({key, name}) => {
      this.props.navigation.navigate('Performing', {
        screen: 'Exercise',
        params: {
          id: key,
          name,
          disableTimer: true,
          canStart: true,
          onCompleteExercise: duration =>
              this.handleCompleteExercise({key, name}, duration),
        },
      });
    };

    render() {
      return (
        <InnerComponent
          {...this.props}
          {...this.state}
          onExerciseSelect={this.handleExerciseSelect}
        />
      );
    }
  }

  ExercisesHOC.propTypes = {
    exercises: PropTypes.array.isRequired,
    storedExercises: PropTypes.array.isRequired,
    loadExercises: PropTypes.func.isRequired,
    loadCategories: PropTypes.func.isRequired,
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  const mapStateToProps = (state) => ({
    storedExercises: state.exercises,
  });

  const mapDispatchToProps = {
    loadExercises,
    loadExercise,
    loadCategories,
    updateStreak,
  };

  return connect(mapStateToProps, mapDispatchToProps)(ExercisesHOC);
};

export default ExercisesHOCWrapper;
