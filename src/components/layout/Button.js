import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import {Colors, Layout} from '../../constants';
import RegularText from './RegularText';

const Button = ({
  style,
  textStyle,
  children,
  primary,
  secondary,
  disabled,
  loading,
  ...props
}) => {
  const colorStyle = {backgroundColor: Colors.defaultButton};
  const disabledStyle = disabled ? {opacity: 0.5} : {};

  if (primary) {
    colorStyle.backgroundColor = Colors.primaryButton;
  } else if (secondary) {
    colorStyle.backgroundColor = Colors.secondaryButton;
  }

  let content;

  if (loading === true) {
    content = (
      <ActivityIndicator
        style={[styles.textStyle, textStyle]}
        color={Colors.white}
        size="small"
      />
    );
  } else {
    content =
      typeof children === 'string' ? (
        <RegularText style={[styles.textStyle, textStyle]}>
          {children.toUpperCase()}
        </RegularText>
      ) : (
        children
      );
  }

  return (
    <TouchableOpacity
      style={[styles.button, colorStyle, disabledStyle, style]}
      disabled={disabled}
      {...props}>
      {content}
    </TouchableOpacity>
  );
};

Button.propTypes = {
  style: PropTypes.any,
  textStyle: PropTypes.any,
  children: PropTypes.any,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  style: {},
  textStyle: {},
  children: undefined,
  primary: false,
  secondary: false,
  disabled: false,
  loading: false,
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  textStyle: {
    padding: 8,
    paddingTop: Layout.padding,
    paddingBottom: Layout.padding,
    fontWeight: 'bold',
  },
});
