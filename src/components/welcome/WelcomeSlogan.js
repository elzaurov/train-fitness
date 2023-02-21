import React from 'react';
import {View, StyleSheet, ViewPropTypes} from 'react-native';
import {Layout} from '../../constants';
import {RegularText} from '../layout';
import {Logo} from '../svg';

const WelcomeSlogan = ({style}) => (
  <View style={[styles.container, style]}>
    <Logo style={styles.logo} height={72} />
    <View style={styles.textContainer}>
      <RegularText style={styles.text}>TRAIN LIKE A PROFESSIONAL,</RegularText>
      <RegularText style={styles.text}>ANYTIME, ANYWHERE</RegularText>
    </View>
  </View>
);

WelcomeSlogan.propTypes = {
  style: ViewPropTypes.style,
};

WelcomeSlogan.defaultProps = {
  style: null,
};

export default WelcomeSlogan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Layout.padding,
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
