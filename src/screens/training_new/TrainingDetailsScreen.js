import React from 'react';
import {SelectedExercise} from '@traineffective/te-component-library';

const TrainingDetailsScreen = ({navigation}) => {
    const selectedExerciseListData = [
        {
            id: 1,
            label: 'ST',
        },
        {
            id: 2,
            label: 'LW',
        },
        {
            id: 3,
            label: 'RW',
        },
        {
            id: 4,
            label: 'CAM',
        },
    ];

    const wantToKnowData = [
        {
            id: 1,
            iconName: 'technique',
            level: 'Position:',
            description: 'Striker',
        },
        {
            id: 2,
            iconName: 'lvl',
            level: 'Level:',
            description: 'Maximum Pace',
        },
        {
            id: 3,
            iconName: 'space',
            level: 'Space:',
            description: 'Football pitch (with goal)',
        },
    ];

    const equipmentData = [
        {
            id: 1,
            iconName: 'soccerBall',
            label: 'BALL',
        },
        {
            id: 2,
            iconName: 'cone',
            label: 'CONES',
        },
    ];
    return (
        <SelectedExercise
            selectedExerciseListData={selectedExerciseListData}
            wantToKnowData={wantToKnowData}
            equipmentData={equipmentData}
            experience="555"
            experienceMinutes={35}
            repetitionsMinutes="01:43"
            repetitionsDate="April 12, 2021"
            repetitionsTime="09:48 AM"
            onPress={() => {
                navigation.navigate('Timer');
            }}
        />
    );
};

export default TrainingDetailsScreen;
