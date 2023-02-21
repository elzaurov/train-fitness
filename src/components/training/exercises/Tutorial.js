import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RegularText} from '../../layout';
import {Layout} from '../../../constants';

const Tutorial = () => (
  <View style={styles.container}>
    <RegularText style={styles.text}>
      Touch START when you are ready to begin your drill.
    </RegularText>
    <RegularText style={[styles.text, styles.marginTop]}>
      You have 5 seconds to get ready. Make sure to rest between sets.
    </RegularText>
  </View>
);

export default Tutorial;

const styles = StyleSheet.create({
  container: {
    marginTop: Layout.window.height * 0.2,
    padding: 1.5 * Layout.padding,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  text: {
    marginTop: 15,
    fontSize: 25,
    textAlign: 'center',
    lineHeight: 40,
  },
  marginTop: {
    marginTop: 15,
  },
});
