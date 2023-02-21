// REMOVE CANDIDATE

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Alert} from 'react-native';
import {Header} from '../../layout';
import {updateProfile} from '../../actions';

const FCM = {};
const FN = {};

const DashboardScreenHOCWrapper = (InnerComponent) => {
  class DashboardScreenHOC extends Component {
    static navigationOptions = {
      title: 'DASHBOARD',
      header: (props) => <Header {...props} />,
    };

    componentDidMount() {
      this.requestNotificationPermission();

      FCM.getToken().then((fcmToken) => {
        this.props.updateProfile({fcmToken});
      });

      this.onTokenRefreshListener = FCM.onTokenRefresh((fcmToken) => {
        this.props.updateProfile({fcmToken});
      });

      this.notificationListener = FN.onNotification(this.handleNotification);
      this.notificationOpenedListener = FN.onNotificationOpened(
        ({notification}) => this.handleNotification(notification),
      );

      FN.getInitialNotification().then((notificationOpen) => {
        if (notificationOpen) {
          this.handleInitialNotification(notificationOpen.notification);
        }
      });
    }

    componentWillUnmount() {
      this.onTokenRefreshListener();
      this.notificationListener();
      this.notificationOpenedListener();
    }

    handleInitialNotification = (notification) => {
      const {screen, params} = notification._data;
      const paramsData = params ? JSON.parse(params) : {};

      if (screen) {
        this.props.navigation.navigate(screen, paramsData);
      }
    };

    handleNotification = (notification) => {
      // Process your notification as required
      const {title, body, screen, params} = notification._data;

      if (screen) {
        const paramsData = params ? JSON.parse(params) : {};

        Alert.alert(
          title,
          `${body}. Would you like to redirect to the screen?`,
          [
            {
              text: 'Yes',
              onPress: () => this.props.navigation.navigate(screen, paramsData),
            },
            {text: 'Later', onPress: () => {}},
          ],
        );
      } else {
        Alert.alert(title, body, [{text: 'OK', onPress: () => {}}]);
      }
    };

    requestNotificationPermission = async () => {
      await FCM.requestPermission();
    };

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  DashboardScreenHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    updateProfile: PropTypes.func.isRequired,
  };

  function mapStateToProps() {
    return {};
  }

  return connect(mapStateToProps, {
    updateProfile,
  })(DashboardScreenHOC);
};

export default DashboardScreenHOCWrapper;
