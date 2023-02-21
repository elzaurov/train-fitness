import React from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet} from 'react-native';
import {Colors} from '../../constants';

const BoldText = ({style, children, ...props}) => (
  <Text style={[styles.text, style]} {...props}>
    {children}
  </Text>
);

BoldText.propTypes = {
  style: PropTypes.any,
  children: PropTypes.any,
};

BoldText.defaultProps = {
  style: {},
  children: undefined,
};

export default BoldText;

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    fontFamily: 'TitilliumWeb-Bold',
  },
});
