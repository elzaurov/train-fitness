import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ViewPropTypes} from 'react-native';
import MindActivityIcon from '../svg/MindActivityIcon';
import BodyActivityIcon from '../svg/BodyActvityIcon';
import {Colors} from '../../constants';

const BADGE_SIZE = 48;
const ICON_SIZE = BADGE_SIZE / 3;

const ActivityTypeBadge = ({type, style}) => (
  <View style={[styles.container, style]}>
    <View
      style={[
        styles.triangle,
        {
          backgroundColor: type === 'mind' ? Colors.blue : Colors.tamarillo,
        },
      ]}
    />
    <View style={styles.iconContainer}>
      {type === 'mind' ? (
        <MindActivityIcon size={ICON_SIZE} />
      ) : (
        <BodyActivityIcon size={ICON_SIZE} />
      )}
    </View>
  </View>
);

ActivityTypeBadge.propTypes = {
  type: PropTypes.oneOf(['mind', 'body']).isRequired,
  style: ViewPropTypes.style,
};

ActivityTypeBadge.defaultProps = {
  style: {},
};

export default ActivityTypeBadge;

const TRIANGLE_SIZE = BADGE_SIZE * Math.sqrt(2);

const styles = StyleSheet.create({
  container: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    overflow: 'hidden',
  },
  iconContainer: {
    position: 'absolute',
    width: BADGE_SIZE / 2,
    height: BADGE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    top: BADGE_SIZE * 0.1, // visual fix
  },
  triangle: {
    position: 'absolute',
    top: -TRIANGLE_SIZE / 2,
    left: -TRIANGLE_SIZE / 2,
    transform: [{rotate: '45deg'}],
    width: TRIANGLE_SIZE,
    height: TRIANGLE_SIZE,
  },
});
