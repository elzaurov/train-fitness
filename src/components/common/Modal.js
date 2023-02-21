import React from 'react';
import {Modal, StyleSheet, View, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';
import {KeyboardView, IconButton} from '../layout';
import {Colors} from '../../constants';

const ModalComponent = ({
  children,
  onClose,
  modalVisible,
  canClose,
  style,
  ...rest
}) => (
  <Modal
    animationType="fade"
    visible={modalVisible}
    onRequestClose={onClose}
    transparent
    {...rest}>
    <KeyboardView style={styles.modal}>
      <View style={[styles.content, style]}>
        {canClose && (
          <IconButton
            style={styles.closeButton}
            iconSize={24}
            icon="close"
            onPress={onClose}
          />
        )}
        {children}
      </View>
    </KeyboardView>
  </Modal>
);

ModalComponent.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool,
  canClose: PropTypes.bool,
  style: ViewPropTypes.style,
};

ModalComponent.defaultProps = {
  children: null,
  modalVisible: false,
  canClose: true,
  style: {},
};

export default ModalComponent;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: Colors.background,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
    overflow: 'hidden',
  },
  closeButton: {
    marginRight: 0,
    marginLeft: 'auto',
  },
});
