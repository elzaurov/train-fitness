import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {RegularText} from '../layout';
import {Colors} from '../../constants';

const Placeholder = ({text, children}) => (
  <View style={styles.container}>
    <RegularText style={styles.text}>{text}</RegularText>
    {children}
  </View>
);

Placeholder.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Placeholder.defaultProps = {
  children: null,
};

export default Placeholder;

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    marginBottom: 32,
  },
  text: {
    marginBottom: 8,
    textAlign: 'center',
    color: Colors.dustyGray,
    fontSize: 24,
  },
});
