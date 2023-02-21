import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../constants';
import CheckboxHOC from './CheckboxHOC';

const Checkbox = ({
  iconColorChecked,
  iconColorUnchecked,
  iconSize,
  iconStyle,
  isChecked,
  disabled,
  style,
  onToggleCheckbox,
  ...props
}) => {
  const disabledStyle = disabled ? {opacity: 0.5} : {};

  return (
    <TouchableOpacity
      style={[styles.button, disabledStyle, style]}
      disabled={disabled}
      onPress={onToggleCheckbox}
      {...props}>
      <MaterialCommunityIcons
        style={[styles.icon, iconStyle]}
        name={isChecked ? 'check-circle' : 'checkbox-blank-circle-outline'}
        size={iconSize}
        color={isChecked ? iconColorChecked : iconColorUnchecked}
      />
    </TouchableOpacity>
  );
};

Checkbox.propTypes = {
  iconColorChecked: PropTypes.string,
  iconColorUnchecked: PropTypes.string,
  iconSize: PropTypes.number,
  iconStyle: PropTypes.any,
  isChecked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.any,
  onToggleCheckbox: PropTypes.func.isRequired,
};

Checkbox.defaultProps = {
  iconColorChecked: Colors.white,
  iconColorUnchecked: Colors.white,
  iconSize: 32,
  iconStyle: {},
  disabled: false,
  style: {},
};

export default CheckboxHOC(Checkbox);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
