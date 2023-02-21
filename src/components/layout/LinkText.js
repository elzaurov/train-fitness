import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BoldText from './BoldText';
import {Colors} from '../../constants';

const LinkText = ({
  style,
  textStyle,
  iconStyle,
  children,
  disabled,
  iconLeft,
  iconSize,
  iconColor,
  ...props
}) => {
  const disabledStyle = disabled ? {opacity: 0.5} : {};

  return (
    <TouchableOpacity
      style={[styles.row, disabledStyle, style]}
      disabled={disabled}
      {...props}>
      {iconLeft && (
        <MaterialCommunityIcons
          style={[styles.iconLeft, iconStyle]}
          name={iconLeft}
          size={iconSize}
          color={iconColor}
        />
      )}
      {typeof children === 'string' ? (
        <BoldText style={textStyle}>{children}</BoldText>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

LinkText.propTypes = {
  style: PropTypes.any,
  textStyle: PropTypes.any,
  iconStyle: PropTypes.any,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  iconLeft: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
};

LinkText.defaultProps = {
  children: undefined,
  disabled: false,
  iconStyle: {},
  iconLeft: undefined,
  iconSize: 14,
  iconColor: Colors.white,
  style: {},
  textStyle: {},
};

export default LinkText;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLeft: {
    marginRight: 6,
  },
});
