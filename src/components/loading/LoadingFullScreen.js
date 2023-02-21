import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Colors} from '../../constants';
import {Logo} from '../svg';

const LoadingFullScreen = ({visible, hideImage}) => (
  <View style={[styles.container]}>
    {!hideImage && <Logo style={styles.logo} height={128} />}
    <ActivityIndicator
      size="large"
      color={Colors.white}
      style={styles.container}
    />
  </View>
);

LoadingFullScreen.propTypes = {
  hideImage: PropTypes.bool,
  visible: PropTypes.bool,
};

LoadingFullScreen.defaultProps = {
  hideImage: false,
  visible: false,
};

export default LoadingFullScreen;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.background2,
  },
  logo: {
    marginBottom: 32,
  },
});
