import Mixpanel from 'react-native-mixpanel';
import {analytics as Firebase} from '../config';
import Intercom from 'react-native-intercom';
import {filter} from 'rxjs/operators';
import {UPDATE_SCHEDULE_DAY} from '../actions';
import {
  ACTIVITY_ADDED_TO_SCHEDULE,
  ADD_CALENDAR_ITEM_EVENT,
  ANALYTICS_ACTIVITY_SCHEDULED,
  ANALYTICS_TOPIC_ACTION,
  ANALYTICS_TOPIC_NAVIGATION,
  REMOVE_CALENDAR_ITEM_EVENT,
} from '../constants';

export const activityAdd = (subject) =>
  subject
    .pipe(
      filter(
        ({topic, type}) =>
          topic === ANALYTICS_TOPIC_ACTION && type === UPDATE_SCHEDULE_DAY,
      ),
    )
    .subscribe(({payload, state}) => {
      const [date, items] = Object.entries(payload)[0];

      if (items.length > state.schedule?.[date]?.length) {
        const addedItem = items.find(
          (item) =>
            !state.schedule?.[date]?.some(
              (dayItem) => dayItem.uid === item.uid,
            ),
        );

        Firebase.logEvent(ADD_CALENDAR_ITEM_EVENT, {
          date,
          item_id: addedItem.key,
          item_name: addedItem.name,
          item_type: addedItem.type,
        });
        Firebase.logEvent(ANALYTICS_ACTIVITY_SCHEDULED);

        Mixpanel.trackWithProperties(ACTIVITY_ADDED_TO_SCHEDULE, {
          activity_id: addedItem.key,
          activity_name: addedItem.name,
          activity_type: addedItem.type,
          activity_category: addedItem.category,
        });
        Mixpanel.track(ANALYTICS_ACTIVITY_SCHEDULED);

        Intercom.logEvent(ANALYTICS_ACTIVITY_SCHEDULED);
      }
    });

export const activityRemove = (subject) =>
  subject
    .pipe(
      filter(
        ({topic, type}) =>
          topic === ANALYTICS_TOPIC_ACTION && type === UPDATE_SCHEDULE_DAY,
      ),
    )
    .subscribe(({payload, state}) => {
      const [date, items] = Object.entries(payload)[0];

      if (items.length < state.schedule?.[date]?.length) {
        const removedItem = state.schedule?.[date].find(
          (dayItem) => !items.some((item) => item.uid !== dayItem.uid),
        );

        if (removedItem) {
          Firebase.logEvent(REMOVE_CALENDAR_ITEM_EVENT, {
            item_id: removedItem.key,
            item_name: removedItem.name,
            item_type: removedItem.type,
            schedule_id: removedItem.uid,
            timestamp: removedItem.timestamp,
          });
        }
      }
    });

const activityStartRoutes = ['Course', 'Learning', 'Workout', 'Program'];

export const activityStarted = (subject) =>
  subject.pipe(
    filter(({topic}) => topic === ANALYTICS_TOPIC_NAVIGATION),
    filter(({path}) => path.includes('Performing')),
    filter(({currentRoute}) => activityStartRoutes.includes(currentRoute)),
  );

// WARNING: THE LOGIC IS TOO COMPLICATED, SKIPPING FOR NOW
export const activityFinished = (subject) => {
  //   const schedulables = subject.pipe(
  //     filter(({topic}) => topic === ANALYTICS_TOPIC_ACTION),
  //     filter(({type}) => type === UPDATE_SCHEDULE_DAY),
  //     map(({payload, state}) => {
  //       const [date, items] = Object.entries(payload)[0];
  //       const newCompletedItems = items.filter(({completed}) => completed);
  //       const completedItems = state.schedule?.[date]?.filter(
  //         ({completed}) => completed,
  //       );
  //       const newCompletedItem = newCompletedItems.find(
  //         (newItem) => !completedItems.some((item) => item.uid === newItem.uid),
  //       );
  //       return newCompletedItem;
  //     })
  //       .filter((newCompletedItem) => !!newCompletedItem)
  //       .map(({payload}) => ({activityType: payload.type})),
  //   );
  //   const learnings = subject.pipe(
  //     filter(({topic}) => topic === ANALYTICS_TOPIC_NAVIGATION),
  //     filter(({previousRoute}) => previousRoute === 'Learning'),
  //     map(() => ({activityType: 'Learning'})),
  //   );
  //   return schedulables.mergeMap(learnings);
};
