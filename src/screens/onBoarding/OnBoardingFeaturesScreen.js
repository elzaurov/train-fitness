import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {WidelabFeatures} from '../../components';

const OnBoardingFeaturesScreen = () => {
    const navigation = useNavigation();
    const {trial_offer, onboarding_paywall} = useSelector(
        state => state.remoteConfigs,
    );
    return (
        <WidelabFeatures
            trialOffer={trial_offer}
            variant={onboarding_paywall}
            plansScreen="OnBoardingPlans"
            onSkip={() => navigation.push('Recommendations')}
            onPurchase={() => navigation.replace('Recommendations')}
        />
    );
};

OnBoardingFeaturesScreen.navigationOptions = {
    headerTransparent: false,
    header: () => null,
};

export default OnBoardingFeaturesScreen;
