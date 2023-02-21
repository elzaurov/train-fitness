import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {USER_ROLE_PREMIUM} from '../../constants';

const PremiumHOCWrapper = (InnerComponent) => {
  const PremiumHOC = ({userRole, isPremium, ...rest}) => {
    if (userRole === USER_ROLE_PREMIUM || isPremium === false) {
      return <InnerComponent {...rest} />;
    }
    return null;
  };

  const mapStateToProps = (state) => ({
    userRole: state.userRole,
  });

  PremiumHOC.propTypes = {
    userRole: PropTypes.string.isRequired,
    isPremium: PropTypes.bool,
  };

  PremiumHOC.defaultProps = {
    isPremium: true,
  };

  return connect(mapStateToProps)(PremiumHOC);
};

export default PremiumHOCWrapper;
