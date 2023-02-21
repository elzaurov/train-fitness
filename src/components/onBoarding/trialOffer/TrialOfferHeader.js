import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Layout} from '../../../constants';
import {RegularText} from '../../layout';
import PropTypes from 'prop-types';

const TrialOfferHeader = ({text}) => (
  <View style={styles.container}>
    <RegularText style={styles.text}>{text}</RegularText>
  </View>
);

TrialOfferHeader.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TrialOfferHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingRight: Layout.padding * 2,
    paddingLeft: Layout.padding * 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    margin: 2,
  },
});
