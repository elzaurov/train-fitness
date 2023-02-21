import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {Colors, Layout} from '../../constants';

const ScreenView = ({style, children, ...props}) => (
  <View style={[styles.container, style]} {...props}>
    {children}
  </View>
);

ScreenView.propTypes = {
  style: PropTypes.any,
  children: PropTypes.any,
};

ScreenView.defaultProps = {
  style: {},
  children: undefined,
};

export default ScreenView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Layout.padding,
    backgroundColor: Colors.background,
  },
});
