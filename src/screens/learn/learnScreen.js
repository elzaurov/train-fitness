import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import {TrackerStreak, LearnMain} from '@traineffective/te-component-library';

import {Header} from '../../layout';
import {
    COURSES,
    mainBoxesData,
    MENTALITY_LESSONS,
    streaksData,
    TACTICAL_ANALYSES,
} from './learnScreen.data';
import {AppStorage} from '../../utils';

const LearnScreen = ({navigation}) => {
    const [showPopup, setShowPopup] = useState(false);

    const storage = new AppStorage('learn_screen');

    const showPopupAndSaveToStorage = () => {
        setShowPopup(true);
        storage.set({popupShown: true});
    };

    storage
        .get()
        .then(res => {
            if (res?.popupShown !== true) {
                showPopupAndSaveToStorage();
            }
        })
        .catch(() => {
            showPopupAndSaveToStorage();
        });

    const handleBoxClick = title => {
        if (title === COURSES) {
            navigation.navigate('Courses');
        }
        if (title === TACTICAL_ANALYSES) {
            navigation.navigate('Lessons', {lessonType: 'gamebrain'});
        }
        if (title === MENTALITY_LESSONS) {
            navigation.navigate('Lessons', {lessonType: 'classroom'});
        }
    };
    return (
        <LearnMain
            mainBoxesData={mainBoxesData}
            onPressRightArrow={handleBoxClick}
            onPressMainBox={handleBoxClick}
            showPopupOnLoad={showPopup}
        />
    );
};

export default LearnScreen;
