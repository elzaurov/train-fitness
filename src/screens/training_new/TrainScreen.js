import React from 'react';
import {TrainingMain} from '@traineffective/te-component-library';

import {SearchContainer} from '../../containers/index';

const TrainScreen = ({navigation}) => {
    const onPressMainBox = param => {
        const {header} = param;
        if (header === 'Training Plans') {
            navigation.navigate('EffectiveJourney');
        } else if (header === 'Training Sessions') {
            navigation.navigate('TrainingSession');
        } else if (header === 'Technical Drills') {
            navigation.navigate('TSessionList', {
                trainingType: 'exercise',
                by: 'technical_drills',
            });
        } else if (header === 'Fitness Exercises') {
            navigation.navigate('TSessionList', {
                trainingType: 'exercise',
                by: 'fitness_exercises',
            });
        }
    };
    return (
        <>
            <TrainingMain
                onPressMainBox={onPressMainBox}
                onEffectiveCard={() => {
                    navigation.navigate('EffectiveJourney');
                }}
                onTrainingCard={() => {
                    navigation.navigate('TrainingSession');
                }}
                onSingleCard={({type}) => {
                    let by;

                    if (type === 'technicalDrills') {
                        by = 'technical_drills';
                    } else if (type === 'fitnessExercise') {
                        by = 'fitness_exercises';
                    }

                    navigation.navigate('TSessionList', {
                        trainingType: 'exercise',
                        by,
                    });
                }}
            />
            <SearchContainer navigation={navigation} />
        </>
    );
};

export default TrainScreen;
