import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  ViewPropTypes,
  AppState,
} from 'react-native';
import PropTypes from 'prop-types';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import HlsPlayerHOC from './HlsPlayerHOC';
import {RegularText} from '../layout';

const HlsPlayer = ({
  playUrl,
  style,
  loading,
  fullscreen,
  paused,
  error,
  ...rest
}) => {
  const videoRef = useRef();
  const [appStatePause, setAppStatePause] = useState(
    AppState.currentState !== 'active',
  );

  const [showControls, setShowControls] = useState(true);
  const [appState, setAppState] = useState(AppState.currentState);
  const appStateHandler = useCallback(
    (next) => {
      if (appState === 'background' && next === 'active') {
        setAppStatePause(true);
      }
      setAppState(next);
    },
    [appState],
  );
  const onPlaybackRateChange = useCallback(
    (event) => {
      if (event.playbackRate && appStatePause) {
        setAppStatePause(false);
        if (typeof rest.onPlaybackRateChange === 'function') {
          rest.onPlaybackRateChange(event);
        }
      }
    },
    [appStatePause],
  );

  useEffect(() => {
    AppState.addEventListener('change', appStateHandler);
    return () => {
      AppState.removeEventListener('change', appStateHandler);
    };
  }, [appStateHandler]);

  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);

    return () => {
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, []);

  const handleOrientation = (orientation) => {
    if (orientation === 'LANDSCAPE') {
      setShowControls(false);
      videoRef?.current?.presentFullscreenPlayer();
    } else {
      // setShowControls(true);
      videoRef?.current?.dismissFullscreenPlayer();
    }
  };

  // let overlay;
  // if (loading || error) {
  //   overlay = (
  //     <View style={styles.overlay}>
  //       {error && <RegularText style={styles.error}>{error}</RegularText>}
  //       {loading && <ActivityIndicator style={styles.loading} size="large" />}
  //     </View>
  //   );
  // }

  // let player;

  // const {controls, restTemp} = rest; // exclude controls, controls prop is triggering the error

  // if (playUrl) {
  //   player = (
  //     <Video
  //       // {...restTemp}
  //       controls={false}
  //       ref={showControls}
  //       ignoreSilentSwitch={'ignore'}
  //       source={{uri: playUrl}}
  //       style={styles.player}
  //       //   paused={appStatePause || paused}
  //       // onPlaybackRateChange={onPlaybackRateChange}
  //     />
  //   );
  // }

  return (
    <View style={[style.container, style]}>
      {/* {overlay} */}
      {playUrl && (
        <Video
          // {...restTemp}
          controls={showControls}
          ref={videoRef}
          ignoreSilentSwitch={'ignore'}
          source={{uri: playUrl}}
          style={styles.player}
          //   paused={appStatePause || paused}
          // onPlaybackRateChange={onPlaybackRateChange}
        />
      )}
    </View>
  );
};

HlsPlayer.propTypes = {
  playUrl: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  fullscreen: PropTypes.bool,
  paused: PropTypes.bool,
  style: ViewPropTypes.style,
  error: PropTypes.string,
};

HlsPlayer.defaultProps = {
  playUrl: null,
  style: {},
  error: null,
  paused: false,
  fullscreen: false,
};

export default HlsPlayerHOC(HlsPlayer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 1,
  },
  player: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  loading: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  error: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});
