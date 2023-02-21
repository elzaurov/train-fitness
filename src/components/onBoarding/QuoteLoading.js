import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors, Layout} from '../../constants';

const QuoteLoading = () => <View style={styles.loading} />;

export default QuoteLoading;

const styles = StyleSheet.create({
  loading: {
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: Colors.loadingOverlay,
    borderRadius: 2,
    marginBottom: Layout.margin,
    marginRight: Layout.margin,
    height: Layout.window.width - 2 * Layout.padding,
    width: Layout.window.width - 2 * Layout.padding,
  },
});
