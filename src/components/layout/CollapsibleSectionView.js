import React from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'react-native-collapsible';
import {SectionList, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CollapsibleSectionViewHOC from './CollapsibleSectionViewHOC';
import RegularText from './RegularText';
import {Colors, Layout} from '../../constants';

const CollapsibleSectionView = ({
  buttonStyle,
  collapsibleStyle,
  isCollapsed,
  sections,
  titleStyle,
  onCollapse,
}) => (
  <SectionList
    style={styles.list}
    stickySectionHeadersEnabled={true}
    renderSectionHeader={({section: {title, key}}) => (
      <TouchableOpacity
        style={[
          styles.button,
          isCollapsed[key] ? styles.collapsed : {},
          buttonStyle,
        ]}
        onPress={() => onCollapse(key)}>
        <RegularText style={[styles.title, titleStyle]}>
          {title.toUpperCase()}
        </RegularText>
        <MaterialCommunityIcons
          name={isCollapsed[key] ? 'chevron-down' : 'chevron-up'}
          size={24}
          color={Colors.white}
        />
      </TouchableOpacity>
    )}
    sections={sections}
    renderItem={({item: {Component, props}, section: {key}}) => (
      <Collapsible
        style={[
          styles.collapsible,
          isCollapsed[key] ? {} : styles.collapsed,
          collapsibleStyle,
        ]}
        collapsed={!!isCollapsed[key]}>
        <Component {...props} />
      </Collapsible>
    )}
    keyExtractor={(item, index) => index}
  />
);

CollapsibleSectionView.propTypes = {
  buttonStyle: PropTypes.any,
  collapsibleStyle: PropTypes.any,
  isCollapsed: PropTypes.objectOf(PropTypes.bool).isRequired,
  titleStyle: PropTypes.any,
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCollapse: PropTypes.func.isRequired,
};

CollapsibleSectionView.defaultProps = {
  buttonStyle: {},
  collapsibleStyle: {},
  titleStyle: {},
};

export default CollapsibleSectionViewHOC(CollapsibleSectionView);

const styles = StyleSheet.create({
  list: {
    backgroundColor: Colors.background,
  },
  button: {
    backgroundColor: Colors.background,
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
