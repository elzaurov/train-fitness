import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ViewPropTypes} from 'react-native';
import {TitleText} from '../layout';
import {Layout} from '../../constants';
import {RegularText} from '../layout';

const BrowseSection = ({children, title, description, icon, style, action}) => (
  <View style={[styles.container, style]}>
    <View style={styles.header}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <TitleText style={styles.title}>{title}</TitleText>
      {action}
    </View>
    <View style={styles.subHeader}>
      <RegularText>{description}</RegularText>
    </View>
    {children}
  </View>
);

BrowseSection.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.node,
  style: ViewPropTypes.style,
  action: PropTypes.func,
};

BrowseSection.defaultProps = {
  children: null,
  title: null,
  description: null,
  icon: null,
  style: {},
  action: null,
};

export default BrowseSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    marginBottom: 24,
  },
  header: {
    paddingLeft: Layout.padding,
    paddingRight: Layout.padding,
    paddingBottom: Layout.padding / 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subHeader: {
    paddingLeft: Layout.padding,
    paddingRight: Layout.padding,
    marginBottom: 16,
  },
  title: {
    flex: 1,
    fontSize: 18,
    marginBottom: 0,
    padding: 0,
  },
  icon: {
    marginRight: 16,
  },
});
