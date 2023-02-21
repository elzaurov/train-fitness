import React, {Component} from 'react';

const ModifyPlanHOCWrapper = (InnerComponent) => {
  class ModifyPlanHOC extends Component {
    state = {
      loading: true,
    };

    async componentDidMount() {
      this.setState({loading: false});
    }

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  return ModifyPlanHOC;
};

export default ModifyPlanHOCWrapper;
