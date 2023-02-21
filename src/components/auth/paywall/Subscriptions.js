import React, {useEffect, useState} from 'react';
import {StyleSheet, ImageBackground, SafeAreaView, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Layout} from '../../../constants';
import {useSubscriptions} from '../../../hooks';
import {BottomBarTemplate, Button, RegularText} from '../../layout';
import SubscriptionPlans from './SubscriptionPlans';
import PaywallHeader from './PaywallHeader';
import Terms from './Terms';

import backgroundImage from '../../../assets/images/paywall/ball-background.jpg';

const Subscriptions = () => {
  const {
    loading,
    subscribing,
    subscriptions,
    popularSubscription,
    subscribe,
  } = useSubscriptions();

  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setSelectedSubscriptionId(popularSubscription?.productId);
  }, [popularSubscription]);

  const handleSubscribePress = async () => {
    const verified = await subscribe(selectedSubscriptionId, true);

    if (verified) {
      navigation.navigate('PaymentSuccess');
    }
  };

  const handleSubscriptionSelect = (id) => {
    setSelectedSubscriptionId(id);
  };

  return (
    <BottomBarTemplate
      bottomBar={
        <Button
          onPress={handleSubscribePress}
          loading={subscribing}
          disabled={!selectedSubscriptionId}>
          Try For Free And Subscribe
        </Button>
      }>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <SafeAreaView style={styles.container}>
          <View style={styles.contentContainer}>
            <PaywallHeader
              style={styles.header}
              title="Start your 7 day trial now!"
            />
            <SubscriptionPlans
              style={styles.plans}
              subscriptions={subscriptions}
              selectedSubscriptionId={selectedSubscriptionId}
              popularSubscriptionId={popularSubscription?.productId}
              onSubscriptionSelect={handleSubscriptionSelect}
              loading={loading}
              disabled={subscribing}
            />
            <RegularText style={styles.description}>
              Cancel anytime in your{' '}
              {Layout.isIOS ? 'App Store' : 'Google Play'} subscription settings
            </RegularText>
            <Terms style={styles.terms} />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </BottomBarTemplate>
  );
};

export default Subscriptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: Layout.padding,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  plans: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    textAlign: 'center',
    marginTop: 24,
  },
  terms: {
    flex: 0,
  },
});
