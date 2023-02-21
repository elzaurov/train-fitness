import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {PaywallMain} from '@traineffective/te-component-library';
import {useNavigation} from '@react-navigation/native';
import {PAYWALL_VARIANT_WIDELAB} from '../../constants';

const WidelabPaywall = ({
    trialOffer,
    variant,
    featuresScreen,
    plansScreen,
    onSkip,
}) => {
    const navigation = useNavigation();
    const isDuolingo = useMemo(
        () => variant !== PAYWALL_VARIANT_WIDELAB,
        [variant],
    );
    const handleChangeScreen = useCallback(() => {
        navigation.push(isDuolingo ? featuresScreen : plansScreen);
    }, [navigation, isDuolingo]);

    return (
        <PaywallMain
            variant={variant}
            paywallStories={trialOffer?.stories}
            handlePressCloseButton={() => {
                if (onSkip) {
                    onSkip();
                } else {
                    navigation.goBack();
                }
            }}
            handleNoThanksButton={onSkip}
            handlePressGoProButton={handleChangeScreen}
            handleStartMyFreeTrial={handleChangeScreen}
        />
    );
};

WidelabPaywall.propTypes = {
    onSkip: PropTypes.func,
    trialOffer: PropTypes.object.isRequired,
    variant: PropTypes.string.isRequired,
    featuresScreen: PropTypes.string.isRequired,
    plansScreen: PropTypes.string.isRequired,
};

WidelabPaywall.defaultProps = {
    onSkip: () => null,
};

export default WidelabPaywall;
