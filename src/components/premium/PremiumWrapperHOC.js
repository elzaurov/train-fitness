import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const PremiumWrapperHOCWrapper = (InnerComponent) => {
  class PremiumWrapperHOC extends Component {
    render() {
      return <InnerComponent {...this.props} {...this.state} />;
    }
  }

  PremiumWrapperHOC.propTypes = {
    userRole: PropTypes.string.isRequired,
  };

  const mapStateToProps = (state) => ({
    userRole: state.userRole,
  });

  return connect(mapStateToProps)(PremiumWrapperHOC);
};

export default PremiumWrapperHOCWrapper;
