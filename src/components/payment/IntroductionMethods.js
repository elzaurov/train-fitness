import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {RegularText, BoldText} from '../layout';
import {Layout, Colors} from '../../constants';

const IntroductionMethods = ({items, selectedItem, onItemSelect, disabled}) => (
  <View style={styles.container}>
    <BoldText style={styles.title}>How did you find us?</BoldText>
    {items.map((item, idx) => (
      <TouchableOpacity
        disabled={disabled}
        style={[styles.item, item === selectedItem && styles.selectedItem]}
        onPress={() => onItemSelect(item)}>
        <RegularText>{item}</RegularText>
      </TouchableOpacity>
    ))}
  </View>
);

IntroductionMethods.propTypes = {
  items: PropTypes.array.isRequired,
  selectedItem: PropTypes.string,
  onItemSelect: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

IntroductionMethods.defaultProps = {
  selectedItem: null,
};

export default IntroductionMethods;

const styles = StyleSheet.create({
  container: {
    padding: Layout.padding,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  item: {
    backgroundColor: Colors.mineShaft,
    paddingLeft: Layout.padding,
    paddingRight: Layout.padding,
    paddingTop: Layout.padding / 2,
    paddingBottom: Layout.padding / 2,
    marginBottom: 8,
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: Colors.mineShaft,
  },
  selectedItem: {
    backgroundColor: Colors.emperor,
    borderLeftColor: Colors.secondary,
  },
});
