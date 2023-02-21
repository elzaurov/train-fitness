/* eslint-disable no-mixed-operators */
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RegularText, BoldText} from '../layout';
import {Layout} from '../../constants';

const Badge = ({badge}) => (
  <View style={styles.container}>
    <FastImage style={styles.image} source={{uri: badge.badge}} />
    <View style={styles.wrapper}>
      <BoldText style={styles.name}>{badge.title}</BoldText>
      <RegularText style={styles.description}>{badge.description}</RegularText>
    </View>
  </View>
);

Badge.propTypes = {
  badge: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Badge;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: Layout.window.width,
    marginTop: Layout.margin / 2,
  },
  image: {
    width: 96,
    height: 96,
    marginRight: Layout.margin,
  },
  description: {
    fontSize: 12,
  },
  name: {
    marginBottom: Layout.margin / 2,
  },
  wrapper: {
    width: Layout.window.width - (96 + Layout.margin * 3),
  },
});
