import React from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, ViewPropTypes} from 'react-native';
import {Colors} from '../../constants';
import SafeAreaHOC from './SafeAreaHOC';

const SafeArea = ({color, style, children}) => (
  <SafeAreaView
    style={[
      {
        backgroundColor: color,
      },
      style,
    ]}>
    {children}
  </SafeAreaView>
);

SafeArea.propTypes = {
  color: PropTypes.string,
  style: ViewPropTypes.style,
  children: PropTypes.node,
};

SafeArea.defaultProps = {
  style: {},
  children: null,
  color: Colors.mineShaft,
};

export default SafeAreaHOC(SafeArea);
