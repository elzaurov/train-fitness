/* eslint-disable react/no-typos */
import React from 'react';
import PropTypes from 'prop-types';
import {View, ViewPropTypes, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RegularText} from '../../layout';
import {Colors} from '../../../constants';

const BadgeEarning = ({badge, title, style}) => (
  <View style={[styles.container, style]}>
    <FastImage style={styles.badge} source={{uri: badge}} />
    <RegularText style={style.title}>{title}</RegularText>
  </View>
);

BadgeEarning.propTypes = {
  badge: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
};

BadgeEarning.defaultProps = {
  style: {},
};

export default BadgeEarning;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  badge: {
    flex: 1,
    resizeMode: 'contain',
  },
  title: {
    textAlign: 'center',
    color: Colors.silver,
  },
});
