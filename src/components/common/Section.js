import React from 'react';
import PropTypes from 'prop-types';
import {View, ViewPropTypes, StyleSheet} from 'react-native';
import {TitleText} from '../layout';
import {Layout, Colors} from '../../constants';

const Section = ({title, children, style, titleStyle, noPadding, ...rest}) => (
  <View
    style={[styles.container, style, {padding: noPadding ? 0 : Layout.padding}]}
    {...rest}>
    <TitleText
      style={[
        styles.title,
        titleStyle,
        {paddingLeft: !noPadding ? 0 : Layout.padding},
      ]}>
      {title}
    </TitleText>
    {children}
  </View>
);

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  style: ViewPropTypes.style,
  titleStyle: ViewPropTypes.style,
  noPadding: PropTypes.bool,
};

Section.defaultProps = {
  title: '',
  children: null,
  style: {},
  titleStyle: {},
  noPadding: false,
};

export default Section;

const styles = StyleSheet.create({
  container: {
    // padding: Layout.padding,
    // flex: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: Colors.silver,
  },
});
