import React from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'react-native-collapsible';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CollapsibleViewHOC from './CollapsibleViewHOC';
import RegularText from './RegularText';
import {Colors, Layout} from '../../constants';

const SimpleCollapsibleView = ({
  buttonStyle,
  collapsibleStyle,
  children,
  isCollapsed,
  style,
  title,
  titleStyle,
  onCollapse,
}) => (
  <View style={style}>
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onCollapse}>
      <RegularText style={[styles.title, titleStyle]}>{title}</RegularText>
      <MaterialCommunityIcons
        name={isCollapsed ? 'chevron-down' : 'chevron-up'}
        size={16}
        color={Colors.white}
      />
    </TouchableOpacity>
    <Collapsible
      style={[styles.collapsible, collapsibleStyle]}
      collapsed={isCollapsed}>
      {children}
    </Collapsible>
  </View>
);

SimpleCollapsibleView.propTypes = {
  buttonStyle: PropTypes.any,
  collapsibleStyle: PropTypes.any,
  children: PropTypes.any,
  isCollapsed: PropTypes.bool.isRequired,
  style: PropTypes.any,
  title: PropTypes.string,
  titleStyle: PropTypes.any,
  onCollapse: PropTypes.func.isRequired,
};

SimpleCollapsibleView.defaultProps = {
  buttonStyle: {},
  collapsibleStyle: {},
  children: undefined,
  style: {},
  title: '',
  titleStyle: {},
};

export default CollapsibleViewHOC(SimpleCollapsibleView);

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: Layout.window.width - (Layout.padding * 2),
    paddingBottom: Layout.padding / 2,
  },
  title: {},
  collapsible: {
    paddingBottom: Layout.padding / 2,
  },
});
