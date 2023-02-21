import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {Button, RegularText} from '../layout';
import {FacebookIcon} from '../svg';
import {Colors, Layout} from '../../constants';

const FacebookButton = ({
  facebookButtonText,
  onFacebookRegister,
  navigation,
  t,
}) => (
  <View style={styles.container}>
    <Button style={styles.button} onPress={() => onFacebookRegister()}>
      <FacebookIcon style={styles.icon} />
      <RegularText style={styles.text}>{facebookButtonText}</RegularText>
    </Button>
  </View>
);

FacebookButton.propTypes = {
  facebookButtonText: PropTypes.string.isRequired,
  onFacebookRegister: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('authComponent')(FacebookButton);

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 5,
    width: Layout.window.width - 40,
    backgroundColor: Colors.blue,
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
