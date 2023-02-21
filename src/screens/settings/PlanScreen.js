import React, {Fragment} from 'react';
import {Plan, ForceCrash} from '../../components';
import PlanScreenHOC from './PlanScreenHOC';

const PlanScreen = (props) => (
  <Fragment>
    <Plan {...props} />
    <ForceCrash />
  </Fragment>
);

export default PlanScreenHOC(PlanScreen);
