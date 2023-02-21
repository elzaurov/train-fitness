import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Colors, Layout} from '../../constants';
import CoursesScreenHOC from './CoursesScreenHOC';
import {
  HorizontalScrollViewList,
  Teaser,
  ProgressBar,
  CourseTeaserLoading,
  Teasers,
} from '../../components';
import {COURSE_TEASERS} from '../../constants';

const CoursesScreen = (props) => {
  const loadingItem = [{key: '0'}, {key: '1'}, {key: '2'}, {key: '3'}];

  return (
    <Teasers
      {...props}
      teaserPath={COURSE_TEASERS}
      hideName
      hideSearch
      hideListOptions
      pushUrl="ViewCourse"
      pushKey="id"
    />
    // <View style={styles.content}>
    //   <ScrollView
    //     showsHorizontalScrollIndicator={false}
    //   >
    //     <View style={{marginTop: Layout.margin}} />
    //     <HorizontalScrollViewList
    //       title={'My Courses'}
    //       dataArray={loading ? loadingItem : currentCourses.filter(c => c.progress)}
    //       renderItem={course => {
    //         if(loading) {
    //           return (
    //             <CourseTeaserLoading />
    //           )
    //         }
    //         return (
    //           <Fragment>
    //             <Teaser
    //               teaser={course}
    //               isSmall={true}
    //               isListSequencial={false}
    //               onPress={() => navigation.push('ViewCourse', { id: course.key })}
    //             />
    //             <View style={{marginTop: 4}} />
    //             <ProgressBar
    //               progress={course.progress}
    //               width={(Layout.window.width - (Layout.padding * 3))*0.46}
    //             />
    //           </Fragment>
    //         )
    //       }}
    //     />
    //     <View style={{marginBottom: 10}} />
    //     <HorizontalScrollViewList
    //       title={'Game Brain'}
    //       dataArray={loading ? loadingItem : courses.filter(c => c.screen === 'game-brain')}
    //       renderItem={course => {
    //         if(loading) {
    //           return (
    //             <CourseTeaserLoading />
    //           )
    //         }
    //         return (
    //           <Fragment>
    //             <Teaser
    //               teaser={course}
    //               isSmall={true}
    //               isListSequencial={false}
    //               onPress={() => navigation.push('Course', { id: course.key, onAddToCalendarPress: () => onAddPress(course) })}
    //             />
    //           </Fragment>
    //         )
    //       }}
    //     />
    //     <HorizontalScrollViewList
    //       title={'Classroom'}
    //       dataArray={loading ? loadingItem : courses.filter(c => c.screen === 'classroom')}
    //       renderItem={course => {
    //         if(loading) {
    //           return (
    //             <CourseTeaserLoading />
    //           )
    //         }
    //         return (
    //           <Fragment>
    //             <Teaser
    //               teaser={course}
    //               isSmall={true}
    //               isListSequencial={false}
    //               onPress={() => navigation.push('Course', { id: course.key, onAddToCalendarPress: () => onAddPress(course) })}
    //             />
    //           </Fragment>
    //         )
    //       }}
    //     />
    //     <View style={{paddingBottom: Layout.padding}} />
    //   </ScrollView>
    // </View>
  );
};

CoursesScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  courses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CoursesScreenHOC(CoursesScreen);

const styles = StyleSheet.create({
  loading: {
    padding: Layout.padding,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
