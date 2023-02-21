import React from 'react';
import {SelectedClassesProgress} from '@traineffective/te-component-library';

const ClassesProgressScreen = ({navigation}) => {
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
    return (
        <SelectedClassesProgress
            positions={['CB', 'LB', 'RB']}
            completedItems={5}
            percent={17}
            dataSource={journeyProgress}
            total={20}
            pillarType="fitness"
            headerTitle="Quick line of defense"
            experience={555}
            handlePressBack={() => {
                navigation.goBack();
            }}
        />
    );
};

export default ClassesProgressScreen;
