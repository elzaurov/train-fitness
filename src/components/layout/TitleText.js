import React from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet} from 'react-native';
import {Colors} from '../../constants';

const TitleText = ({style, children, ...props}) => (
  <Text style={[styles.text, style]} {...props}>
    {children && typeof children === 'string' && children.toUpperCase()}
  </Text>
);

TitleText.propTypes = {
  style: PropTypes.any,
  children: PropTypes.any,
};

TitleText.defaultProps = {
  style: {},
  children: undefined,
};

export default TitleText;

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    fontSize: 24,
    fontFamily: 'TitilliumWeb-Bold',
    marginBottom: 16,
  },
});
