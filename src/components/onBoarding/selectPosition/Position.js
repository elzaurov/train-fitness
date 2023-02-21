import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {OnBoardingTemplate} from '../../layout';
import Field from './Field';
import {updateOnBoarding} from '../../../actions';

import OnBoardingContainer from '../../layout/OnBoardingContainer';
import {INTRO_VIDEO_VARIANT_SKIP} from '../../../constants';
import OnBoardingTitle from '../OnBoardingTitle';
import OnBoardingButton from '../OnBoardingButton';

const Position = () => {
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const {onboarding_intro_video_behavior: introBehavior} = useSelector(
        state => state.remoteConfigs,
    );

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleSelectPress = async () => {
        setSubmitting(true);
        await dispatch(updateOnBoarding({position: selectedPosition}));

        setSubmitting(false);

        const route =
            introBehavior === INTRO_VIDEO_VARIANT_SKIP
                ? 'OnBoardingPaywall'
                : 'Intro';

        navigation.push(route);
    };

    return (
        <OnBoardingTemplate
            bottomBar={
                <OnBoardingButton
                    onPress={handleSelectPress}
                    loading={submitting}
                    disabled={!selectedPosition}>
                    Next
                </OnBoardingButton>
            }>
            <OnBoardingContainer>
                <OnBoardingTitle text="What's your position?" />
                <Field
                    selectedPosition={selectedPosition}
                    onSelect={setSelectedPosition}
                />
            </OnBoardingContainer>
        </OnBoardingTemplate>
    );
};

export default Position;
