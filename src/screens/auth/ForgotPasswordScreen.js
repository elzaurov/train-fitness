import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {View, StyleSheet} from 'react-native';
import ForgotPasswordScreenHOC from './ForgotPasswordScreenHOC';
import {
  Button,
  FlatButton,
  TitleText,
  RegularText,
  Input,
} from '../../components';
import {Colors, Layout} from '../../constants';

const ForgotPasswordScreen = ({
  t,
  email,
  submitting,
  navigation,
  onEmailInputChange,
  onSubmit,
}) => (
  <View style={styles.container}>
    <TitleText>{t('title')}</TitleText>
    <RegularText style={styles.text}>{t('emailText')}</RegularText>
    <Input
      style={styles.input}
      keyboardType="email-address"
      placeholder={t('emailPlaceholder')}
      placeholderTextColor="white"
      autoCapitalize="none"
      onChangeText={(text) => onEmailInputChange(text)}
    />
    <Button
      style={styles.button}
      disabled={submitting || email === ''}
      onPress={onSubmit}
      primary>
      {submitting ? t('sending') : t('send')}
    </Button>
    <FlatButton style={styles.button} onPress={() => navigation.goBack()}>
      {t('backButton')}
    </FlatButton>
  </View>
);

ForgotPasswordScreen.propTypes = {
  t: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  submitting: PropTypes.bool.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  onEmailInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ForgotPasswordScreenHOC(
  withTranslation('forgotPasswordScreen')(ForgotPasswordScreen),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    flexDirection: 'column',
    padding: Layout.padding,
    paddingTop: 128,
  },
  button: {
    marginTop: Layout.margin,
  },
  text: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: Colors.tundora,
    color: Colors.white,
  },
});
