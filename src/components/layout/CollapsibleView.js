import React from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'react-native-collapsible';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CollapsibleViewHOC from './CollapsibleViewHOC';
import RegularText from './RegularText';
import {Colors, Layout} from '../../constants';

const CollapsibleView = ({
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
    <TouchableOpacity
      style={[styles.button, isCollapsed ? styles.collapsed : {}, buttonStyle]}
      onPress={onCollapse}>
      <RegularText style={[styles.title, titleStyle]}>
        {title.toUpperCase()}
      </RegularText>
      <MaterialCommunityIcons
        name={isCollapsed ? 'chevron-down' : 'chevron-up'}
        size={24}
        color={Colors.white}
      />
    </TouchableOpacity>
    <Collapsible
      style={[
        styles.collapsible,
        isCollapsed ? {} : styles.collapsed,
        collapsibleStyle,
      ]}
      collapsed={isCollapsed}>
      {children}
    </Collapsible>
  </View>
);

CollapsibleView.propTypes = {
  buttonStyle: PropTypes.any,
  collapsibleStyle: PropTypes.any,
  children: PropTypes.any,
  isCollapsed: PropTypes.bool.isRequired,
  style: PropTypes.any,
  title: PropTypes.string,
  titleStyle: PropTypes.any,
  onCollapse: PropTypes.func.isRequired,
};

CollapsibleView.defaultProps = {
  buttonStyle: {},
  collapsibleStyle: {},
  children: undefined,
  style: {},
  title: '',
  titleStyle: {},
};

export default CollapsibleViewHOC(CollapsibleView);

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: Layout.window.width - (Layout.padding * 2),
    padding: Layout.padding,
  },
  title: {
    fontSize: 18,
  },
  collapsed: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.separator,
  },
  collapsible: {
    padding: Layout.padding,
  },
});
