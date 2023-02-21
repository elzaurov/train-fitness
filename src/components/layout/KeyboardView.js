import React from 'react';
import PropTypes from 'prop-types';
import {KeyboardAvoidingView, Platform} from 'react-native';

const KeyboardView = ({style, children, ...props}) => {
  const keyboardProps = {};

  if (Platform.OS === 'ios') {
    keyboardProps.behavior = 'padding';
  }

  return (
    <KeyboardAvoidingView style={style} {...keyboardProps} {...props}>
      {children}
    </KeyboardAvoidingView>
  );
};

KeyboardView.propTypes = {
  style: PropTypes.any,
  children: PropTypes.any,
};

KeyboardView.defaultProps = {
  style: {},
  children: undefined,
};

export default KeyboardView;
