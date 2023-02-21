import React, {Component} from 'react';
import {Header} from '../../layout';

const NewScheduleScreenHOCWrapper = (InnerComponent) => {
  class NewScheduleScreenHOC extends Component {
    static navigationOptions = {
      title: 'NEW SCHEDULE',
      header: (props) => <Header {...props} backButton={true} />,
    };

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  return NewScheduleScreenHOC;
};

export default NewScheduleScreenHOCWrapper;
