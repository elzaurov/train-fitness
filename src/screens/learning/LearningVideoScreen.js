import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { showUpgradeModal } from '../../actions';

import { useDispatch, useSelector } from 'react-redux';

import {
  LoadingFullScreen,
  LearningVideo,
  ActivityVideo,
} from '../../components';
import { Colors } from '../../constants';
import LearningVideoScreenHOC from './LearningVideoScreenHOC';

const LearningVideoScreen = ({
  navigation,
  loading,
  learningVideo,
  videoPath,
}) => {

  const dispatch = useDispatch();
  const currentPlan = useSelector((state) => state.plan);

  if (loading) {
    return <LoadingFullScreen secondary hideImage />;
  }

  if (videoPath === 'game-brain' && currentPlan.isFree === true) {
    dispatch(showUpgradeModal());
  }

  return (
    <View style={styles.container}>
      <LearningVideo
        navigation={navigation}
        learningVideo={learningVideo}
        videoPath={videoPath}
      />
    </View>
  );
};

LearningVideoScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  loading: PropTypes.bool.isRequired,
  learningVideo: PropTypes.objectOf(PropTypes.any).isRequired,
  videoPath: PropTypes.string.isRequired,
};

export default LearningVideoScreenHOC(LearningVideoScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
