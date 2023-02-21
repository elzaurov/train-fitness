import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import moment from 'moment';

const CheckPlanWrapperHOCWrapper = (InnerComponent) => {
  class CheckPlanWrapperHOC extends Component {
    constructor(props) {
      super(props);

      const {navigation, plan, profile} = props;
      const isPlanCanceled = !profile.isAdmin && plan.isCanceled;

      if (isPlanCanceled) {
        navigation.replace('Settings');
      }
    }

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  CheckPlanWrapperHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    plan: PropTypes.objectOf(PropTypes.any).isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  function mapStateToProps({plan, profile}) {
    return {plan, profile};
  }

  return connect(mapStateToProps)(CheckPlanWrapperHOC);
};

export default CheckPlanWrapperHOCWrapper;
