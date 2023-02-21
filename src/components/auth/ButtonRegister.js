import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {BoldText, FlatButton, RegularText} from '../layout';
import {Layout} from '../../constants';

const ButtonRegister = ({onToggleModal, onRegister, t}) => (
  <View style={styles.container}>
    <FlatButton onPress={() => onRegister()}>
      <BoldText style={styles.linkText}>{t('signUpHere')}</BoldText>
    </FlatButton>
    {/* <FlatButton style={styles.howItWorks} onPress={onToggleModal} iconLeft="video">
      <RegularText style={styles.linkText}>{t('howItWorks')}</RegularText>
    </FlatButton> */}
  </View>
);

ButtonRegister.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('authComponent')(ButtonRegister);

const styles = StyleSheet.create({
  container: {
    marginTop: Layout.margin,
  },
  howItWorks: {
    marginTop: Layout.margin,
  },
  linkText: {
    paddingLeft: 4,
    fontSize: 15,
  },
});
