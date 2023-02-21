import React, {Component} from 'react';
import {Header} from '../../layout';

const ProfileScreenHOCWrapper = (InnerComponent) => {
  class ProfileScreenHOC extends Component {
    static navigationOptions = {
      title: 'PROFILE',
      header: (props) => (
        <Header {...props} backButton={true} screen="Profile" />
      ),
    };

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  return ProfileScreenHOC;
};

export default ProfileScreenHOCWrapper;
