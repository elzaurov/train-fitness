import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {SafeArea, RegularText} from '../layout';
import {Colors} from '../../constants';

const HeaderRecommendations = ({title, description}) => (
  <View style={styles.container}>
    <SafeArea color={Colors.gray3} />
    <RegularText style={styles.headerText1}>{title}</RegularText>
    <RegularText style={styles.headerText2}>{description}</RegularText>
  </View>
);

HeaderRecommendations.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default HeaderRecommendations;

const styles = StyleSheet.create({
  container: {
    flex: 0.18,
    backgroundColor: Colors.gray3,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerText1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    color: Colors.white,
  },
  headerText2: {
    fontSize: 14,
    marginBottom: 13,
    color: Colors.dustyGray,
  },
});
