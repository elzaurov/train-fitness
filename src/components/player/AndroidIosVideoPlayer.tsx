import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    AppState,
    Platform,
    Alert,
    TouchableOpacity,
    Image,
} from 'react-native';
import Video from 'react-native-video-controls';
import {useDispatch, useSelector} from 'react-redux';
import Orientation from 'react-native-orientation';
import RNFetchBlob from 'rn-fetch-blob';
import NetInfo from '@react-native-community/netinfo';
import RNVideoCompress from 'react-native-video-compress';
import VideoLoadingOverlay from './VideoLoadingOverlay';
import {updateFullscreen, updateVideoGestureLockToggle} from '../../actions';
import VimeoPlayerHOC from './VimeoPlayerHOC';
import {Layout} from '../../constants';
import {useImage} from '../../hooks';

interface IDownloadVideoProps {
    width: number;
    height: number;
    link: string;
    quality: string;
    size: number;
    type: string;
}

interface IAndroidIosVideoPlayerProps {
    videoId: string;
    cached: boolean;
    isPremiumUser: boolean;
    playUrl: string;
    downloadData: IDownloadVideoProps;
    loading: boolean;
    error?: string;
    paused: boolean;
    toggleIsVideoPaused: (flag: boolean) => void;
    toggleIsVideoDownloaded: (flag: boolean) => void;
}

const styles = StyleSheet.create({
    container: {
        height: Layout.window.width * (9 / 16),
        width: Layout.window.width,
        backgroundColor: 'black',
    },
    fullscreenVideoContainer: {
        height: Layout.window.width,
        width: Layout.window.height,
        backgroundColor: 'black',
    },
    text: {
        marginTop: 30,
        marginHorizontal: 20,
        fontSize: 15,
        textAlign: 'justify',
    },
    fullscreenButton: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        paddingRight: 10,
    },
    controlOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000000c4',
        justifyContent: 'space-between',
    },
    controlButton: {
        position: 'absolute',
        left: 20,
        bottom: 10,
        backgroundColor: '#232323',
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 12,
        height: 12,
        tintColor: 'white',
    },
    downloadIcon: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        tintColor: 'white',
        width: 10,
        height: 10,
    },
});

const downloadConfig = {
    fileCache: true,
    appendExt: 'mp4',
};

