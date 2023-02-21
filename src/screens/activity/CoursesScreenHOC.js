import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadCourses} from '../../actions';

const CoursesScreenHOCWrapper = (InnerComponent) => {
  class CoursesScreenHOC extends Component {
    state = {
      courses: null,
      loading: true,
    };

    async componentDidMount() {
      this.setState({loading: true});
      const courses = await this.props.loadCourses();
      this.setState({
        courses,
        loading: false,
      });
    }

    handleCourseSelect = (id) => {
      this.props.navigation.push('ViewCourse', {id});
    };

    render() {
      return (
        <InnerComponent
          {...this.props}
          {...this.state}
          onCourseSelect={this.handleCourseSelect}
        />
      );
    }
  }

  CoursesScreenHOC.propTypes = {
    loadCourses: PropTypes.func.isRequired,
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  const mapDispatchToProps = {
    loadCourses,
  };

  return connect(null, mapDispatchToProps)(CoursesScreenHOC);
};

export default CoursesScreenHOCWrapper;
