import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {withTranslation} from 'react-i18next';
import {Colors, Layout} from '../../constants';
import {
    Logo,
    RegisterForm,
    SafeArea,
    ScreenScrollView,
    FlatButton,
} from '../../components';

const LARGE_SCREEN_THRESHOLD = 800;

const SignUpScreen = ({t, navigation}) => {
    const handleRegisterSuccess = () => {
        navigation.navigate('Onboarding', {
            isAuth: true,
            isNewUser: true,
        });
    };

    const handleBackToLoginPress = () => {
        navigation.push('SignIn');
    };

    return (
        <ScreenScrollView style={styles.container} bounces={false}>
            <SafeArea color={Colors.background} />
            <View style={styles.content}>
                {Layout.window.height >= LARGE_SCREEN_THRESHOLD && (
                    <Logo style={styles.logo} height={96} />
                )}
                <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
                <FlatButton
                    textStyle={styles.gotoLoginText}
                    onPress={handleBackToLoginPress}>
                    {t('gotoLogin')}
                </FlatButton>
            </View>
        </ScreenScrollView>
    );
};

SignUpScreen.propTypes = {
    t: PropTypes.any.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
        push: PropTypes.func,
    }).isRequired,
};

export default withTranslation('authComponent')(SignUpScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: Layout.window.height - 50,
        ...(Layout.isSmallDevice && {
            paddingTop: 80,
        }),
    },
    logo: {
        marginBottom: Layout.margin * 2,
    },
    gotoLoginText: {
        fontWeight: 'bold',
    },
});
