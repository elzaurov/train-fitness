import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text} from 'react-native';
import {Timer} from '../../common';
import {Colors, Layout} from '../../../constants';

const Set = ({set, onUpdateSetDuration, onNextState}) => (
  <View style={styles.container}>
    <View style={styles.topContainer} />
    <Timer
      onUpdateSetDuration={onUpdateSetDuration}
      onNextState={onNextState}
    />
    <Text style={styles.setText}>SET {set}</Text>
  </View>
);

export default Set;

Set.propTypes = {
  set: PropTypes.number.isRequired,
  onUpdateSetDuration: PropTypes.func,
  onNextState: PropTypes.func.isRequired,
};

Set.defaultProps = {
  onUpdateSetDuration: null,
};

const styles = StyleSheet.create({
  container: {
    padding: 1.5 * Layout.padding,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  topContainer: {
    height: Layout.window.height * 0.19,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  setText: {
    fontSize: 50,
    fontWeight: '200',
    textAlign: 'center',
    color: Colors.secondary2,
  },
});
