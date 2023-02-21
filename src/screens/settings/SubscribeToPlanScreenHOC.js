import React, {Component} from 'react';
import {Header} from '../../layout';

const SubscribeToPlanScreenHOCWrapper = (InnerComponent) => {
  class SubscribeToPlanScreenHOC extends Component {
    static navigationOptions = {
      title: 'SUBSCRIBE TO PLAN',
      header: (props) => {
        if (props.route.params?.isAuth) {
          return null;
        }
        return <Header {...props} backButton={true} />;
      },
    };

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  return SubscribeToPlanScreenHOC;
};

export default SubscribeToPlanScreenHOCWrapper;
