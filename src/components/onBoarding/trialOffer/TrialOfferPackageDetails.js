import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { StyleSheet, View, ViewPropTypes, Platform } from 'react-native';
import { RegularText } from '../../layout';
import { Colors, Layout } from '../../../constants';
import TrialOfferPackageDetailsLoading from './TrialOfferPackageDetailsLoading';
import { useSubscriptions } from '../../../hooks';

const TrialOfferBottomBar = ({ style }) => {
  const { popularSubscription, loading } = useSubscriptions();

  if (loading) {
    return <TrialOfferPackageDetailsLoading />;
  }

  if (!popularSubscription) {
    return null;
  }

  const {
    introductoryPriceNumberOfPeriodsIOS: trialPeriod,
    introductoryPriceSubscriptionPeriodIOS: trialPeriodUnit,
  } = popularSubscription;

  const trialDuration = Platform.OS === 'ios' ?
    moment.duration(trialPeriod, trialPeriodUnit) :
    moment.duration(popularSubscription?.freeTrialPeriodAndroid);
  const chargeDate = moment().add(trialDuration);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.chargeDateContainer}>
        <RegularText style={styles.chargeDateText}>
          You won't be charged until {chargeDate.format('MMMM D')}
        </RegularText>
        <RegularText style={styles.chargeDateText}>
          Cancel up to 24 hours before your trial ends
        </RegularText>
      </View>
    </View>
  );
};

TrialOfferBottomBar.propTypes = {
  style: ViewPropTypes.style,
};

TrialOfferBottomBar.defaultProps = {
  style: null,
};

export default TrialOfferBottomBar;

const styles = StyleSheet.create({
  container: {
    paddingRight: Layout.padding * 2,
    paddingLeft: Layout.padding * 2,
  },
  package: {},
  packageText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: Layout.padding,
  },
  chargeDateText: {
    textAlign: 'center',
    color: Colors.silver,
    fontSize: 12,
  },
});
