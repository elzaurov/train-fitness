import {filter} from 'rxjs/operators';
import {analytics as Firebase} from '../config';
import Mixpanel from 'react-native-mixpanel';
import Intercom from 'react-native-intercom';
import {
  ANALYTICS_TOPIC_ACTION,
  ANALYTICS_TOPIC_NAVIGATION,
  ANALYTICS_WORKOUT_OPENED,
  WORKOUT_VIEW_EVENT,
} from '../constants';
import {LOAD_WORKOUT} from '../actions';

export const workoutScreenView = (subject) =>
  subject
    .pipe(
      filter(({topic}) => topic === ANALYTICS_TOPIC_NAVIGATION),
      filter(({currentRoute}) => currentRoute === 'Workout'),
    )
    .subscribe(() => {
      Firebase.logEvent(ANALYTICS_WORKOUT_OPENED);
      Mixpanel.track(ANALYTICS_WORKOUT_OPENED);
      Intercom.logEvent(ANALYTICS_WORKOUT_OPENED);
    });

export const workoutView = (subject) =>
  subject
    .pipe(
      filter(({topic}) => topic === ANALYTICS_TOPIC_ACTION),
      filter(({type}) => type === LOAD_WORKOUT),
    )
    .subscribe(({payload}) => {
      const {key: id, name} = Object.values(payload)?.[0] ?? {};

      Firebase.logEvent(WORKOUT_VIEW_EVENT, {id, name});
      Mixpanel.trackWithProperties(WORKOUT_VIEW_EVENT, {id, name});
      Intercom.logEvent(WORKOUT_VIEW_EVENT, {id, name});
    });
