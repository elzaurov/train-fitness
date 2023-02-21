import React, {memo, useState} from 'react';
import {OnBoardingTemplate} from '../../layout';
import IntroVideoPlayer from './IntroVideo';
import IntroVideoProgress from './IntroVideoProgress';

// Memoize the video player to prevent excessive re-render on progress
const MemoizedIntroVideoPlayer = memo(IntroVideoPlayer);

const IntroVideo = props => {
    const [videoProgress, setVideoProgress] = useState(0);

    return (
        <OnBoardingTemplate
            bottomBar={<IntroVideoProgress progress={videoProgress} />}>
            <MemoizedIntroVideoPlayer
                {...props}
                onProgress={setVideoProgress}
            />
        </OnBoardingTemplate>
    );
};

export default IntroVideo;