const AndroidIosVideoPlayer: React.FC<IAndroidIosVideoPlayerProps> = ({
    videoId,
    cached,
    isPremiumUser,
    playUrl,
    downloadData,
    loading,
    error = null,
    paused,
    toggleIsVideoPaused,
    toggleIsVideoDownloaded,
}) => {
    // turn off the video downloading
    // eslint-disable-next-line
    isPremiumUser = false;

    const savePath = `${RNFetchBlob.fs.dirs.DocumentDir}/videos/${videoId}.mp4`;
    const fullscreen: boolean = useSelector(
        // @ts-ignore
        state => state.android_player.fullscreen,
    );
    const playerRef = useRef();
    const dispatch = useDispatch();
    const [appStatePause, setAppStatePause] = useState(
        AppState.currentState !== 'active',
    );
    const [appState, setAppState] = useState(AppState.currentState);
    const [cacheUrl, setCacheUrl] = useState('');

    const PlayIcon = useImage('Play');
    const PauseIcon = useImage('Pause');
    const DownloadIcon = useImage('Download');
    const wifiStatus = useRef(null);
    const downloadRef = useRef(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

    useEffect(() => {
        if (cached) {
            setCacheUrl(`file://${savePath}`);
        }
    }, [cached]);

    const handleFullscreen = useCallback(
        isFullscreen => {
            dispatch(updateFullscreen(isFullscreen));
        },
        [dispatch],
    );

    const appStateHandler = useCallback(
        next => {
            if (appState === 'background' && next === 'active') {
                setAppStatePause(true);
            }
            setAppState(next);
        },
        [appState],
    );

    const handleOrientation = useCallback(
        orientation => {
            if (orientation === 'LANDSCAPE') {
                handleFullscreen(true);
                StatusBar.setHidden(true);
            } else {
                handleFullscreen(false);
                StatusBar.setHidden(false);
            }
        },
        [handleFullscreen],
    );

    const handlePausePlay = useCallback(
        paused => {
            if (!downloadRef.current && !paused && isPremiumUser && !cached) {
                if (
                    wifiStatus.current?.isWifiEnabled ||
                    (wifiStatus.current?.type === 'wifi' &&
                        wifiStatus.current?.isConnected)
                ) {
                    downloadVideo();
                } else {
                    createDownloadAlert();
                }
            }
            if (toggleIsVideoPaused) {
                toggleIsVideoPaused(paused);
            }
        },
        [isPremiumUser, cached, wifiStatus],
    );

    const downloadVideo = async () => {
        try {
            downloadRef.current = true;
            const config = {
                ...downloadConfig,
                path: savePath,
            };
            const res = await RNFetchBlob.config(config).fetch(
                'GET',
                downloadData.link,
            );
            const compressUri = await RNVideoCompress.compress(
                `file://${res.path()}`,
                {
                    width: downloadData.width / 2,
                    height: downloadData.height / 2,
                    bitrate: 300000,
                },
            ).progress(value => {});
            await RNFetchBlob.fs.unlink(res.path());
            // if ios platform, compressUri has 'file://' prefix so we'd need to remove it.
            const copyPath =
                Platform.OS === 'ios' ? compressUri.substring(7) : compressUri;
            await RNFetchBlob.fs.cp(copyPath, res.path());
            await RNFetchBlob.fs.unlink(copyPath);
            setCacheUrl(`file://${savePath}`);
            toggleIsVideoDownloaded(true);
            downloadRef.current = false;
        } catch (error) {
            downloadRef.current = false;
        }
    };

    const createDownloadAlert = () =>
        Alert.alert(
            'This is a large video',
            "You're not connected to WiFi. Are you sure you want to download this video using data?",
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Download',
                    onPress: () => {
                        if (
                            wifiStatus.current?.isConnected &&
                            wifiStatus.current?.isInternetReachable
                        ) {
                            downloadVideo();
                        }
                    },
                },
            ],
        );

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            wifiStatus.current = state;
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        setAppStatePause(paused);
    }, [paused]);

    useEffect(() => {
        AppState.addEventListener('change', appStateHandler);
        return () => {
            AppState.removeEventListener('change', appStateHandler);
        };
    }, [appStateHandler]);

    useEffect(() => {
        Orientation.addOrientationListener(handleOrientation);
        return () => {
            Orientation.lockToPortrait();
            Orientation.removeOrientationListener(handleOrientation);
        };
    }, [handleOrientation]);

    useEffect(() => {
        if (loading) {
            return;
        }
        if (fullscreen) {
            Orientation.lockToLandscape();
            Orientation.unlockAllOrientations();
        } else {
            Orientation.lockToPortrait();
            Orientation.unlockAllOrientations();
        }
    }, [fullscreen, loading]);

    if (loading || error) {
        return <VideoLoadingOverlay loading={loading} error={error} />;
    }

    const handleVideoPlayerLoad = () => {
        if (playerRef?.current) {
            playerRef.current.player.seekPanResponder.panHandlers.onResponderTerminationRequest =
                evt => {
                    return false;
                };
            const nativeOnRespondMoveMethod =
                playerRef.current.player.seekPanResponder.panHandlers
                    .onResponderStart;
            playerRef.current.player.seekPanResponder.panHandlers.onResponderStart =
                evt => {
                    dispatch(updateVideoGestureLockToggle(true));
                    nativeOnRespondMoveMethod(evt);
                };

            const nativeOnRespondEndMethod =
                playerRef.current.player.seekPanResponder.panHandlers
                    .onResponderEnd;
            playerRef.current.player.seekPanResponder.panHandlers.onResponderEnd =
                evt => {
                    dispatch(updateVideoGestureLockToggle(false));
                    nativeOnRespondEndMethod(evt);
                };
        }
        setVideoLoaded(true);
    };

    if (!cached && !playUrl) {
        return null;
    }

    return (
        <View
            style={
                fullscreen ? styles.fullscreenVideoContainer : styles.container
            }>
            <Video
                ref={playerRef}
                onEnterFullscreen={() => handleFullscreen(true)}
                onExitFullscreen={() => handleFullscreen(false)}
                source={{
                    uri: isPremiumUser && cached ? cacheUrl : playUrl,
                }}
                toggleResizeModeOnFullscreen={false}
                resizeMode="stretch"
                disableVolume
                disableBack
                disablePlayPause
                onPlay={() => handlePausePlay(false)}
                onPause={() => handlePausePlay(true)}
                onLoad={handleVideoPlayerLoad}
                paused={appStatePause}
            />
            <TouchableOpacity
                style={styles.controlButton}
                disabled={!videoLoaded}
                onPress={() => handlePausePlay(!paused)}>
                <Image
                    source={!appStatePause ? PauseIcon : PlayIcon}
                    style={styles.icon}
                />
                {downloadRef.current && (
                    <Image style={styles.downloadIcon} source={DownloadIcon} />
                )}
            </TouchableOpacity>
        </View>
    );
};

export default VimeoPlayerHOC(AndroidIosVideoPlayer);
