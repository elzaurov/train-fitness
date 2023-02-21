import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import {Colors} from '../../constants';

const AppContainer = ({children}) => (
  <View style={styles.container}>
    {Platform.OS === 'ios' ? (
        <StatusBar barStyle="light-content" />
    ) : (
        <StatusBar
            backgroundColor={Colors.mineShaft}
            barStyle="light-content"
        />
    )}
    {children}
  </View>
);

AppContainer.propTypes = {
  children: PropTypes.any.isRequired,
};

export default AppContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
