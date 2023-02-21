import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {WidelabPlans} from '../../components';

const PlansScreen = () => {
    const navigation = useNavigation();
    const {in_app_paywall, experiment_5_in_app_paywall} = useSelector(
        state => state.remoteConfigs,
    );
    return (
        <WidelabPlans
            variant={experiment_5_in_app_paywall}
            onSkip={() => navigation.goBack()}
            onPurchase={() => navigation.replace('PaymentSuccess')}
        />
    );
};

PlansScreen.navigationOptions = {
    headerTransparent: false,
    header: () => null,
};

export default PlansScreen;
