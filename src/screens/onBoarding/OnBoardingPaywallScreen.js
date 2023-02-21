import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {WidelabPaywall} from '../../components';

const OnBoardingPaywallScreen = () => {
    const navigation = useNavigation();
    const {params} = useRoute();
    const {isOnboardingValueVideo} = params || {};

    const {
        onboarding_paywall,
        trial_offer,
        experiment_6_onboarding_value_video,
    } = useSelector(state => state.remoteConfigs);
    return (
        <WidelabPaywall
            trialOffer={trial_offer}
            variant={onboarding_paywall}
            plansScreen="OnBoardingPlans"
            featuresScreen="OnBoardingFeatures"
            onSkip={() => {
                if (
                    experiment_6_onboarding_value_video &&
                    isOnboardingValueVideo === undefined
                ) {
                    navigation.push('Intro', {isOnboardingValueVideo: true});
                } else {
                    navigation.push('Recommendations');
                }
            }}
        />
    );
};

OnBoardingPaywallScreen.navigationOptions = {
    headerTransparent: true,
    header: () => null,
};

export default OnBoardingPaywallScreen;
