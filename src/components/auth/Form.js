import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {KeyboardAvoidingView} from 'react-native';
import UserInput from './UserInput';

import emailImg from '../../assets/images/auth/email.png';
import passwordImg from '../../assets/images/auth/password.png';

const Form = ({t, email, password, onEmailChange, onPasswordChange, error}) => (
  <KeyboardAvoidingView behavior="padding">
    <UserInput
      source={emailImg}
      keyboardType="email-address"
      placeholder={t('emailPlaceholder')}
      autoCapitalize="none"
      returnKeyType="next"
      autoCorrect={false}
      testID="email"
      accessibilityLabel="email"
      value={email}
      onChange={onEmailChange}
    />
    <UserInput
      source={passwordImg}
      keyboardType="default"
      secureTextEntry={true}
      placeholder={t('passwordPlaceholder')}
      returnKeyType="done"
      autoCapitalize="none"
      autoCorrect={false}
      testID="password"
      accessibilityLabel="password"
      value={password}
      onChange={onPasswordChange}
      validation={error}
    />
  </KeyboardAvoidingView>
);

Form.propTypes = {
  t: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
};

export default withTranslation('authComponent')(Form);
