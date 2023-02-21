import React from 'react';
import PropTypes from 'prop-types';
import {View, ViewPropTypes, StyleSheet} from 'react-native';
import {RegularText} from '../layout';
import {Layout} from '../../constants';

const OnBoardingTitle = ({text, style}) => (
  <View style={[styles.container, style]}>
    <RegularText style={styles.text}>{text}</RegularText>
  </View>
);

OnBoardingTitle.propTypes = {
  text: PropTypes.string,
  style: ViewPropTypes.style,
};

OnBoardingTitle.defaultProps = {
  text: '',
  style: null,
};

export default OnBoardingTitle;

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingRight: Layout.padding,
    paddingBottom: Layout.padding / 2,
    paddingLeft: Layout.padding,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Layout.isSmallDevice ? 18 : 24,
  },
});
