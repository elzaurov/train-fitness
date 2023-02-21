import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Header} from '../../layout';

const NotificationsScreenHOCWrapper = (InnerComponent) => {
  class NotificationsScreenHOC extends Component {
    static navigationOptions = {
      title: 'NOTIFICATIONS',
      header: (props) => <Header {...props} backButton={true} />,
    };

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  NotificationsScreenHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  return NotificationsScreenHOC;
};

export default NotificationsScreenHOCWrapper;
