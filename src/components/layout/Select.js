import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import {Colors, Layout} from '../../constants';

const Select = ({
  items,
  style,
  hideElement,
  selectStyle,
  selectTextStyle,
  optionTextStyle,
  ...props
}) => (
  <ModalSelector
    style={[styles.modal, style, hideElement && styles.hideElement]}
    selectStyle={[styles.select, selectStyle]}
    selectTextStyle={[styles.selectText, selectTextStyle]}
    optionTextStyle={[styles.optionText, optionTextStyle]}
    data={items}
    {...props}
  />
);

export default Select;

Select.propTypes = {
  style: PropTypes.any,
  selectStyle: PropTypes.any,
  selectTextStyle: PropTypes.any,
  optionTextStyle: PropTypes.any,
  hideElement: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Select.defaultProps = {
  hideElement: false,
  style: {},
  selectStyle: {},
  selectTextStyle: {},
  optionTextStyle: {},
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: Colors.emperor,
    width: Layout.window.width - 32,
    height: 40,
    borderRadius: 2,
    borderWidth: 0,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
  },
  hideElement: {
    width: 0,
    height: 0,
    overflow: 'hidden',
  },
  select: {
    borderWidth: 0,
  },
  selectText: {
    color: Colors.white,
    textAlign: 'left',
  },
  optionText: {
    color: Colors.primary,
  },
});
