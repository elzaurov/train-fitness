/* eslint-disable no-mixed-operators */
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {RegularText, SafeArea} from '../layout';
import {Layout, Colors} from '../../constants';

const FooterRecomendations = ({isStripe, onGoPremium, onSkip}) => (
  <View style={styles.container}>
    {!isStripe && (
      <TouchableOpacity
        style={[styles.button, styles.goPremiumButton]}
        onPress={() => onGoPremium()}>
        <RegularText style={styles.goPremiumText}>GO PREMIUM</RegularText>
      </TouchableOpacity>
    )}
    <TouchableOpacity
      style={[styles.button, styles.skipButton]}
      onPress={() => onSkip()}>
      <RegularText style={styles.skipText}>
        SKIP AND EXPLORE THE APP
      </RegularText>
    </TouchableOpacity>
    <SafeArea color={Colors.gray3} />
  </View>
);

FooterRecomendations.propTypes = {
  isStripe: PropTypes.bool.isRequired,
  onGoPremium: PropTypes.func.isRequired,
  onSkip: PropTypes.func.isRequired,
};

export default FooterRecomendations;

const styles = StyleSheet.create({
  container: {
    flex: 0.23,
    backgroundColor: Colors.gray3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  skipButton: {
    width: Layout.window.width - 2 * Layout.padding - 2,
    flex: 0.42,
    borderWidth: 0.5,
    borderColor: Colors.white,
  },
  goPremiumButton: {
    width: Layout.window.width - 2 * Layout.padding,
    // height: 50,
    flex: 0.45,
    backgroundColor: Colors.black,
  },
  skipText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  goPremiumText: {
    color: Colors.seaBuckthorn,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
