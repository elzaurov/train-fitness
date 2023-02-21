import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {View, ViewPropTypes} from 'react-native';
import PremiumOverlay from './PremiumOverlay';
import PremiumWrapperHOC from './PremiumWrapperHOC';
import {USER_ROLE_PREMIUM, Colors} from '../../constants';

const PremiumWrapper = ({
  userRole,
  isPremium,
  overlay,
  placeholder,
  children,
  style,
  ...rest
}) => {
  let content;

  if (userRole !== USER_ROLE_PREMIUM && isPremium === true) {
    content = (
      <Fragment>
        {overlay && <PremiumOverlay />}
        {overlay && (placeholder || children)}
      </Fragment>
    );
  } else {
    content = children;
  }

  return (
    <View style={[styles.container, style]} {...rest}>
      {content}
    </View>
  );
};

PremiumWrapper.propTypes = {
  userRole: PropTypes.string.isRequired,
  isPremium: PropTypes.bool,
  children: PropTypes.node,
  style: ViewPropTypes.style,
  overlay: PropTypes.bool,
  placeholder: PropTypes.node,
};

PremiumWrapper.defaultProps = {
  isPremium: null,
  children: null,
  style: {},
  overlay: false,
  placeholder: null,
};

export default PremiumWrapperHOC(PremiumWrapper);

const styles = {
  container: {
    flex: 1,
  },
  placeholder: {
    backgroundColor: Colors.loadingOverlay,
    height: 300,
  },
};
