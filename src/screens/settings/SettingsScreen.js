import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {Linking, StyleSheet, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {crashlytics} from '../../config';
import {
    RegularText,
    TitleText,
    LinkText,
    FlatButton,
    ScreenView,
} from '../../components';
import SettingsScreenHOC from './SettingsScreenHOC';
import {Colors, Layout} from '../../constants';
import TikTokIcon from '../../components/svg/TikTokIcon';
import {colors, Settings} from '@traineffective/te-component-library';

const SettingsScreen = ({
    navigation,
    plan,
    profile,
    unreadNotifications,
    helpURL,
    onContactClick,
    onChangePassword,
    onHelpClick,
    onLogout,
    t,
}) => {
    const socialLinks = {
        insta: 'https://www.instagram.com/traineffective/',
        tiktok: 'https://www.tiktok.com/@traineffectiveofficial',
        youtube: 'https://www.youtube.com/traineffective',
    };

    const isPlanCanceled = !profile.isAdmin && plan.isCanceled;

    const onSectionPress = type => {
        switch (type) {
            case 'account':
                navigation.push('Profile');
                break;
            case 'notifications':
                navigation.push('Notifications');
                break;
            case 'notes':
                navigation.push('Notes');
                break;
            case 'plan':
                navigation.push('Plan');
                break;
            case 'help':
                onHelpClick();
                break;
            case 'contact':
                onContactClick();
                break;
            case 'trainWithUs':
                Linking.openURL('https://www.traineffective.com/camps');
                break;
            case 'logout':
                onLogout();
                break;
            default:
        }
    };

    const onSocialPress = socialType => {
        Linking.openURL(socialLinks[socialType]);
    };

    return (
        <ScreenView style={{paddingVertical: 20, paddingHorizontal: 0, backgroundColor: colors.grey[800]}}>
            <Settings
                onSectionPress={onSectionPress}
                onSocialPress={onSocialPress}
                profile={profile}
                appVersion={DeviceInfo.getVersion()}
            />
        </ScreenView>
    );
};

SettingsScreen.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    plan: PropTypes.objectOf(PropTypes.any).isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    unreadNotifications: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChangePassword: PropTypes.func.isRequired,
    onContactClick: PropTypes.func.isRequired,
    onHelpClick: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};

export default SettingsScreenHOC(
    withTranslation('settingsScreen')(SettingsScreen),
);
