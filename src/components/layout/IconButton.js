import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../constants';

const IconButton = ({
  disabled,
  icon,
  iconColor,
  iconSize,
  iconStyle,
  style,
  ...props
}) => {
  const disabledStyle = disabled ? {opacity: 0.5} : {};

  return (
    <TouchableOpacity
      style={[styles.button, disabledStyle, style]}
      disabled={disabled}
      {...props}>
      <MaterialCommunityIcons
        style={iconStyle}
        name={icon}
        size={iconSize}
        color={iconColor}
      />
    </TouchableOpacity>
  );
};

IconButton.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  iconStyle: PropTypes.any,
  style: PropTypes.any,
};

IconButton.defaultProps = {
  disabled: false,
  iconColor: Colors.white,
  iconSize: 18,
  iconStyle: {},
  style: {},
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
