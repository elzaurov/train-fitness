import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ViewPropTypes} from 'react-native';
import RegularText from './RegularText';
import {Colors} from '../../constants';

const Chip = ({children, size, textStyle, style, ...rest}) => (
  <View style={[styles.container, style]} {...rest}>
    {typeof children === 'string' ? (
      <RegularText style={[styles.text, styles[`${size}Text`], textStyle]}>
        {children}
      </RegularText>
    ) : (
      children
    )}
  </View>
);

Chip.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'large']),
  style: ViewPropTypes.style,
  textStyle: PropTypes.any,
};

Chip.defaultProps = {
  style: {},
  textStyle: {},
  size: 'large',
};

export default Chip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.dustyGray,
    borderRadius: 5,
    paddingLeft: 8,
    paddingRight: 8,
  },
  text: {
    color: Colors.dustyGray,
  },
  smallText: {
    fontSize: 10,
  },
  largeText: {
    fontSize: 16,
  },
});
