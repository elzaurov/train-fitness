import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { EffectiveJourneys } from '@traineffective/te-component-library';
import { Header } from '../../layout';
import { loadTrainingPlans } from '../../actions/training';
import { getCatalog } from '../../actions';

const EffectiveJourneyScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const effectiveJourney = useSelector(
        state => state.training.effectiveJourney,
    );
    const currentPlan = useSelector((state) => state.plan);

    useEffect(() => {
        dispatch(loadTrainingPlans());
        return () => { };
    }, []);

    const onJourneyBoxPress = item => {
        const { isPremium } = item;
        if (isPremium && currentPlan.isFree === true) {
            navigation.push('Paywall');
        } else {
            navigation.navigate('Program', {
                id: item.key,
                disabledPhases: true,
            });
        }
    };
    return (
        <>
            <Header
                mode="back"
                screen=""
                isDarkMode
                hideLeaderBoard
                navigation={navigation}
            />
            <EffectiveJourneys
                onBackPress={() => {
                    navigation.goBack();
                }}
                effectiveJourneys={effectiveJourney}
                onJourneyBoxPress={onJourneyBoxPress}
                onBoxClick={(activity) => {
                    navigation.navigate('Program', {
                        id: activity.key,
                        disabledPhases: true,
                    });
                }}
            />
        </>
    );
};

export default EffectiveJourneyScreen;
