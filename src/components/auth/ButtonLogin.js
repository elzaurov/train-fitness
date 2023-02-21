import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {FlatButton} from '../layout';

const ButtonLogin = ({t, navigation, submitting}) => (
  <View style={styles.container}>
    <FlatButton
      textStyle={styles.text}
      onPress={() => navigation.push('SignIn')}
      disabled={submitting}>
      {t('backToLogin')}
    </FlatButton>
  </View>
);

ButtonLogin.propTypes = {
  t: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default withTranslation('authComponent')(ButtonLogin);

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  text: {
    fontSize: 15,
  },
});
