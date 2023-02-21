import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import CoursesScreenHOC from './CoursesScreenHOC';
import {ScreenView} from '../../components';

// temporary import
import PracticesCarousel from '../../components/activity/PracticesCarousel';
import PracticesLoading from '../../components/activity/PracticesLoading';
import {Layout} from '../../constants';

const CoursesScreen = ({loading, courses, onCourseSelect}) => {
  let content;

  if (loading === true) {
    content = <PracticesLoading />;
  } else {
    content = (
      <PracticesCarousel
        practices={courses}
        onPracticeSelect={onCourseSelect}
      />
    );
  }

  return <ScreenView style={styles.container}>{content}</ScreenView>;
};

CoursesScreen.propTypes = {
  courses: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  onCourseSelect: PropTypes.func.isRequired,
};

CoursesScreen.defaultProps = {
  courses: null,
};

export default CoursesScreenHOC(CoursesScreen);

const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingTop: Layout.padding * 2,
    paddingBottom: Layout.padding * 2,
  },
});
