import {Subject} from 'rxjs';
import {ANALYTICS_TOPIC_ACTION, MIXPANEL_TOKEN} from '../constants';
import Mixpanel from 'react-native-mixpanel';
import {
  getTrackingStatus,
  requestTrackingPermission,
} from 'react-native-tracking-transparency';

// listeners
import {
  userEntitlementLoad,
  userLogin,
  userProfileLoad,
  userPlanLoad,
  userRegisterCompleted,
  userNewlyLanded,
  userRegisterStarted,
  userRegisterIntercom,
  removeRegistrationStorage
} from './user';
import {customEventReceived} from './customEvents';
import {screenView} from './screen';
import {
  subscriptionIntroductionMethod,
  subscriptionPaywallOpen,
  subscriptionPurchase,
} from './subscriptions';
import {
  activityAdd,
  activityRemove,
  activityStarted,
  activityFinished,
} from './activities';
import {
  milestonesReached,
  milestonesFirstSessionActivityFinished,
  milestonesFirstSesstionActivityStart,
} from './milestones';
import {
  onboardingIntroVideoSkipped,
  onboardingRecommendationsOpened,
  onboardingRecommendationsSkipped,
} from './onboarding';
import {workoutScreenView, workoutView} from './workouts';

export const subject = new Subject();

// creates a redux middleware to emit the store action events
export const analyticsMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  subject.next({topic: ANALYTICS_TOPIC_ACTION, state, ...action});
  next(action);
};

// initializes the analytics
export const initialize = async () => {
  // initialize analytics
  await Mixpanel.sharedInstanceWithToken(MIXPANEL_TOKEN);
  Mixpanel.registerSuperProperties({Production: !__DEV__});
};

export const registerListenerSubscriptions = async () => {
  let subscriptions = [];

  let trackingStatus = await getTrackingStatus();

  if (trackingStatus === 'not-determined') {
    trackingStatus = await requestTrackingPermission();
  }

  if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
    subscriptions = [
      customEventReceived(subject),
      screenView(subject),
      userLogin(subject),
      userProfileLoad(subject),
      userEntitlementLoad(subject),
      userPlanLoad(subject),
      userRegisterStarted(subject),
      userRegisterCompleted(subject),
      userNewlyLanded(subject),
      subscriptionPaywallOpen(subject),
      subscriptionPurchase(subject),
      subscriptionIntroductionMethod(subject),
      activityAdd(subject),
      activityRemove(subject),
      activityStarted(subject),
      activityFinished(subject),
      milestonesReached(subject),
      milestonesFirstSesstionActivityStart(subject),
      milestonesFirstSessionActivityFinished(subject),
      onboardingIntroVideoSkipped(subject),
      onboardingRecommendationsOpened(subject),
      onboardingRecommendationsSkipped(subject),
      workoutScreenView(subject),
      workoutView(subject),
    ];
  }

  return () => {
    for (let subscription of subscriptions) {
      if (typeof subscription === 'function') {
        subscription();
      }
    }
  };
};
