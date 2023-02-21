import React from 'react';
import {SelectedClassesTactics} from '@traineffective/te-component-library';
import BarbellPush from '../../assets/images/learn/BarbellPush.png';

const CourseDetailsScreen = ({navigation}) => {
    const classesLessonsData = [
        {
            id: 1,
            lessonsImage: BarbellPush,
            lessonsTitle: 'Accelertion & finishing derill',
            lessonsMinutes: '3:42',
        },
        {
            id: 2,
            lessonsImage: BarbellPush,
            lessonsTitle: 'Barbell Push Press',
            lessonsMinutes: '4:56',
        },
        {
            id: 3,
            lessonsImage: BarbellPush,
            lessonsTitle: 'ST Dribbling - 180 cut with fake shot',
            lessonsMinutes: '2:45',
        },
        {
            id: 4,
            lessonsImage: BarbellPush,
            lessonsTitle: 'ST Dribbling - 180 cut with fake shot',
            lessonsMinutes: '4:21',
        },
    ];
    return (
        <SelectedClassesTactics
            handlePress={() => {
                navigation.goBack();
            }}
            onPress={() => {
                navigation.navigate('SingleLesson');
            }}
            onClassesLesson={() => {
                navigation.navigate('ClassesProgress');
            }}
            experienceMinutes={10}
            experienceStats={555}
            classesLessonsData={classesLessonsData}
        />
    );
};

export default CourseDetailsScreen;
