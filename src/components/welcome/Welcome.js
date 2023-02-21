import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {Colors} from '../../constants';
import WelcomeImages from './WelcomeImages';
import WelcomeLoginLink from './WelcomeLoginLink';
import WelcomePrivacyPolicy from './WelcomePrivacyPolicy';
import WelcomeSlogan from './WelcomeSlogan';
import WelcomeSocialButtons from './WelcomeSocialButtons';

const WelcomeScreen = () => (
  <View style={styles.container}>
    <WelcomeImages style={styles.images} />
    <SafeAreaView style={styles.safeArea}>
      <WelcomeSlogan style={styles.slogan} />
      <WelcomeSocialButtons style={styles.buttons} />
      <WelcomeLoginLink />
      <WelcomePrivacyPolicy />
    </SafeAreaView>
  </View>
);

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  images: {
    top: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
    aspectRatio: 3 / 5,
  },
  safeArea: {
    flex: 1,
  },
  slogan: {
    flex: 1,
  },
});
