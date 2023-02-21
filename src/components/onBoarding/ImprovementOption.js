import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {RegularText} from '../layout';
import {Layout, Colors} from '../../constants';

const ImprovementOption = ({text, isSelected, onOptionSelect}) => (
  <TouchableOpacity
    onPress={onOptionSelect}
    style={[
      styles.container,
      {
        backgroundColor: isSelected ? Colors.gray1 : Colors.gray2,
      },
    ]}>
    <RegularText
      style={[
        styles.optionText,
        {
          color: isSelected ? Colors.secondary2 : Colors.gray1,
        },
      ]}>
      {text}
    </RegularText>
  </TouchableOpacity>
);

ImprovementOption.propTypes = {
  text: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onOptionSelect: PropTypes.func.isRequired,
};

ImprovementOption.defaultProps = {
  isSelected: false,
};

export default ImprovementOption;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray2,
    margin: 6,
    width: Layout.window.width / 2 - 35,
    height: (Layout.window.width / 2) * 0.7,
    borderRadius: 5,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
