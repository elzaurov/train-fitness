import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {Input} from '../layout';

const UserInput = ({
  placeholder,
  keyboardType,
  secureTextEntry,
  autoCorrect,
  autoCapitalize,
  returnKeyType,
  value,
  onChange,
  ...rest
}) => (
  <View style={styles.inputWrapper}>
    <Input
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoCorrect={autoCorrect}
      autoCapitalize={autoCapitalize}
      returnKeyType={returnKeyType}
      placeholderTextColor="white"
      underlineColorAndroid="transparent"
      value={value}
      onChangeText={(text) => onChange(text)}
      {...rest}
    />
  </View>
);

export default UserInput;

UserInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  keyboardType: PropTypes.string,
  value: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  returnKeyType: PropTypes.string,
};

UserInput.defaultProps = {
  keyboardType: 'default',
  value: '',
  secureTextEntry: false,
  autoCorrect: false,
  autoCapitalize: 'none',
  returnKeyType: 'done',
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 16,
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 30,
    top: 9,
  },
});
