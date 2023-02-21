import React from 'react';
import {WriteNote} from '@traineffective/te-component-library';

const WriteTrainNoteScreens = ({navigation}) => {
    return (
        <WriteNote
            handleSubmitButton={() => {
                navigation.navigate('WellDone');
            }}
            handleSkipButton={() => {}}
        />
    );
};

export default WriteTrainNoteScreens;
