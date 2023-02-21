/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ViewPropTypes} from 'react-native';
import LimelightPlayer from './LimelightPlayer';
import WebviewPlayer from './WebviewPlayer';
import IosAndroidPlayer from './AndroidIosVideoPlayer';
import {
    Layout,
    Colors,
    PLAYER_TYPE_LIMELIGHT,
    PLAYER_TYPE_VIMEO,
} from '../../constants';
import VideoPlayerHOC from './VideoPlayerHOC';

const VideoPlayer = ({
    type,
    limelightVideoId,
    vimeoVideoId,
    webUri,
    style,
    ...rest
}) => {
    return (
        <View style={[styles.container, style]}>
            {type === PLAYER_TYPE_LIMELIGHT ? (
                <LimelightPlayer
                    videoId={limelightVideoId}
                    style={styles.player}
                    {...rest}
                />
            ) : type === PLAYER_TYPE_VIMEO ? (
                <IosAndroidPlayer videoId={vimeoVideoId} {...rest} />
            ) : (
                <WebviewPlayer uri={webUri} style={styles.player} {...rest} />
            )}
        </View>
    );
};

VideoPlayer.propTypes = {
    type: PropTypes.string.isRequired,
    limelightVideoId: PropTypes.string,
    vimeoVideoId: PropTypes.string,
    webUri: PropTypes.string,
    style: ViewPropTypes.style,
};

VideoPlayer.defaultProps = {
    limelightVideoId: null,
    vimeoVideoId: null,
    webUri: null,
    style: {},
};

export default VideoPlayerHOC(VideoPlayer);

const styles = StyleSheet.create({
    player: {
        backgroundColor: Colors.mineShaft,
        width: Layout.window.width,
        height: (9 / 16) * Layout.window.width,
    },
});
