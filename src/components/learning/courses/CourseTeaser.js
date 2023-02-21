import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Layout} from '../../../constants';

const CourseTeaser = ({navigation, course, navRoute}) => (
  <TouchableOpacity
    onPress={() => navigation.push(navRoute, {id: course.key})}
    key={course.key}>
    <FastImage source={{uri: course.thumbnail}} style={styles.thumbnail} />
  </TouchableOpacity>
);

CourseTeaser.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  navRoute: PropTypes.string.isRequired,
};

export default CourseTeaser;

const styles = StyleSheet.create({
  thumbnail: {
    marginBottom: Layout.margin,
    marginRight: Layout.margin,
    width: Layout.window.width - Layout.padding * 2 - 40,
    height: 100,
  },
});
