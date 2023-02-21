import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ViewPropTypes} from 'react-native';
import {VideoPlayer} from '../../player';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const IntroductionVideo = ({style}) => {
  const navigation = useNavigation();
  const [disposed, setDisposed] = useState(false);
  const {introduction_video_id: videoId} = useSelector(
    (state) => state.remoteConfigs,
  );

  useEffect(() => {
    const focusUnsub = navigation.addListener('focus', () => {
      setDisposed(false);
    });

    const blurUnsub = navigation.addListener('blur', () => {
      setDisposed(true);
    });

    return () => {
      focusUnsub();
      blurUnsub();
    };
  }, [navigation]);

  return videoId ? (
    <View style={[styles.container, style]}>
      {!disposed ? (
        <VideoPlayer style={styles.player} vimeoVideoId={videoId} controls />
      ) : null}
    </View>
  ) : null;
};

IntroductionVideo.propTypes = {
  style: ViewPropTypes.style,
};

IntroductionVideo.defaultProps = {
  style: {},
};

export default IntroductionVideo;

const styles = StyleSheet.create({
  container: {
    aspectRatio: 16 / 9,
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: 'red',
  },
  player: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
