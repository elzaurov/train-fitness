import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, ViewPropTypes, StyleSheet, View} from 'react-native';
import CollapsibleViewHOC from './CollapsibleViewHOC';
import RegularText from './RegularText';
import {Layout} from '../../constants';

const CollapsibleTextView = ({
  isCollapsed,
  noPadding,
  onCollapse,
  text,
  style,
  textStyle,
  numberOfLines,
}) => {
  let truncProps = {};

  if (isCollapsed) {
    truncProps = {
      numberOfLines,
      ellipsizeMode: 'tail',
    };
  }

  return (
    <View
      style={[
        styles.container,
        style,
        {padding: noPadding ? 0 : Layout.padding},
      ]}>
      <TouchableOpacity onPress={onCollapse}>
        <RegularText style={[styles.text, textStyle]} {...truncProps}>
          {text}
        </RegularText>
      </TouchableOpacity>
    </View>
  );
};

CollapsibleTextView.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  onCollapse: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  numberOfLines: PropTypes.number,
  style: ViewPropTypes.style,
  buttonStyle: PropTypes.objectOf(PropTypes.any),
  textStyle: PropTypes.objectOf(PropTypes.any),
};

CollapsibleTextView.defaultProps = {
  numberOfLines: 3,
  style: {},
  buttonStyle: {},
  textStyle: {},
};

export default CollapsibleViewHOC(CollapsibleTextView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    flex: 1,
  },
});
