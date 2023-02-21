import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import {OnBoardingContainer, OnBoardingTemplate} from '../../layout';
import {
  Colors,
  Layout,
} from '../../../constants';

// sections
import TrialOfferTestimonials from './TrialOfferTestimonials';
import TrialOfferHeader from './TrialOfferHeader';
import OnBoardingTitle from '../OnBoardingTitle';
import TrialOfferPackageDetails from './TrialOfferPackageDetails';
import Terms from '../../auth/paywall/Terms';
import TrialOfferButton from './TrialOfferButton';
import { useSubscriptions } from '../../../hooks';
import moment from 'moment';
import { OnBoardingHeader } from '../../header';

const TrialOffer = () => {
  const {popularSubscription, loading} = useSubscriptions();

  const {
    subscriptionPeriodNumberIOS: subPeriod,
    subscriptionPeriodUnitIOS: subPeriodUnit,
    introductoryPriceNumberOfPeriodsIOS: trialPeriod,
    introductoryPriceSubscriptionPeriodIOS: trialPeriodUnit,
    localizedPrice,
  } = popularSubscription ?? {};

  const trialDuration = Platform.OS === 'ios' ?
      moment.duration(trialPeriod, trialPeriodUnit) :
      moment.duration(popularSubscription?.freeTrialPeriodAndroid);
  const subscriptionDuration = Platform.OS === 'ios' ?
      moment.duration(subPeriod, subPeriodUnit) :
      moment.duration(popularSubscription?.subscriptionPeriodAndroid);

  const firstLineText = `Start your free ${trialDuration.humanize()} trial,`;
  const secondLineText = `then ${localizedPrice} / ${subscriptionDuration.humanize()}`;

  return (
      <OnBoardingTemplate bottomBar={<TrialOfferButton holding={loading} topText={firstLineText} bottomText={secondLineText}/>}>
        <View style={styles.content}>
          <OnBoardingContainer>
            <OnBoardingTitle text="The First Week's On Us" />
            <TrialOfferHeader text="Try subscription for free, cancel any time." />
            <TrialOfferTestimonials style={styles.testimonials} />
            <TrialOfferPackageDetails />
            <Terms style={styles.terms} textStyle={styles.termsText} />
          </OnBoardingContainer>
        </View>
      </OnBoardingTemplate>
  );
};

TrialOffer.Header = (props) => (
    <OnBoardingHeader
        {...props}
        skipButton
        backButton
        onSkip={() => props.navigation.push('Recommendations')}
    />
);

export default TrialOffer;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  testimonials: {
    marginTop: Layout.padding,
    marginBottom: Layout.padding,
  },
  terms: {
    flex: 0,
    padding: 0,
    paddingLeft: Layout.padding,
    paddingRight: Layout.padding,
  },
  termsText: {
    fontSize: 12,
    color: Colors.silver,
  },
});
