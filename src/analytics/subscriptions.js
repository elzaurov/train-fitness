import {filter} from 'rxjs/operators';
import {analytics as Firebase} from '../config';
import Mixpanel from 'react-native-mixpanel';
import Intercom from 'react-native-intercom';
import {RECEIPT_VERIFIED, UPDATE_PROFILE} from '../actions';
import {
  ANALYTICS_INTRODUCTION_METHOD_SELECTED,
  ANALYTICS_PAYWALL_OPENED,
  ANALYTICS_PRODUCT_PURCHASED,
  ANALYTICS_TOPIC_ACTION,
  ANALYTICS_TOPIC_NAVIGATION,
  SUBSCRIBE_TO_PLAN,
} from '../constants';

export const subscriptionPaywallOpen = (subject) =>
  subject
    .pipe(
      filter(
        ({topic, currentRoute}) =>
          topic === ANALYTICS_TOPIC_NAVIGATION && currentRoute === 'Paywall',
      ),
    )
    .subscribe(({currentRoute}) => {
      Firebase.logEvent(ANALYTICS_PAYWALL_OPENED);
      Mixpanel.track(ANALYTICS_PAYWALL_OPENED);
      Intercom.logEvent(ANALYTICS_PAYWALL_OPENED);
    });

export const subscriptionPurchase = (subject) =>
  subject
    .pipe(
      filter(
        ({topic, type}) =>
          topic === ANALYTICS_TOPIC_ACTION && type === RECEIPT_VERIFIED,
      ),
    )
    .subscribe(({payload}) => {
      Firebase.logEvent(ANALYTICS_PRODUCT_PURCHASED);
      Mixpanel.trackWithProperties(SUBSCRIBE_TO_PLAN, {
        Plan: payload.productId,
      });
      Intercom.logEvent(ANALYTICS_PRODUCT_PURCHASED);
    });

// WARNING: THIS FIRES WHENEVER THE USER UPDATES THE USER PROFILE
export const subscriptionIntroductionMethod = (subject) =>
  subject
    .pipe(
      filter(
        ({topic, type}) =>
          topic === ANALYTICS_TOPIC_ACTION && type === UPDATE_PROFILE,
      ),
    )
    .subscribe(({payload}) => {
      Firebase.logEvent(ANALYTICS_INTRODUCTION_METHOD_SELECTED, {
        type: payload.introductionMethod,
      });

      Mixpanel.trackWithProperties(ANALYTICS_INTRODUCTION_METHOD_SELECTED, {
        type: payload.introductionMethod,
      });

      Intercom.logEvent(ANALYTICS_INTRODUCTION_METHOD_SELECTED, {
        type: payload.introductionMethod,
      });
    });
