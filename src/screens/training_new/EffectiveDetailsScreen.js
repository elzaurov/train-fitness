import React from 'react';
import { Text, View } from 'react-native';
import {SelectedJourney} from '@traineffective/te-component-library';

const EffectiveDetailsScreen = ({
    navigation,
}) => {
    const results = [
        {
            id: 1,
            text: 'Get faster when dribbling with the ball',
        },
        {
            id: 2,
            text: 'Get faster when dribbling',
        },
        {
            id: 3,
            text: 'Get effective when dribbling with the ball',
        },
        {
            id: 4,
            text: 'Get more powerful when dribbling',
        },
    ];

    const equipments = [
        {
            icon: 'soccerBall32',
            name: 'BALL',
        },
        {
            icon: 'cone',
            name: 'CONES',
        },
        {
            icon: 'wall',
            name: 'REBOUNDER',
        },
        {
            icon: 'hurdles',
            name: 'HURDLES',
        },
        {
            icon: 'ladder',
            name: 'LADDER',
        },
    ];

    const skills = [
        {
            name: 'PASSING',
        },
        {
            name: 'DRIBBLING',
        },
        {
            name: 'FINISHING',
        },
    ];
    return (
        <SelectedJourney
            equipments={equipments}
            skills={skills}
            results={results}
            buttonText='SELECT THE PROGRAM'
            onBackPress={()=>{navigation.goBack()}}
            onSelectJourney={()=>{navigation.navigate('JourneyProgress')}}
        />
    ); 
}

export default EffectiveDetailsScreen;
 