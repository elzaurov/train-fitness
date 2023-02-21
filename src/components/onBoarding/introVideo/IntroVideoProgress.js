import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from 'react-native-progress/Bar';
import {StyleSheet} from 'react-native';
import {Colors, Layout} from '../../../constants';

const IntroVideoProgress = ({progress}) => (
  <ProgressBar
    style={styles.progressBar}
    width={Layout.window.width}
    progress={progress}
    color={Colors.secondary}
    unfilledColor={Colors.gray3}
  />
);

IntroVideoProgress.propTypes = {
  progress: PropTypes.number,
};

IntroVideoProgress.defaultProps = {
  progress: 0,
};

export default IntroVideoProgress;

const styles = StyleSheet.create({
  progressBar: {
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: Colors.gray3,
    width: '100%',
  },
  progressBarFill: {
    backgroundColor: Colors.secondary,
  },
});
