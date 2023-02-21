import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, ViewPropTypes} from 'react-native';
import Video from 'react-native-video';
import {useSelector} from 'react-redux';
import introVideo from '../../../assets/videos/onboarding-intro-video.mp4';
import newIntroVideo from '../../../assets/videos/new-onboarding-intro-video.mp4';
import {
    ANALYTICS_INTRO_VIDEO_WATCHED,
    ANALYTICS_TOPIC_CUSTOM_EVENT,
} from '../../../constants';
import {subject} from '../../../analytics';

const IntroVideoPlayer = ({
    style,
    onProgress,
    isOnboardingValueVideo = false,
}) => {
    const [canPlay, setCanPlay] = useState(false);
    const navigation = useNavigation();

    const {isFree} = useSelector(state => state.plan);

    useEffect(() => {
        const unsubFocus = navigation.addListener('focus', () => {
            setCanPlay(true);
        });

        const unsubBlur = navigation.addListener('blur', () => {
            setCanPlay(false);
        });

        return () => {
            unsubFocus?.();
            unsubBlur?.();
        };
    }, [navigation]);

    const handleVideoProgress = ({currentTime = 0, seekableDuration = 1}) => {
        onProgress?.(currentTime / seekableDuration);
    };

    const handleEnd = () => {
        subject.next({
            topic: ANALYTICS_TOPIC_CUSTOM_EVENT,
            event: ANALYTICS_INTRO_VIDEO_WATCHED,
        });

        if (isFree && isOnboardingValueVideo) {
            navigation.push('OnBoardingPaywall', {
                isOnboardingValueVideo: false,
            });
        } else if (!isFree && isOnboardingValueVideo) {
            navigation.push('Recommendations');
        } else {
            navigation.push('OnBoardingPaywall');
        }
    };

    const defaultIntroVideo = isOnboardingValueVideo
        ? newIntroVideo
        : introVideo;

    return (
        <View style={[styles.container, style]}>
            {canPlay ? (
                <Video
                    controls={false}
                    style={styles.player}
                    source={defaultIntroVideo}
                    onEnd={handleEnd}
                    resizeMode="contain"
                    onProgress={handleVideoProgress}
                />
            ) : null}
        </View>
    );
};

IntroVideoPlayer.propTypes = {
    style: ViewPropTypes.style,
    onProgress: PropTypes.func,
};

IntroVideoPlayer.defaultProps = {
    style: null,
    onProgress: null,
};

export default IntroVideoPlayer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    player: {
        flex: 1,
    },
});
