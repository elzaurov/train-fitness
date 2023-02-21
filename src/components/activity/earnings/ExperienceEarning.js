import React from 'react';
import PropTypes from 'prop-types';
import {View, ViewPropTypes, StyleSheet} from 'react-native';
import {RegularText} from '../../layout';
import {Colors} from '../../../constants';

const ExperienceEarning = ({experience, style}) => (
  <View style={[styles.container, style]}>
    <RegularText style={styles.experience}>+{experience}</RegularText>
    <RegularText style={styles.caption}>Experience</RegularText>
  </View>
);

ExperienceEarning.propTypes = {
  experience: PropTypes.number.isRequired,
  style: ViewPropTypes.style,
};

ExperienceEarning.defaultProps = {
  style: {},
};

export default ExperienceEarning;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.green,
    borderRadius: 16,
    justifyContent: 'center',
  },
  experience: {
    fontSize: 24,
    color: Colors.green,
    textAlign: 'center',
  },
  caption: {
    color: Colors.green,
    textAlign: 'center',
    fontSize: 12,
  },
});
