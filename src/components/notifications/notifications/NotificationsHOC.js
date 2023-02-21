import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadNotifications, updateNotification} from '../../../actions';

const NotificationsHOCWrapper = (InnerComponent) => {
  class NotificationsHOC extends Component {
    state = {
      loading: true,
      numberOfLoadings: 0,
    };

    async componentDidMount() {
      const {unreadNotifications} = this.props;

      await this.loadNotifications();

      this.setState({loading: false}, () => {
        this.props.updateNotification(
          unreadNotifications.map((n) => ({...n, read: true})),
        );
      });
    }

    handleLoadMore = (cb) => {
      const {notifications} = this.props;

      this.loadNotifications(
        notifications[notifications.length - 1].createdAt,
      ).finally(() => {
        if (cb) {
          cb();
        }
      });
    };

    loadNotifications = async (createdAt) => {
      await this.props.loadNotifications(createdAt ? createdAt - 1 : null);

      return null;
    };

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onLoadMore={this.handleLoadMore}
        />
      );
    }
  }

  function mapStateToProps({notifications, unreadNotifications}) {
    return {notifications, unreadNotifications};
  }

  NotificationsHOC.propTypes = {
    notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
    loadNotifications: PropTypes.func.isRequired,
    updateNotification: PropTypes.func.isRequired,
  };

  return connect(mapStateToProps, {
    loadNotifications,
    updateNotification,
  })(NotificationsHOC);
};

export default NotificationsHOCWrapper;
