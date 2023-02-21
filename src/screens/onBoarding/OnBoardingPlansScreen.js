import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { WidelabPlans } from '../../components';

const OnBoardingPlansScreen = () => {
    const navigation = useNavigation();
    const {onboarding_paywall} = useSelector(state => state.remoteConfigs);
    return (
        <WidelabPlans
            variant={onboarding_paywall}
            onSkip={() => navigation.goBack()}
            onPurchase={() => navigation.replace('Recommendations')}
        />
    )
};

OnBoardingPlansScreen.navigationOptions = {
    headerTransparent: false,
    header: () => null,
};

export default OnBoardingPlansScreen;
