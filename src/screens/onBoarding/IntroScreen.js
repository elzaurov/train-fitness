import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {IntroVideo, OnBoardingHeader} from '../../components';
import {INTRO_VIDEO_VARIANT_SKIPPABLE} from '../../constants';

const IntroScreen = props => {
    const {isOnboardingValueVideo = false} = props?.route?.params || {};
    return <IntroVideo isOnboardingValueVideo={isOnboardingValueVideo} />;
};

const Header = ({...rest}) => {
    const behavior = useSelector(
        state => state.remoteConfigs.onboarding_intro_video_behavior,
    );

    const hasOnboardingValueVideo = useSelector(
        state => state.remoteConfigs.experiment_6_onboarding_value_video,
    );

    const canSkip = useMemo(
        () => __DEV__ || behavior === INTRO_VIDEO_VARIANT_SKIPPABLE,
        [behavior],
    );

    return (
        <OnBoardingHeader
            {...rest}
            backButton={hasOnboardingValueVideo ? false : canSkip}
            skipButton={hasOnboardingValueVideo ? false : canSkip}
            onSkip={async () => {
                rest.navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: hasOnboardingValueVideo
                                ? 'Recommendations'
                                : 'OnBoardingPaywall',
                        },
                    ],
                });
            }}
        />
    );
};

Header.propTypes = {
    navigation: PropTypes.shape({
        push: PropTypes.func,
    }).isRequired,
};

IntroScreen.navigationOptions = {
    headerTransparent: true,
    header: rest => <Header {...rest} />,
};

export default IntroScreen;
