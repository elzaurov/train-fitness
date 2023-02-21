import React from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Colors,
  Layout,
  ONBOARDING_BOTTOM_HEIGHT,
  ONBOARDING_GRADIENT_COLOR_TRANSPARENT,
  ONBOARDING_GRADIENT_COLOR_OPAQUE,
} from '../../constants';

const OnBoardingTemplate = ({bottomBar, children}) => (
  <View style={styles.container}>
    {children}
    {bottomBar ? (
      <View style={styles.bottomBar}>
        <LinearGradient
          colors={[
            ONBOARDING_GRADIENT_COLOR_TRANSPARENT,
            ONBOARDING_GRADIENT_COLOR_OPAQUE,
          ]}
          locations={[0, 1]}
          style={styles.gradient}
        />
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.bottomBarContent}>{bottomBar}</View>
        </SafeAreaView>
      </View>
    ) : null}
  </View>
);

OnBoardingTemplate.propTypes = {
  bottomBar: PropTypes.node,
  children: PropTypes.node,
};

OnBoardingTemplate.defaultProps = {
  bottomBar: null,
  children: null,
};

export default OnBoardingTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  bottomBarContent: {
    flex: 1,
    padding: Layout.padding,
    justifyContent: 'flex-end',
    height: ONBOARDING_BOTTOM_HEIGHT,
  },
  safeAreaContainer: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});
