import React, {Component} from 'react';
import {Header} from '../../layout';

const PaymentSuccessHOCWrapper = (InnerComponent) => {
  class PaymentSuccessHOC extends Component {
    static navigationOptions = {
      header: (props) => <Header {...props} />,
    };

    render() {
      return <InnerComponent {...this.props} {...this.state} />;
    }
  }

  return PaymentSuccessHOC;
};

export default PaymentSuccessHOCWrapper;
