import React from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet} from 'react-native';
import {Trans} from 'react-i18next';
import {Colors} from '../../constants';

const RegularText = ({style, children, i18nKey, ...props}) => (
  <Text style={[styles.text, style]} {...props}>
    {i18nKey ? <Trans i18nKey={i18nKey}>{children}</Trans> : children}
  </Text>
);

RegularText.propTypes = {
  style: PropTypes.any,
  children: PropTypes.any,
  i18nKey: PropTypes.string,
};

RegularText.defaultProps = {
  style: {},
  children: undefined,
  i18nKey: undefined,
};

export default RegularText;

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    fontFamily: 'TitilliumWeb-Regular',
  },
});
