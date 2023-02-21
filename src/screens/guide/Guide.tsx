import React from 'react';
import {SafeAreaView} from 'react-native';
import {Guide, colors} from '@traineffective/te-component-library';
import GuideHOCWrapper from './GuideHOC';

const GuideScreen = props => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.grey[700]}}>
            <Guide {...props} />
        </SafeAreaView>
    );
};

export default GuideHOCWrapper(GuideScreen);
