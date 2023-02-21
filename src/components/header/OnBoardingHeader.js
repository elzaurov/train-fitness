import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AuthHeader from './AuthHeader';
import {
    ONBOARDING_GRADIENT_COLOR_TRANSPARENT,
    ONBOARDING_GRADIENT_COLOR_OPAQUE,
} from '../../constants';
import OnBoardingButton from '../onBoarding/OnBoardingButton';

const OnBoardingHeader = ({
    gradientStyle,
    skipButton,
    skipButtonComponent: SkipButtonComponent,
    onSkip,
    ...rest
}) => (
    <View style={styles.container}>
        <LinearGradient
            colors={[
                ONBOARDING_GRADIENT_COLOR_OPAQUE,
                ONBOARDING_GRADIENT_COLOR_TRANSPARENT,
            ]}
            locations={[0, 1]}
            style={[styles.gradient, gradientStyle]}
        />
        <AuthHeader
            {...rest}
            right={skipButton ? <SkipButtonComponent onPress={onSkip} /> : null}
        />
    </View>
);

OnBoardingHeader.propTypes = {
    gradientStyle: PropTypes.any,
    skipButtonComponent: PropTypes.any,
    skipButton: PropTypes.bool,
    onSkip: PropTypes.func,
};

OnBoardingHeader.defaultProps = {
    gradientStyle: null,
    skipButtonComponent: props => (
        <OnBoardingButton
            style={{
                flex: 1,
                zIndex: 1,
            }}
            flat
            fitToOneLine
            {...props}>
            Skip
        </OnBoardingButton>
    ),
    skipButton: false,
    onSkip: null,
};

export default OnBoardingHeader;

const styles = StyleSheet.create({
    container: {},
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
});
