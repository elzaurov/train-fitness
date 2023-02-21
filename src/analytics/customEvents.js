import Mixpanel from 'react-native-mixpanel';
import Intercom from 'react-native-intercom';
import {filter} from 'rxjs/operators';
import {analytics as Firebase} from '../config';
import {ANALYTICS_TOPIC_CUSTOM_EVENT} from '../constants';

export const customEventReceived = (subject) =>
  subject
    .pipe(filter(({topic}) => topic === ANALYTICS_TOPIC_CUSTOM_EVENT))
    .subscribe(({event, params}) => {
      Firebase.logEvent(event, params);

      if (params) {
        Mixpanel.trackWithProperties(event, params);
      } else {
        Mixpanel.track(event);
      }

      Intercom.logEvent(event, params);
    });
