import React from 'react';
import {ModifyPlan, ModifyPlanIAP} from '../../components';
import {} from '../../components';
import ModifyPlanScreenHOC from './ModifyPlanScreenHOC';
import {Layout} from '../../constants';

const ModifyPlanScreen = (props) => {
  if (props.isIAP) {
    return <ModifyPlanIAP {...props} />;
  } else {
    return <ModifyPlan {...props} />;
  }
};

export default ModifyPlanScreenHOC(ModifyPlanScreen);
