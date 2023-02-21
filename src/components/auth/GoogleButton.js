import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {Button, RegularText} from '../layout';
import {GoogleIcon} from '../svg';
import {Colors, Layout} from '../../constants';

const GoogleButton = ({googleButtonText, onGoogleRegister, navigation, t}) => (
  <View style={styles.container}>
    <Button style={styles.button} onPress={() => onGoogleRegister()}>
      <GoogleIcon style={styles.icon} />
      <RegularText style={styles.text}>{googleButtonText}</RegularText>
    </Button>
  </View>
);

GoogleButton.propTypes = {
  googleButtonText: PropTypes.string.isRequired,
  onGoogleRegister: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('authComponent')(GoogleButton);

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 5,
    width: Layout.window.width - 40,
    backgroundColor: Colors.gray4,
    flexDirection: 'row',
  },
  container: {
    marginTop: 16,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
  },
});
