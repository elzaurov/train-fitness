import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Dimensions, View, ActivityIndicator} from 'react-native';
import {RegularText} from '../layout';

const VideoLoadingOverlay = ({loading, error}) => {
  return (
    <View style={styles.container}>
      {error && <RegularText style={styles.error}>{error}</RegularText>}
      {loading && <ActivityIndicator style={styles.loading} size="large" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').width * (9 / 16),
    width: Dimensions.get('window').width,
    backgroundColor: 'black',
  },
});

VideoLoadingOverlay.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

VideoLoadingOverlay.defaultProps = {
  error: null,
};

export default VideoLoadingOverlay;
