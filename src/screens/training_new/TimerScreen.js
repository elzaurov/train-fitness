import React from 'react';
import {Timer} from '@traineffective/te-component-library';

const TimerScreen = ({navigation}) => {
    return (
        <Timer
            timerMinutes="00:23"
            repsCount={10}
            onDoneBtn={() => {
                navigation.navigate('WriteNote');
            }}
        />
    );
};

export default TimerScreen;
