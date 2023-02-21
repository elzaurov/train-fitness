import React from 'react';
import {SelectedJourneyProgress} from '@traineffective/te-component-library';

const JourneyProgressScreen = ({navigation}) => {
    const journeyProgress = [
        {
            id: 1,
            title: 'Body Strong Benchmark',
            level: 'Intermediate',
            skills: ['Dribbling', 'Passing'],
            duration: '35 min',
            completed: true,
        },
        {
            id: 2,
            title: '20-minute Total Body Desk Detox',
            level: 'Intermediate',
            skills: ['Dribbling', 'Passing'],
            duration: '35 min',
            completed: true,
        },
        {
            id: 3,
            title: 'Archer Pullups',
            level: 'Beginner',
            skills: ['Coordination', 'Strength'],
            duration: '15 min',
            completed: true,
        },
        {
            id: 4,
            title: '20-minute Total Body Desk Detox',
            level: 'Intermediate',
            skills: ['Dribbling', 'Passing'],
            duration: '35 min',
            completed: false,
        },
        {
            id: 5,
            title: 'Body Strong Benchmark',
            level: 'Advanced',
            skills: ['Dribbling', 'Passing'],
            duration: '35 min',
            completed: false,
        },
    ];

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
        <SelectedJourneyProgress
            skills={skills}
            equipments={equipments}
            results={results}
            buttonText="Next Training"
            dataSource={journeyProgress}
            onBackPress={() => {
                navigation.goBack();
            }}
        />
    );
};

export default JourneyProgressScreen;
