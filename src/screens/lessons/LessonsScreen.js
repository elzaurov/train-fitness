import React, {useEffect} from 'react';
import {MentalityLessons as Lessons} from '@traineffective/te-component-library';
import {useDispatch, useSelector} from 'react-redux';
import {loadLessons} from '../../actions';

const LessonsScreen = ({navigation, route}) => {
    const {
        params: {lessonType}, // lessonType can be: classroom | gamebrain
    } = route;

    const lessons = useSelector(state => state.lessons[lessonType]);

    const dispatch = useDispatch();

    const handlePressExercise = (type, exercise, scheduleId) => {
        const {key, isLocked} = exercise;
        if (type === 'gamebrain') {
            type = 'game-brain';
        }
        if (isLocked) {
            navigation.push('Paywall')
        }else {
            navigation.navigate('Learning', { id: key, videoPath: type });
        }
    };

    useEffect(() => {
        dispatch(loadLessons(lessonType));
    }, [dispatch, lessonType]);

    // For now we have only 'classroom' and 'gamebrain', if there will be more - rewrite to switch
    const headerTitle =
        lessonType === 'gamebrain' ? 'Tactical Analyses' : 'Mentality Lessons';

    return (
        <Lessons
            headerTitle={headerTitle}
            navigation={navigation}
            exercises={lessons}
            handlePressBack={() => navigation.goBack()}
            handlePressExercise={exercise =>
                handlePressExercise(lessonType, exercise, 'test')
            }
        />
    );
};

export default LessonsScreen;
