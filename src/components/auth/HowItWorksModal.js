import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {WebviewPlayer} from '../player';
import {Button, FlatButton, RegularText, ScreenView} from '../layout';
import {
  Layout,
  HOW_IT_WORKS_URL,
  REGISTER_URL,
  TRUSTPILOT_IMAGE_URL,
  TRUSTPILOT_URL,
} from '../../constants';

const HowItWorksModal = ({modalVisible, onToggleModal, t}) => (
  <Modal
    animationType="slide"
    transparent={false}
    visible={modalVisible}
    onRequestClose={onToggleModal}>
    <ScreenView style={styles.container}>
      <WebviewPlayer uri={HOW_IT_WORKS_URL} />
      <ScrollView bounces={false}>
        <View style={styles.content}>
          <RegularText style={styles.title}>{t('howItWorks')}</RegularText>
          <RegularText style={styles.part}>{t('howItWorksPart1')}</RegularText>
          <RegularText style={styles.part}>{t('howItWorksPart2')}</RegularText>
          {!Layout.isIOS && (
            <Button
              style={styles.button}
              onPress={() => Linking.openURL(REGISTER_URL)}>
              {t('getStarted')}
            </Button>
          )}
          <FlatButton style={styles.button} onPress={onToggleModal}>
            {t('backToLogin')}
          </FlatButton>
          <View style={styles.trustpilot}>
            <TouchableOpacity onPress={() => Linking.openURL(TRUSTPILOT_URL)}>
              <FastImage
                style={styles.trustpilotImage}
                source={{uri: TRUSTPILOT_IMAGE_URL}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenView>
  </Modal>
);

HowItWorksModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  onToggleModal: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('authComponent')(HowItWorksModal);

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  content: {
    padding: Layout.padding,
  },
  title: {
    marginBottom: Layout.margin,
  },
  part: {
    marginTop: Layout.halfMargin,
  },
  button: {
    marginTop: Layout.margin,
  },
  trustpilot: {
    marginTop: Layout.margin,
    alignItems: 'center',
  },
  trustpilotImage: {
    width: 64,
    height: 64,
  },
});
