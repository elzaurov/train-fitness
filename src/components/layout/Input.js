import React from 'react';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, TextInput, View} from 'react-native';
import {Colors, Layout} from '../../constants';
import RegularText from './RegularText';

const Input = ({
  style,
  icon,
  iconStyle,
  iconColor,
  iconSize,
  viewStyle,
  validation,
  addon,
  ...props
}) => (
  <View style={[styles.container, viewStyle]}>
    {icon && (
      <MaterialCommunityIcons
        style={[styles.icon, iconStyle]}
        name={icon}
        size={iconSize}
        color={iconColor}
      />
    )}
    {!!addon && <View style={styles.addOnContainer}>{addon}</View>}
    <TextInput
      style={[styles.input, icon ? styles.inputIcon : {}, style]}
      underlineColorAndroid="transparent"
      placeholderTextColor={Colors.gray1}
      {...props}
    />
    {validation !== null && (
      <RegularText style={styles.validation}>{validation}</RegularText>
    )}
  </View>
);

export default Input;

Input.propTypes = {
  style: PropTypes.any,
  icon: PropTypes.string,
  iconStyle: PropTypes.any,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  viewStyle: PropTypes.any,
  validation: PropTypes.string,
  loading: PropTypes.bool,
  addon: PropTypes.node,
};

Input.defaultProps = {
  style: {},
  icon: undefined,
  iconStyle: {},
  iconColor: Colors.white,
  iconSize: 22,
  viewStyle: {},
  validation: null,
  loading: false,
  addon: null,
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    width: Layout.window.width,
  },
  input: {
    backgroundColor: Colors.emperor,
    height: 40,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 2,
    color: Colors.white,
    paddingTop: 0,
    paddingBottom: 0,
    fontFamily: 'TitilliumWeb-Regular',
  },
  inputIcon: {
    paddingLeft: 45,
  },
  icon: {
    position: 'absolute',
    zIndex: 99,
    left: 26,
    top: 9,
  },
  validation: {
    height: 16, // for preserving the size
    lineHeight: 14,
    marginTop: 8,
    color: Colors.error,
    fontSize: 12,
    overflow: 'hidden',
  },
  addOnContainer: {
    position: 'absolute',
    top: 0,
    right: 16,
    height: 40,
    zIndex: 1,
    padding: 4,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
