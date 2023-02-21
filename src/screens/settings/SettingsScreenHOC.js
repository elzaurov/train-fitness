import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Alert} from 'react-native';
import {withTranslation} from 'react-i18next';
import {auth} from '../../config';
import {Header} from '../../layout';
import {openWebView} from '../../utils';
import {signOut} from '../../actions';
import { removeRegistrationStorage } from '../../analytics/user';

const SettingsScreenHOCWrapper = (InnerComponent) => {
  class SettingsScreenHOC extends Component {
    static navigationOptions = {
      title: 'SETTINGS',
      header: (props) => (
        <Header
          {...props}
          backButton={true}
          hideBackButtonWhenCanceledPlan={true}
          screen="Settings"
        />
      ),
    };

    handleChangePassword = () => {
      const {t} = this.props;

      Alert.alert(
        t('alerts:changePassword.title'),
        t('alerts:changePassword.message'),
        [
          {text: t('alerts:changePassword.buttons.no'), onPress: () => {}},
          {
            text: t('alerts:changePassword.buttons.yes'),
            onPress: () => this.resetPassword(),
          },
        ],
        {cancelable: true},
      );
    };

    handleContactClick = () => {
      const {navigation} = this.props;
      navigation.push('Contact');
    };

    handleLogout = () => {
      const {t} = this.props;

      Alert.alert(
        t('alerts:signOut.title'),
        t('alerts:signOut.message'),
        [
          {text: t('alerts:signOut.buttons.no'), onPress: () => {}},
          {
            text: t('alerts:signOut.buttons.yes'),
            onPress: () => this.props.signOut(removeRegistrationStorage),
          },
        ],
        {cancelable: true},
      );
    };

    handleHelpClick = () => {
      const {remoteConfigs} = this.props;
      openWebView(remoteConfigs.help_url);
    };

    resetPassword = () => {
      const {t} = this.props;
      const {email} = this.props.profile;

      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          Alert.alert(
            t('alerts:emailSent.title'),
            t('alerts:emailSent.message'),
            [{text: t('alerts:emailSent.buttons.ok'), onPress: () => {}}],
            {cancelable: true},
          );
        })
        .catch((error) => {
          Alert.alert(
            t('alerts:dynamicError.title'),
            error.message,
            [{text: t('alerts:dynamicError.buttons.ok'), onPress: () => {}}],
            {cancelable: true},
          );
        });
    };

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onChangePassword={this.handleChangePassword}
          onContactClick={this.handleContactClick}
          onHelpClick={this.handleHelpClick}
          onLogout={this.handleLogout}
        />
      );
    }
  }

  SettingsScreenHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    remoteConfigs: PropTypes.any.isRequired,
    signOut: PropTypes.func.isRequired,
    t: PropTypes.any.isRequired,
  };

  function mapStateToProps({
    plan,
    profile,
    unreadNotifications,
    remoteConfigs,
  }) {
    return {plan, profile, unreadNotifications, remoteConfigs};
  }

  const translatedSettingsScreenHOC = withTranslation('settings')(
    connect(mapStateToProps, {signOut})(SettingsScreenHOC),
  );

  // chaining the navigation options
  translatedSettingsScreenHOC.navigationOptions =
    SettingsScreenHOC.navigationOptions;

  return translatedSettingsScreenHOC;
};

export default SettingsScreenHOCWrapper;
