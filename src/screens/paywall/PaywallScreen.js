import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {WidelabPaywall} from '../../components';

const PaywallScreen = () => {
    const navigation = useNavigation();
    const {in_app_paywall, trial_offer, experiment_5_in_app_paywall} =
        useSelector(state => state.remoteConfigs);

    return (
        <WidelabPaywall
            plansScreen="Plans"
            featuresScreen="Features"
            variant={experiment_5_in_app_paywall}
            trialOffer={trial_offer}
            onSkip={() => navigation.goBack()}
        />
    );
};

export default PaywallScreen;
