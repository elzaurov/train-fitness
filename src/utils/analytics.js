import moment from 'moment';
import Mixpanel from 'react-native-mixpanel';
import Intercom from 'react-native-intercom';
import {analytics} from '../config';

import {VIEW_SCREEN, SESSION_COUNT} from '../constants';

export const userLogin = ({
  uid,
  displayName,
  email,
  createdAt,
  entitlement,
  plan = null,
}) => {
  // firebase
  analytics.setUserId(uid);
  analytics.setUserProperties({
    uid,
    displayName,
    email,
    plan,
    entitlement: entitlement ? String(entitlement) : null,
    createdAt: createdAt ? String(createdAt) : null,
  });

  // mixpanel
  try {
    Mixpanel.identify(uid);
    Mixpanel.set({
      $email: email,
      $name: displayName,
      $last_login: moment.utc().toDate(),
      Created: moment.utc(createdAt, 'x').toISOString(),
      Entitlement: entitlement,
      Plan: plan,
    });
    Mixpanel.increment(SESSION_COUNT, 1);
  } catch (error) {
    console.error(error);
  }

  // intercom
  try {
    Intercom.registerIdentifiedUser({userId: uid});
    Intercom.updateUser({
      userId: uid,
      email,
      name: displayName,
      custom_attributes: {
        entitlement,
        plan,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const screenView = (screen, params) => {
  // firebase
  // analytics.setCurrentScreen(screen); //TODO: update this to logScreenView

  // mixpanel
  try {
    Mixpanel.trackWithProperties(VIEW_SCREEN, {
      screen,
      params,
    });
  } catch (error) {
    console.error(error);
  }
};

export const logEvent = (event, params) => {
  // firebase
  analytics.logEvent(event, params);

  // mixpanel
  try {
    Mixpanel.track(event);
  } catch (error) {
    // console.error(error);
  }
};
