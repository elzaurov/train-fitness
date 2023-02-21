import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native';
import {PaywallPlanMain} from '@traineffective/te-component-library';
import {useSubscriptions} from '../../hooks';
import {
    PAYWALL_VARIANT_WIDELAB,
    PAYWALL_VARIANT_DUOLINGO_DIRECT,
} from '../../constants';

const WidelabPlans = ({variant, onSkip, onPurchase}) => {
    const {isDuolingo, isDuolingoDirect} = useMemo(
        () => ({
            isDuolingo: variant !== PAYWALL_VARIANT_WIDELAB,
            isDuolingoDirect: variant === PAYWALL_VARIANT_DUOLINGO_DIRECT,
        }),
        [variant],
    );
    const {cancelDate, products, setProducts, subscribing, subscribe} =
        useSubscriptions();
    const handlePressTrialBtn = useCallback(async () => {
        const activePlan = products.find(item => item.isActive);
        const verified = await subscribe(activePlan.id);
        if (verified) {
            onPurchase();
        }
    }, [products, subscribe]);
    const handlePressPackage = useCallback(
        async plan => {
            setProducts(
                products.map(item => {
                    item.isActive = item.id === plan.id;
                    return item;
                }),
            );
            if (isDuolingoDirect) {
                await handlePressTrialBtn();
            }
        },
        [products, isDuolingoDirect],
    );

    return (
        <SafeAreaView>
            <PaywallPlanMain
                variant={variant}
                paywallData={products}
                isStartMyFreeTrialBtnLoading={subscribing}
                cancelDate={cancelDate}
                onPress={handlePressPackage}
                handlePressCloseBtn={onSkip}
                handleGoBackButton={onSkip}
                handlePressTrialBtn={handlePressTrialBtn}
                handleStartMyFreeTrial={handlePressTrialBtn}
            />
        </SafeAreaView>
    );
};

WidelabPlans.propTypes = {
    variant: PropTypes.string.isRequired,
    onPurchase: PropTypes.func,
    onSkip: PropTypes.func,
};

WidelabPlans.defaultProps = {
    onPurchase: () => null,
    onSkip: () => null,
};

export default WidelabPlans;
