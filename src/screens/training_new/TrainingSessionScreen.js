import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Text, Button, SafeAreaView} from 'react-native';
import {TrainingSession} from '@traineffective/te-component-library';
import Explore from '../../assets/images/train/Explore.png';
import ImproveWeakness from '../../assets/images/train/ImproveWeakness.png';

const TrainingSessionScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const trainingSession = useSelector(
        state => state.training.trainingSession,
    );

    const onExploreCard = param => {
        navigation.navigate('TSessionList', {
            trainingType: 'workout',
            by:
                param.code === 'technical_drills'
                    ? 'technical_sessions'
                    : 'fitness_sessions',
        });
    };
    return (
        <TrainingSession
            onLeftArrow={() => {
                navigation.goBack();
            }}
            hideSearch
            onCardClick={onExploreCard}
        />
    );
};

export default TrainingSessionScreen;
