import React from 'react';
import {TrackerStreak} from '@traineffective/te-component-library';
import {useSelector, useDispatch} from 'react-redux';
import {showStreakModal} from '../../actions';

const StreakModal = () => {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile);
    const streakModal = useSelector(state => state.user.streakModal);

    const STREAKS_DATA = [
        'Complete a train effective training',
        'Complete a Train Effective course',
    ];

    const handleSubmit = () => {
        dispatch(showStreakModal());
    };

    return (
        <TrackerStreak
            toggleStreakModal={handleSubmit}
            visible={streakModal}
            streakSteps={STREAKS_DATA}
            handleSubmit={handleSubmit}
            currentStreak={profile?.streak}
        />
    );
};

export default StreakModal;
