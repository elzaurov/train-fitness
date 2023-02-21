import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { OnBoardingContainer, OnBoardingTemplate, IconButton, RegularText, BoldText } from '../../layout';
import {Colors, Layout} from '../../../constants';
const SECTION_HEIGHT = (Layout.padding * 2 + 40 * 1.5) / 2;

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
import { Loading } from '../../loading';
import { Rect } from 'react-content-loader/native';

const TrialOfferModified = () => {
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

  return (
      <OnBoardingTemplate>
        <View style={styles.content}>
          <OnBoardingContainer contentStyle={styles.bottomPage}>
            <OnBoardingTitle text="The First Week's On Us" />
            <TrialOfferHeader text="Try a subscription for free, cancel any time." />
            <TrialOfferTestimonials style={styles.testimonials} />
            {loading ? (
                <Loading
                    viewBox="0 0 100 20"
                    height={SECTION_HEIGHT}
                    style={{width: '100%', height: SECTION_HEIGHT}}>
                  <Rect x={10} y={3} width={80} height={10} rx={1} />
                </Loading>
            ) : (popularSubscription && (
                <View style={styles.detailsBox}>
                  <RegularText style={styles.detailsText}>
                    {trialDuration.humanize()} free trial, then
                  </RegularText>
                  <BoldText style={styles.detailsText}>
                    {localizedPrice} / {subscriptionDuration.humanize()}
                  </BoldText>
                </View>
            ))}
            <View style={styles.buttonWrapper}>
              <TrialOfferButton topText="START MY FREE TRIAL" style={styles.button}/>
            </View>
            <TrialOfferPackageDetails />
            <Terms style={styles.terms} textStyle={styles.termsText} />
          </OnBoardingContainer>
        </View>
      </OnBoardingTemplate>
  );
}

TrialOfferModified.Header = (props) => (
    <OnBoardingHeader
        {...props}
        skipButton
        backButton={false}
        onSkip={() => props.navigation.push('Recommendations')}
        skipButtonComponent={(props) => (
            <IconButton
                {...props}
                icon="close"
                iconSize={24}
          />
        )}
    />
);

export default TrialOfferModified;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  header: {
    opacity: 0,
  },
  testimonials: {
    marginTop: Layout.padding / 2,
    marginBottom: 0,
  },
  terms: {
    flex: 0,
    padding: 0,
    marginTop: 4,
    paddingLeft: Layout.padding,
    paddingRight: Layout.padding,
  },
  termsText: {
    fontSize: 12,
    color: Colors.silver,
  },
  button: {
    height: 48,
    justifyContent: 'center',
  },
  buttonWrapper: {
    paddingLeft: Layout.padding,
    paddingRight: Layout.padding,
    paddingBottom: Layout.padding / 2,
  },
  detailsBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  detailsText: {
    fontSize: 16,
    padding: 2,
    marginBottom: Layout.padding / 2,
  },
  bottomPage: {
    paddingTop: Layout.padding * 3,
    paddingBottom: Layout.padding,
  }
});
