import React from 'react';
import PropTypes from 'prop-types';
import {View, ViewPropTypes, StyleSheet} from 'react-native';

import SubscriptionPlan from './SubscriptionPlan';
import SubscriptionLoading from './SubscriptionLoading';

const Subscriptions = ({
  subscriptions,
  selectedSubscriptionId,
  popularSubscriptionId,
  onSubscriptionSelect,
  style,
  loading,
  disabled,
}) => {
  if (loading) {
    return <SubscriptionLoading />;
  }

  return (
    <View style={style}>
      {subscriptions
        ?.sort((a, b) => a.price - b.price)
        .map((subscription) => (
          <SubscriptionPlan
            style={styles.plan}
            disabled={disabled}
            key={subscription.productId}
            id={subscription.productId}
            popular={subscription.productId === popularSubscriptionId}
            title={subscription.title}
            description={subscription.description}
            price={subscription.localizedPrice}
            selected={selectedSubscriptionId === subscription.productId}
            onSelect={onSubscriptionSelect}
          />
        ))}
    </View>
  );
};

Subscriptions.propTypes = {
  subscriptions: PropTypes.array,
  selectedSubscriptionId: PropTypes.bool,
  popularSubscriptionId: PropTypes.string,
  onSubscriptionSelect: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  style: ViewPropTypes.style,
};

Subscriptions.defaultProps = {
  subscriptions: null,
  selectedSubscriptionId: false,
  popularSubscriptionId: null,
  onSubscriptionSelect: () => {},
  loading: false,
  disabled: false,
  style: {},
};

export default Subscriptions;

const styles = StyleSheet.create({
  plan: {
    marginBottom: 8,
  },
});
