import React from 'react';
import {Classes} from '@traineffective/te-component-library';

import {Header} from '../../layout';

const CoursesScreen = ({navigation}) => {
    const stagesBoxData = [
        {
            key: 0,
            title: 'THE HAALAND',
            description: 'All Positions',
            duration: 45,
            type: 'FUNDAMENTAL',
            icon: 'technique',
        },
        {
            key: 1,
            title: 'THE HAALAND',
            description: 'All Positions',
            duration: 45,
            type: 'FUNDAMENTAL',
            icon: 'technique',
        },
        {
            key: 2,
            title: 'THE HAALAND',
            description: 'All Positions',
            duration: 45,
            type: 'FUNDAMENTAL',
            icon: 'technique',
        },
    ];

    const onExploreSectionClicked = by => {
        navigation.navigate('SessionList', {trainingType: 'course', by});
    };

    const onStageBoxPress = () => {
        navigation.navigate('CourseDetails');
    };

    return (
        <>
            <Header
                isDarkMode
                mode="back"
                hideLeaderBoard
                navigation={navigation}
            />
            <Classes
                betterPlayerItems={stagesBoxData}
                onStageBoxPress={onStageBoxPress}
                onExploreSectionClicked={onExploreSectionClicked}
            />
        </>
    );
};

export default CoursesScreen;
