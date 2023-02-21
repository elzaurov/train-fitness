import React from 'react';
import PropTypes from 'prop-types';
import {View, ViewPropTypes, StyleSheet} from 'react-native';
import {RegularText, TitleText} from '../../layout';
import {CircularProgressBar} from '../../common';
import {Colors} from '../../../constants';

const StatEarning = ({title, value, total, style}) => (
  <View style={[styles.container, style]}>
    {/* <CircularProgressBar value={Math.round((value * 100) / total)} /> */}
    <TitleText style={styles.value}>{`${Number(value) ? value : 0}`}</TitleText>
    <RegularText style={styles.title}>{title}</RegularText>
  </View>
);

StatEarning.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number.isRequired,
  total: PropTypes.number,
  style: ViewPropTypes.style,
};

StatEarning.defaultProps = {
  total: 100,
  title: '',
  style: {},
};

export default StatEarning;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  value: {
    textAlign: 'center',
    color: Colors.silver,
  },
  title: {
    textAlign: 'center',
  },
});
