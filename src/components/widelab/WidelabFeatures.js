import React, {useCallback, useState, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {PaywallFeaturesMain} from '@traineffective/te-component-library';
import {useSubscriptions} from '../../hooks';
import {PAYWALL_VARIANT_DUOLINGO_DIRECT} from '../../constants';

const WidelabFeatures = ({inApp, trialOffer, variant, plansScreen, onSkip}) => {
    const navigation = useNavigation();
    const isDuolingoDirect = useMemo(
        () => variant === PAYWALL_VARIANT_DUOLINGO_DIRECT,
        [variant],
    );
    const [str, setStr] = useState({
        pricePerMonth: '',
        pricePerMonthAddition: '',
    });

    const {cancelDate, products, popularPlan, subscribing, subscribe} =
        useSubscriptions();
    useEffect(() => {
        const {price, months, pricePerMonth} = products.find(
            item => item.id === popularPlan,
        );
        setStr({
            pricePerMonth: `(${pricePerMonth}/month)`,
            pricePerMonthAddition: `${price} / 6 months`,
        });
    }, [products, popularPlan]);

    const handlePressSecondaryBtn = useCallback(() => {
        if (isDuolingoDirect) {
            navigation.push(plansScreen);
        } else {
            onSkip();
        }
    }, [navigation, onSkip, isDuolingoDirect]);

    const handlePressBtn = useCallback(async () => {
        if (isDuolingoDirect) {
            const verified = await subscribe(popularPlan);
            if (verified) {
                onPurchase();
            }
        } else {
            navigation.push(plansScreen);
        }
    }, [navigation, products, subscribe, isDuolingoDirect]);

    return (
        <SafeAreaView>
            <PaywallFeaturesMain
                variant={variant}
                isStartMyFreeTrialBtnLoading={subscribing}
                handleStartMyFreeTrial={handlePressBtn}
                handleViewAllPlansButton={handlePressSecondaryBtn}
                handleCloseButton={onSkip}
                handleNoThanksButton={onSkip}
                cancelDate={cancelDate}
                freeTrialTexts={{
                    freeTrialTextAdditionalPerMonth: str?.pricePerMonth,
                    freeTrialTextPerMonth: str?.pricePerMonthAddition,
                }}
            />
        </SafeAreaView>
    );
};

WidelabFeatures.propTypes = {
    inApp: PropTypes.bool,
    onSkip: PropTypes.func,
    onPurchase: PropTypes.func,
    trialOffer: PropTypes.object.isRequired,
    variant: PropTypes.string.isRequired,
    plansScreen: PropTypes.string.isRequired,
};

WidelabFeatures.defaultProps = {
    inApp: false,
    onSkip: () => null,
    onPurchase: () => null,
};

export default WidelabFeatures;
