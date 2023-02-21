import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadCategories} from '../../../actions';
import {EXERCISE_CATEGORIES} from '../../../constants';

const ExerciseDetailsHOCWrapper = (InnerComponent) => {
  class ExerciseDetailsHOC extends Component {
    state = {
      isListSequencial: true,
      loading: true,
    };

    async componentDidMount() {
      await this.props.loadCategories(EXERCISE_CATEGORIES);

      this.setState({loading: false});
    }

    render() {
      const {loading} = this.state;
      const {categories, exercise} = this.props;
      const exerciseCategories = categories[EXERCISE_CATEGORIES];
      const exCategories = loading
        ? null
        : (exerciseCategories || []).filter(
            ({key}) => exercise.categories && exercise.categories.includes(key),
          );

      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          categories={(exCategories || []).map(({label}) => label)}
        />
      );
    }
  }

  ExerciseDetailsHOC.propTypes = {
    exercise: PropTypes.objectOf(PropTypes.any).isRequired,
    categories: PropTypes.objectOf(PropTypes.any).isRequired,
    loadCategories: PropTypes.func.isRequired,
  };

  function mapStateToProps({categories}) {
    return {categories};
  }

  return connect(mapStateToProps, {
    loadCategories,
  })(ExerciseDetailsHOC);
};

export default ExerciseDetailsHOCWrapper;
