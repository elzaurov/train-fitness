import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import CheckPlanWrapperHOC from './CheckPlanWrapperHOC';

const CheckPlanWrapper = ({children}) => <Fragment>{children}</Fragment>;

CheckPlanWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CheckPlanWrapperHOC(CheckPlanWrapper);
