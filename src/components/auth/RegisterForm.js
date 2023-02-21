import React, {useState, useRef, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {withTranslation} from 'react-i18next';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import UserInput from './UserInput';
import {Switch, Button} from '../layout';
import AddOn from './RegisterFormInputAddOn';
import {checkDisplayName, checkEmail, signUp} from '../../actions';
import {Layout} from '../../constants';

const RegisterForm = ({t, onRegisterSuccess}) => {
  const dispatch = useDispatch();

  const [form, dispatchForm] = useReducer(formReducer, {
    displayName: {value: '', error: '', validates: false},
    email: {value: '', error: '', validates: false},
    confirmEmail: {value: '', error: '', validates: false},
    password: {value: '', error: '', validates: false},
    emailSubscription: {value: true, error: '', validates: true},
  });

  const [formValidates, setFormValidates] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const {current: validators} = useRef(createValidators(dispatch));

  useEffect(() => {
    const validates = Object.values(form).every((field) => field.validates);
    setFormValidates(validates);
  }, [form]);

  const handleFieldChange = async (fieldName, value) => {
    dispatchForm({
      fieldName,
      payload: {
        value,
        error: '',
        validates: false,
        isValidating: true,
      },
    });

    const {validates = false, error = ''} = await validators[fieldName](
      value,
      form,
    );

    dispatchForm({
      fieldName,
      payload: {
        isValidating: false,
        validates,
        error,
      },
    });
  };

  const handleSubmit = async () => {
    try {
      setIsRegistering(true);

      await dispatch(
        signUp({
          displayName: form.displayName.value,
          email: form.email.value,
          password: form.password.value,
          emailSubscription: form.emailSubscription.value,
        }),
      );
      setIsRegistering(false);
      onRegisterSuccess();
    } catch (error) {
      setIsRegistering(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <UserInput
        keyboardType="default"
        placeholder={t('namePlaceholder')}
        returnKeyType="next"
        testID="name"
        accessibilityLabel="name"
        autoCorrect={false}
        value={form.displayName.value}
        validation={form.displayName.error}
        onChange={(value) => handleFieldChange('displayName', value)}
        editable={!isRegistering}
        addon={<AddOn field={form.displayName} />}
      />
      <UserInput
        keyboardType="email-address"
        placeholder={t('emailPlaceholder')}
        autoCapitalize="none"
        returnKeyType="next"
        testID="email"
        accessibilityLabel="email"
        autoCorrect={false}
        value={form.email.value}
        validation={form.email.error}
        onChange={(value) => handleFieldChange('email', value)}
        editable={!isRegistering}
        addon={<AddOn field={form.email} />}
      />
      <UserInput
        keyboardType="email-address"
        placeholder={t('confirmEmailPlaceholder')}
        autoCapitalize="none"
        returnKeyType="next"
        testID="confirmEmail"
        accessibilityLabel="confirmEmail"
        autoCorrect={false}
        value={form.confirmEmail.value}
        onChange={(value) => handleFieldChange('confirmEmail', value)}
        editable={!isRegistering}
        validation={form.confirmEmail.error}
        addon={<AddOn field={form.confirmEmail} />}
      />
      <UserInput
        keyboardType="default"
        secureTextEntry={true}
        placeholder={t('passwordPlaceholder')}
        returnKeyType="done"
        autoCapitalize="none"
        testID="password"
        accessibilityLabel="password"
        autoCorrect={false}
        value={form.password.value}
        onChange={(value) => handleFieldChange('password', value)}
        editable={!isRegistering}
        validation={form.password.error}
        addon={<AddOn field={form.password} />}
      />
      <Switch
        label="Receive emails from TrainEffective"
        value={form.emailSubscription.value}
        editable={!isRegistering}
        onValueChange={(value) => handleFieldChange('emailSubscription', value)}
      />
      <Button
        disabled={!formValidates || isRegistering}
        style={styles.submitButton}
        testID="createAccountButton"
        accessibilityLabel="createAccountButton"
        onPress={handleSubmit}
        loading={isRegistering}
        secondary2>
        {t('createAccount')}
      </Button>
    </KeyboardAvoidingView>
  );
};

RegisterForm.propTypes = {
  t: PropTypes.func.isRequired,
  onRegisterSuccess: PropTypes.func,
};

RegisterForm.defaultProps = {
  onRegisterSuccess: () => {},
};

export default withTranslation('authComponent')(RegisterForm);

const styles = StyleSheet.create({
  submitButton: {
    margin: Layout.padding,
  },
});

const formReducer = (state, {fieldName, payload}) => ({
  ...state,
  [fieldName]: {
    ...state[fieldName],
    ...payload,
  },
});

const DEBOUNCE_DELAY = 1000;

const createValidators = (dispatch) => {
  const debouncedCheckDisplayName = AwesomeDebouncePromise(
    (props) => dispatch(checkDisplayName(props)),
    DEBOUNCE_DELAY,
  );

  const debouncedCheckEmail = AwesomeDebouncePromise(
    (props) => dispatch(checkEmail(props)),
    DEBOUNCE_DELAY,
  );

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return {
    displayName: async (value) => {
      if (!value) {
        return {validates: false, error: 'Display name is required'};
      }

      const displayNameExists = await debouncedCheckDisplayName(value);

      if (displayNameExists === true) {
        return {validates: false, error: 'Display name already exists'};
      } else if (displayNameExists === false) {
        return {validates: true};
      } else {
        return {validates: false};
      }
    },
    email: async (value) => {
      if (!value) {
        return {validates: false, error: 'Email address is required'};
      }

      if (!emailRegex.test(value)) {
        return {validates: false, error: 'Email format is invalid'};
      }

      const emailExists = await debouncedCheckEmail(value);

      if (emailExists === true) {
        return {validates: false, error: 'Email already exists'};
      } else if (emailExists === false) {
        return {validates: true};
      } else {
        return {validates: false};
      }
    },
    confirmEmail: (value, form) => {
      if (value !== form.email.value) {
        return {
          validates: false,
          error: 'Email and the email confirm field must match',
        };
      }

      return {validates: true};
    },
    password: (value) => {
      if (!value) {
        return {validates: false, error: 'Password is required'};
      }

      if (value.length < 6) {
        return {validates: false, error: 'Use at least 6 characters'};
      }

      return {validates: true};
    },
    emailSubscription: () => {
      return {validates: true};
    },
  };
};
