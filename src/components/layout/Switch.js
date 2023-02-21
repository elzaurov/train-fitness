import React from 'react';
import PropTypes from 'prop-types';
import {View, Switch, StyleSheet} from 'react-native';
import RegularText from './RegularText';
import {Layout, Colors} from '../../constants';

const CustomSwitch = ({value, onValueChange, label, ...rest}) => (
  <View style={styles.inputWrapper} {...rest}>
    <RegularText>{label}</RegularText>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{
        true: Colors.primary,
        false: Colors.gray1,
      }}
    />
  </View>
);

CustomSwitch.propTypes = {
  value: PropTypes.bool.isRequired,
  onValueChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default CustomSwitch;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingLeft: Layout.padding,
    paddingRight: Layout.padding,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
