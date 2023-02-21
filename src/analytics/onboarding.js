import {filter, takeUntil} from 'rxjs/operators';
import {analytics as Firebase} from '../config';
import Mixpanel from 'react-native-mixpanel';
import Intercom from 'react-native-intercom';
import {
  ANALYTICS_INTRO_VIDEO_SKIPPED,
  ANALYTICS_INTRO_VIDEO_WATCHED,
  ANALYTICS_RECOMMENDATIONS_OPENED,
  ANALYTICS_RECOMMENDATIONS_SKIPPED,
  ANALYTICS_TOPIC_CUSTOM_EVENT,
  ANALYTICS_TOPIC_NAVIGATION,
} from '../constants';

export const onboardingIntroVideoSkipped = (subject) =>
  subject
    .pipe(
      filter(({topic}) => topic === ANALYTICS_TOPIC_NAVIGATION),
      takeUntil(
        subject.pipe(
          filter(({topic}) => topic === ANALYTICS_TOPIC_CUSTOM_EVENT),
          filter(({event}) => event === ANALYTICS_INTRO_VIDEO_WATCHED),
        ),
      ),
      filter(({prevRoute}) => prevRoute === 'Intro'),
    )
    .subscribe(() => {
      Firebase.logEvent(ANALYTICS_INTRO_VIDEO_SKIPPED);
      Mixpanel.track(ANALYTICS_INTRO_VIDEO_SKIPPED);
      Intercom.logEvent(ANALYTICS_INTRO_VIDEO_SKIPPED);
    });

export const onboardingRecommendationsOpened = (subject) =>
  subject
    .pipe(
      filter(({topic}) => topic === ANALYTICS_TOPIC_NAVIGATION),
      filter(({prevRoute}) => prevRoute === 'Recommendations'),
      filter(({path}) => !path.includes('Main')),
    )
    .subscribe(() => {
      Firebase.logEvent(ANALYTICS_RECOMMENDATIONS_OPENED);
      Mixpanel.track(ANALYTICS_RECOMMENDATIONS_OPENED);
      Intercom.logEvent(ANALYTICS_RECOMMENDATIONS_OPENED);
    });

export const onboardingRecommendationsSkipped = (subject) =>
  subject
    .pipe(
      filter(({topic}) => topic === ANALYTICS_TOPIC_NAVIGATION),
      filter(({prevRoute}) => prevRoute === 'Recommendations'),
      filter(({path}) => path.includes('Main')),
    )
    .subscribe(() => {
      Firebase.logEvent(ANALYTICS_RECOMMENDATIONS_SKIPPED);
      Mixpanel.track(ANALYTICS_RECOMMENDATIONS_SKIPPED);
      Intercom.logEvent(ANALYTICS_RECOMMENDATIONS_SKIPPED);
    });
