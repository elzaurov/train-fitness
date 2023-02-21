import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {FlatButton} from '../layout';

const ForgotPassword = ({t, navigation}) => (
  <View style={styles.container}>
    <FlatButton onPress={() => navigation.push('ForgotPassword')}>
      {t('forgotPassword')}
    </FlatButton>
  </View>
);

ForgotPassword.propTypes = {
  t: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withTranslation('authComponent')(ForgotPassword);

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
});
