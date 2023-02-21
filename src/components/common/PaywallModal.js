import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {RegularText, Button, TitleText} from '../layout';
import Modal from './Modal';
import {Colors} from '../../constants';
import PaywallModalHOC from './PaywallModalHOC';

const PaywallModal = ({modalVisible, onClose, onBecomePremium}) => (
  <Modal modalVisible={modalVisible} onClose={onClose}>
    <TitleText style={styles.title}>Train More Effectively!</TitleText>
    <RegularText style={styles.description}>
      This feature is only available for the premium users
    </RegularText>
    <Button style={styles.button} onPress={onBecomePremium}>
      Upgrade to Premium
    </Button>
  </Modal>
);

PaywallModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onBecomePremium: PropTypes.func.isRequired,
};

export default PaywallModalHOC(PaywallModal);

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginTop: 16,
  },
  description: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
    backgroundColor: Colors.green,
    borderRadius: 8,
    padding: 16,
  },
});
