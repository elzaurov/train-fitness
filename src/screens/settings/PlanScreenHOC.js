import React, {Component} from 'react';
import {Header} from '../../layout';

const PlanScreenHOCWrapper = (InnerComponent) => {
  class PlanScreenHOC extends Component {
    static navigationOptions = {
      title: 'PLAN',
      header: (props) => <Header {...props} backButton={true} />,
    };

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  return PlanScreenHOC;
};

export default PlanScreenHOCWrapper;
