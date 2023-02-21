import {filter} from 'rxjs/operators';
// import {analytics as Firebase} from '../config'; //TODO: update to logScreenView
import Mixpanel from 'react-native-mixpanel';
import Intercom from 'react-native-intercom';
import {ANALYTICS_TOPIC_NAVIGATION, VIEW_SCREEN} from '../constants';

export default (analytics) => {
  analytics.onNavigation(({event, mixpanel, firebase}) => {});
};

export const screenView = (subject) =>
  subject
    .pipe(
      filter(
        ({topic, currentRoute}) =>
          topic === ANALYTICS_TOPIC_NAVIGATION && !!currentRoute,
      ),
    )
    .subscribe(({currentRoute}) => {
      // Firebase.setCurrentScreen(currentRoute); // TODO: update this to logScreenView
      Mixpanel.trackWithProperties(VIEW_SCREEN, {screen: currentRoute});
      Intercom.logEvent(VIEW_SCREEN, {screen: currentRoute});
    });
