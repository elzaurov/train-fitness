import React, {Component} from 'react';
import {Header} from '../../layout';

const ContactScreenHOCWrapper = (InnerComponent) => {
  class ContactScreenHOC extends Component {
    static navigationOptions = {
      header: (props) => <Header {...props} backButton />,
    };

    render() {
      return <InnerComponent {...this.props} {...this.state} />;
    }
  }

  return ContactScreenHOC;
};

export default ContactScreenHOCWrapper;
