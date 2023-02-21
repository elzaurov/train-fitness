import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ViewPropTypes} from 'react-native';
import {RegularText} from '../layout';
import {Colors} from '../../constants';

const Badge = ({style, color, text, textStyle, size}) => (
  <View
    style={[
      styles.container,
      size === 'large' ? styles.largeContainer : styles.smallContainer,
      {backgroundColor: color},
      style,
    ]}>
    <RegularText
      style={[
        styles.text,
        size === 'large' ? styles.largeText : styles.smallText,
        textStyle,
      ]}>
      {text}
    </RegularText>
  </View>
);

Badge.propTypes = {
  style: ViewPropTypes.style,
  textStyle: PropTypes.any,
  color: PropTypes.string,
  text: PropTypes.string,
  size: PropTypes.oneOf(['small', 'large']),
};

Badge.defaultProps = {
  style: {},
  textStyle: {},
  color: Colors.secondary2,
  text: '',
  size: 'large',
};

export default Badge;

const LARGE_HEIGHT = 24;
const SMALL_HEIGHT = 18;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    // alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  largeText: {
    fontSize: LARGE_HEIGHT * 0.6,
  },
  largeContainer: {
    height: LARGE_HEIGHT,
    borderRadius: LARGE_HEIGHT / 2,
    paddingLeft: LARGE_HEIGHT / 2,
    paddingRight: LARGE_HEIGHT / 2,
  },
  smallText: {
    fontSize: SMALL_HEIGHT * 0.6,
  },
  smallContainer: {
    height: SMALL_HEIGHT,
    borderRadius: SMALL_HEIGHT / 2,
    paddingLeft: SMALL_HEIGHT / 2,
    paddingRight: SMALL_HEIGHT / 2,
  },
});
