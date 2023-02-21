import React, {Component} from 'react';
import {Header} from '../../layout';

const ModifyPlanScreenHOCWrapper = (InnerComponent) => {
  class ModifyPlanScreenHOC extends Component {
    static navigationOptions = {
      title: 'MODIFY PLAN',
      header: (props) => <Header {...props} backButton={true} />,
    };

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  return ModifyPlanScreenHOC;
};

export default ModifyPlanScreenHOCWrapper;
