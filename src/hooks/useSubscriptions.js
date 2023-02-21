import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {requestSubscription, getPurchaseHistory} from 'react-native-iap';
import moment from 'moment';
import {loadSubscriptions, verifyReceipt} from '../actions';

const productPrefix = Platform.select({
    ios: 'com.traineffective.ios',
    android: 'com.traineffective.android',
});

const getProductPackage = id => {
    return `${productPrefix}.${id}`;
};

export const useSubscriptions = () => {
    const {subscriptions, cancelDate, popularPlan, productPlans} = useSelector(
        ({subscriptions, remoteConfigs}) => {
            const {popular_plan, plans} = {
                ...remoteConfigs.premium_product,
            };
            return {
                subscriptions,
                cancelDate: moment()
                    .clone()
                    .add(7, 'day')
                    .format('DD MMMM yyyy'),
                popularPlan: popular_plan,
                productPlans: plans,
            };
        },
    );
    const dispatch = useDispatch();
    const [products, setProducts] = useState(productPlans);
    const [subscribing, setSubscribing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [popularSubscription, setPopularSubscription] = useState(null);

    useEffect(() => {
        setLoading(true);
        const productIds = productPlans.map(item => getProductPackage(item.id));
        dispatch(loadSubscriptions(productIds)).finally(() => {
            setLoading(false);
        });
    }, [dispatch]);

    useEffect(() => {}, []);

    const handleSubscribe = async (id, isProductPackage = false) => {
        setSubscribing(true);
        try {
            const purchase = await requestSubscription(
                isProductPackage ? id : getProductPackage(id),
            );
            if (purchase) {
                return dispatch(verifyReceipt(purchase));
            }
        } finally {
            setSubscribing(false);
        }
    };

    useEffect(() => {
        setPopularSubscription(
            subscriptions?.find(
                subscription =>
                    subscription.productId === getProductPackage(popularPlan),
            ),
        );
    }, [subscriptions]);

    return {
        loading,
        products,
        cancelDate,
        setProducts,
        subscribing,
        subscriptions,
        popularPlan,
        popularSubscription,
        subscribe: handleSubscribe,
    };
};
