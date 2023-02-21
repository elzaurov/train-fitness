import React from 'react';
import PropTypes from 'prop-types';
import {Notifications} from '../../components';
import NotificationsScreenHOC from './NotificationsScreenHOC';
import {CheckPlanWrapper} from '../../layout';

const NotificationsScreen = (props) => (
  <CheckPlanWrapper navigation={props.navigation}>
    <Notifications {...props} />
  </CheckPlanWrapper>
);

NotificationsScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default NotificationsScreenHOC(NotificationsScreen);
