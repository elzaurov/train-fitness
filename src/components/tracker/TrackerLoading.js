import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Colors, Layout} from '../../constants';
import {RegularText} from '../layout';

const TrackerLoading = ({isUpgrading}) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={Colors.white} />
    {isUpgrading === true && (
      <RegularText style={styles.text}>Upgrading your schedule...</RegularText>
    )}
  </View>
);

TrackerLoading.propTypes = {
  isUpgrading: PropTypes.bool,
};

TrackerLoading.defaultProps = {
  isUpgrading: false,
};

export default TrackerLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Layout.window.height - 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  text: {
    marginTop: 8,
  },
});
