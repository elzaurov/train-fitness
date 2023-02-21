import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {withTranslation} from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, TitleText, RegularText} from '../../layout';
import {Colors, Layout} from '../../../constants';

const PlanItem = ({
  currentPlan,
  item,
  updating,
  updatingPlanId,
  onSelectPlan,
  t,
}) => {
  const {
    id,
    identifier,
    name,
    price,
    period,
    yearly,
    features,
    notAvailableFeatures,
    currencySymbol,
  } = item;

  const monthPrice = (yearly ? price / 12 : price / 3).toFixed(2);
  const buttonText = updatingPlanId === id ? t('updating') : t('select');

  return (
    <View style={styles.plan}>
      <View style={styles.content}>
        <TitleText style={styles.title}>{name}</TitleText>
        <View style={styles.price}>
          <RegularText style={styles.text}>{currencySymbol}</RegularText>
          <RegularText style={styles.priceText}>{price.toFixed(2)}</RegularText>
          <RegularText style={styles.text}>/ {period}</RegularText>
        </View>

        <RegularText style={styles.billed}>
          {yearly ? '12' : '3'} months at {currencySymbol}
          {monthPrice}/mo
        </RegularText>

        <View>
          {features.map((feature) => (
            <View key={feature.name} style={styles.feature}>
              <MaterialCommunityIcons
                style={styles.icon}
                name="check"
                size={18}
                color={Colors.green}
              />
              <RegularText style={styles.text}>{feature.name}</RegularText>
            </View>
          ))}
          {notAvailableFeatures.map((feature) => (
            <View key={feature.name} style={styles.feature}>
              <MaterialCommunityIcons
                style={styles.naIcon}
                name="close"
                size={18}
                color={Colors.secondary}
              />
              <RegularText style={styles.notAvailableFeature}>
                {feature.name}
              </RegularText>
            </View>
          ))}
        </View>
        <Button
          style={styles.button}
          disabled={
            (currentPlan.id === id && currentPlan.status !== 'canceled') ||
            updating
          }
          onPress={() => onSelectPlan(Layout.isIOS ? identifier : id)}>
          {currentPlan.id === id ? t('current') : buttonText}
        </Button>
      </View>
    </View>
  );
};

PlanItem.propTypes = {
  currentPlan: PropTypes.objectOf(PropTypes.any).isRequired,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  updating: PropTypes.bool.isRequired,
  updatingPlanId: PropTypes.string,
  onSelectPlan: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

PlanItem.defaultProps = {
  updatingPlanId: undefined,
};

export default withTranslation('planItemComponent')(PlanItem);

const styles = StyleSheet.create({
  plan: {
    borderRadius: 2,
    overflow: 'hidden',
  },
  content: {
    backgroundColor: Colors.white,
    padding: Layout.padding,
    width: '100%',
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  billed: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.black,
    marginBottom: Layout.margin,
  },
  save: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.secondary,
    marginBottom: Layout.margin,
  },
  priceText: {
    fontSize: 24,
    color: Colors.black,
  },
  title: {
    textAlign: 'center',
    color: Colors.black,
    marginBottom: Layout.halfMargin / 3,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  icon: {
    marginRight: 6,
    marginTop: 3,
  },
  naIcon: {
    opacity: 0.5,
    marginTop: 3,
    marginRight: 6,
  },
  text: {
    color: Colors.black,
  },
  notAvailableFeature: {
    color: Colors.dustyGray,
  },
  button: {
    marginTop: Layout.margin,
  },
});
