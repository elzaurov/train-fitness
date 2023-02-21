import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  loadCategories,
  loadLearningVideos,
  loadCourses,
} from '../../../actions';

const LearningVideosHOCWrapper = (InnerComponent) => {
  class LearningVideosHOC extends Component {
    state = {
      isListSequencial: false,
      loading: true,
    };

    async componentDidMount() {
      const {learningVideosPath, learningVideosCategoriesPath} = this.props;

      await Promise.all([
        this.props.loadCategories(learningVideosCategoriesPath),
        this.props.loadLearningVideos(learningVideosPath),
        this.props.loadCourses(''),
      ]);
      this.setState({loading: false});
    }

    handleToggleListOptions = (isListSequencial) => {
      this.setState({isListSequencial});
    };

    render() {
      const {
        categories,
        learningVideosCategoriesPath,
        learningVideosPath,
        learningVideos,
      } = this.props;

      const sortedLearningVideos = (
        learningVideos[learningVideosPath] || []
      ).sort(({isPremium}) => (isPremium ? 1 : -1));

      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          categories={categories[learningVideosCategoriesPath]}
          learningVideos={sortedLearningVideos}
          onToggleListOptions={this.handleToggleListOptions}
        />
      );
    }
  }

  LearningVideosHOC.propTypes = {
    categories: PropTypes.objectOf(PropTypes.any).isRequired,
    learningVideosCategoriesPath: PropTypes.string.isRequired,
    learningVideosPath: PropTypes.string.isRequired,
    learningVideos: PropTypes.objectOf(PropTypes.any).isRequired,
    loadCategories: PropTypes.func.isRequired,
    loadLearningVideos: PropTypes.func.isRequired,
    loadCourses: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state) => ({
    categories: state.categories,
    learningVideos: state.learningVideos,
    courses: state.courses,
  });

  return connect(mapStateToProps, {
    loadCategories,
    loadLearningVideos,
    loadCourses,
  })(LearningVideosHOC);
};

export default LearningVideosHOCWrapper;
