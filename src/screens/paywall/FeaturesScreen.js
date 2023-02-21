import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {WidelabFeatures} from '../../components';

const FeaturesScreen = () => {
    const navigation = useNavigation();
    const {trial_offer, in_app_paywall, experiment_5_in_app_paywall} =
        useSelector(state => state.remoteConfigs);
    return (
        <WidelabFeatures
            inApp
            trialOffer={trial_offer}
            variant={experiment_5_in_app_paywall}
            plansScreen="Plans"
            onSkip={() => navigation.goBack()}
            onPurchase={() => navigation.replace('PaymentSuccess')}
        />
    );
};

export default FeaturesScreen;
