import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, ViewPropTypes, View, SafeAreaView} from 'react-native';
import {
  ONBOARDING_HEADER_HEIGHT,
  ONBOARDING_BOTTOM_HEIGHT,
} from '../../constants';

const OnBoardingContainer = ({style, contentStyle, children}) => (
  <View style={[styles.container, style]}>
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, styles.content, contentStyle]}>{children}</View>
    </SafeAreaView>
  </View>
);

OnBoardingContainer.propTypes = {
  contentStyle: PropTypes.bool,
  style: ViewPropTypes.style,
  children: PropTypes.node,
};

OnBoardingContainer.defaultProps = {
  contentStyle: null,
  style: null,
  children: null,
};

export default OnBoardingContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: ONBOARDING_BOTTOM_HEIGHT,
    paddingTop: ONBOARDING_HEADER_HEIGHT,
  },
});
