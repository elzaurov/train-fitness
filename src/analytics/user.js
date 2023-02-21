import { filter, pluck, withLatestFrom } from 'rxjs/operators';
import { createSelector } from 'reselect';
import moment from 'moment';
import Mixpanel from 'react-native-mixpanel';
import Intercom from 'react-native-intercom';
import {
  ANALYTICS_NEW_USER_LANDED,
  ANALYTICS_REGISTER_STARTED,
  ANALYTICS_REGISTER_COMPLETED,
  ANALYTICS_TOPIC_ACTION,
  ANALYTICS_TOPIC_NAVIGATION,
  ANALYTICS_TOPIC_STATE,
  LOGIN_EVENT,
} from '../constants';
import { analytics as Firebase } from '../config';
import {
  LOAD_PLAN,
  LOAD_PROFILE,
  SET_ENTITLEMENT,
  USER_AUTHORIZED,
} from '../actions';
import { AppStorage } from '../utils';

const storage = new AppStorage('intercom_user');

export const userLogin = (subject) =>
  subject
    .pipe(
      filter(
        ({ topic, type }) =>
          topic === ANALYTICS_TOPIC_ACTION && type === USER_AUTHORIZED,
      ),
    )
    .subscribe(({ payload }) => {
      Firebase.setUserId(payload.uid);
      Firebase.logEvent(LOGIN_EVENT);

      Mixpanel.identify(payload.uid);
      Mixpanel.track(LOGIN_EVENT);

      userRegisterIntercom(payload.uid);
      Intercom.logEvent(LOGIN_EVENT);
    });

export const userRegisterIntercom = async (uid) => {
  await Intercom.registerIdentifiedUser({ userId: uid });
  storage.set({ registered: true });
}

export const removeRegistrationStorage = async () => {
  storage.remove();
}

export const userProfileLoad = (subject) =>
  subject
    .pipe(
      filter(
        ({ topic, type }) =>
          topic === ANALYTICS_TOPIC_ACTION && type === LOAD_PROFILE,
      ),
    )
    .subscribe(({ payload }) => {
      const { uid, displayName, email = null, createdAt } = payload;

      Firebase.setUserProperties({
        uid,
        displayName: displayName ?? email,
        email,
        createdAt: String(createdAt),
      });

      Mixpanel.set({
        $email: email,
        $name: displayName,
        $last_login: moment.utc().toDate(),
        Created: moment.utc(createdAt, 'x').toISOString(),
      });

      storage.get().then((res) => {
        if (res.registered) {
          updateUser(uid, email, displayName);
        }
      }).catch((err) => {
        Intercom.registerIdentifiedUser({ userId: payload.uid });
        storage.set({ registered: true });
        updateUser(uid, email, displayName);
      });




    });

const updateUser = (uid, email, displayName) => {
  Intercom.updateUser({
    userId: uid,
    email,
    name: displayName,
  });
}

export const userEntitlementLoad = (subject) =>
  subject
    .pipe(
      filter(
        ({ topic, type }) =>
          topic === ANALYTICS_TOPIC_ACTION && type === SET_ENTITLEMENT,
      ),
    )
    .subscribe(({ payload }) => {
      const { status, store } = payload;

      Firebase.setUserProperties({
        entitlement: String(status) ?? '0',
        store: String(store) ?? null,
      });

      Mixpanel.set({
        entitlement: status ?? 0,
        store,
      });

      Intercom.updateUser({
        custom_attributes: {
          entitlement: status ?? 0,
          store,
        },
      });
    });

export const userPlanLoad = (subject) =>
  subject
    .pipe(
      filter(
        ({ topic, type }) =>
          topic === ANALYTICS_TOPIC_ACTION && type === LOAD_PLAN,
      ),
    )
    .subscribe(({ payload }) => {
      Firebase.setUserProperties({ plan: payload.id ?? null });
      Mixpanel.set({ Plan: payload.id });
      Intercom.updateUser({ custom_attributes: { plan: payload.id } });
    });

const registerSelector = createSelector(
  [
    (state) => state.milestones.registered,
    (state) => state.milestones.secondLogin,
  ],
  (registered, secondLogin) => {
    if (registered && !secondLogin) {
      Firebase.logEvent(ANALYTICS_REGISTER_COMPLETED);
      Mixpanel.track(ANALYTICS_REGISTER_COMPLETED);
      Intercom.logEvent(ANALYTICS_REGISTER_COMPLETED);
    }
  },
);

export const userRegisterCompleted = (subject) =>
  subject
    .pipe(filter(({ topic }) => topic === ANALYTICS_TOPIC_STATE))
    .subscribe(({ state }) => registerSelector(state));

export const userRegisterStarted = (subject) =>
  subject
    .pipe(
      filter(({ topic }) => topic === ANALYTICS_TOPIC_NAVIGATION),
      filter(({ currentRoute }) => currentRoute === 'SignUp'),
    )
    .subscribe(() => {
      Firebase.logEvent(ANALYTICS_REGISTER_STARTED);
      Mixpanel.track(ANALYTICS_REGISTER_STARTED);
      Intercom.logEvent(ANALYTICS_REGISTER_STARTED);
    });

export const userNewlyLanded = (subject) =>
  subject
    .pipe(
      filter(({ topic }) => topic === ANALYTICS_TOPIC_NAVIGATION),
      filter(({ path }) => path.includes('Main')),
      withLatestFrom(
        subject.pipe(
          filter(({ topic }) => topic === ANALYTICS_TOPIC_STATE),
          pluck('state'),
        ),
      ),
    )
    .subscribe(([, state]) => {
      if (state.milestones?.registered && !state.milestones?.secondLogin) {
        Firebase.logEvent(ANALYTICS_NEW_USER_LANDED);
        Mixpanel.track(ANALYTICS_NEW_USER_LANDED);
        Intercom.logEvent(ANALYTICS_NEW_USER_LANDED);
      }
    });
