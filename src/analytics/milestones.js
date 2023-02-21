import {createSelector} from 'reselect';
import {filter, map, skipUntil} from 'rxjs/operators';
import {analytics as Firebase} from '../config';
import Mixpanel from 'react-native-mixpanel';
import Intercom from 'react-native-intercom';
import {
  ANALYTICS_FIRST_SESSION_ACTIVITY_FINISHED,
  ANALYTICS_FIRST_SESSION_ACTIVITY_STARTED,
  ANALYTICS_MILESTONE_REACH,
  ANALYTICS_TOPIC_ACTION,
  ANALYTICS_TOPIC_NAVIGATION,
  ANALYTICS_TOPIC_STATE,
} from '../constants';
import {SET_MILESTONES} from '../actions';

// To skip the user data load action, wait until the navigation is ready.
export const milestonesReached = (subject) =>
  subject
    .pipe(
      skipUntil(
        subject.pipe(filter(({topic}) => topic === ANALYTICS_TOPIC_NAVIGATION)),
      ),
      filter(({topic}) => topic === ANALYTICS_TOPIC_ACTION),
      filter(({type}) => type === SET_MILESTONES),
    )
    .subscribe(({payload, state}) => {
      const newMilestones = Object.keys(payload).filter(
        (milestoneType) => !state.milestones?.[milestoneType],
      );

      for (let type of newMilestones) {
        Firebase.logEvent(ANALYTICS_MILESTONE_REACH, {type});
        Mixpanel.trackWithProperties(ANALYTICS_MILESTONE_REACH, {type});
        Intercom.logEvent(ANALYTICS_MILESTONE_REACH, {type});
      }
    });

const firstSessionActivityStartedSelector = createSelector(
  [
    (state) => state.milestones.secondLogin,
    (state) => state.milestones.startedFirstActivity,
  ],
  (secondLogin, startedFirstActivity) => {
    if (!secondLogin && startedFirstActivity) {
      Firebase.logEvent(ANALYTICS_FIRST_SESSION_ACTIVITY_STARTED);
      Mixpanel.track(ANALYTICS_FIRST_SESSION_ACTIVITY_STARTED);
      Intercom.logEvent(ANALYTICS_FIRST_SESSION_ACTIVITY_STARTED);
    }
  },
);

export const milestonesFirstSesstionActivityStart = (subject) =>
  subject
    .pipe(
      filter(({topic}) => topic === ANALYTICS_TOPIC_STATE),
      map(({state}) => state),
    )
    .subscribe(firstSessionActivityStartedSelector);

const firstSessionActivityFinishedSelector = createSelector(
  [
    (state) => state.milestones.secondLogin,
    (state) => state.milestones.finishedFirstActivity,
  ],
  (secondLogin, finishedFirstActivity) => {
    if (!secondLogin && finishedFirstActivity) {
      Firebase.logEvent(ANALYTICS_FIRST_SESSION_ACTIVITY_FINISHED);
      Mixpanel.track(ANALYTICS_FIRST_SESSION_ACTIVITY_FINISHED);
      Intercom.logEvent(ANALYTICS_FIRST_SESSION_ACTIVITY_FINISHED);
    }
  },
);

export const milestonesFirstSessionActivityFinished = (subject) =>
  subject
    .pipe(
      filter(({topic}) => topic === ANALYTICS_TOPIC_STATE),
      map(({state}) => state),
    )
    .subscribe(firstSessionActivityFinishedSelector);
