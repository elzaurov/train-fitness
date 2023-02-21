import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {StyleSheet, Modal, View} from 'react-native';
import {
  Button,
  FlatButton,
  RegularText,
  TitleText,
  ScreenView,
} from '../layout';
import {Layout, Colors} from '../../constants';
import WelcomeModalHOC from './WelcomeModalHOC';

const WelcomeModal = ({
  t,
  visible,
  submitting,
  notShowAgain,
  selectedIndex,
  plan,
  onItemClick,
  onToggleNotShowAgain,
  onModalSubmit,
}) => {
  const message = plan.isCoach ? t('needImprove') : t('improveToday');
  const options = [
    {key: 'attacking', label: t('attacking')},
    {key: 'defending', label: t('defending')},
    {key: 'all', label: t('notSure')},
  ];

  const optionComponents = options.map(({key, label}, index) => (
    <FlatButton
      key={key}
      style={selectedIndex === index ? styles.selectedButton : styles.button}
      onPress={() => onItemClick(index, key)}>
      {label}
    </FlatButton>
  ));

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => {}}>
      <ScreenView style={styles.container}>
        <TitleText>{t('title')}</TitleText>
        <RegularText style={styles.message}>{message}</RegularText>
        {optionComponents}
        {selectedIndex >= 0 && (
          <View style={styles.neverShowAgain}>
            <FlatButton
              iconStyle={styles.icon}
              icon={notShowAgain ? 'check-circle' : 'checkbox-blank-circle'}
              iconColor={notShowAgain ? Colors.tertiary : Colors.white}
              iconSize={32}
              onPress={onToggleNotShowAgain}
            />
            <RegularText>{t('neverShowAgain')}</RegularText>
          </View>
        )}
        {selectedIndex >= 0 && (
          <Button onPress={() => onModalSubmit()} disabled={submitting}>
            {submitting ? t('starting') : t('start')}
          </Button>
        )}
      </ScreenView>
    </Modal>
  );
};

WelcomeModal.propTypes = {
  t: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  notShowAgain: PropTypes.bool.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  plan: PropTypes.objectOf(PropTypes.any).isRequired,
  onItemClick: PropTypes.func.isRequired,
  onToggleNotShowAgain: PropTypes.func.isRequired,
  onModalSubmit: PropTypes.func.isRequired,
};

export default WelcomeModalHOC(
  withTranslation('welcomeModalComponent')(WelcomeModal),
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 8,
    width: Layout.window.width - Layout.padding * 2,
  },
  selectedButton: {
    marginTop: 8,
    backgroundColor: Colors.primary,
    width: Layout.window.width - Layout.padding * 2,
  },
  message: {
    marginBottom: 8,
    fontSize: 16,
  },
  neverShowAgain: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
