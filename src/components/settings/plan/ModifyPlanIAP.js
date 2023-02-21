import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Switch, View, Text, ScrollView} from 'react-native';
import {withTranslation} from 'react-i18next';
import Carousel from 'react-native-snap-carousel';
import {RegularText, IconButton, SafeArea} from '../../layout';
import ModifyPlanIAPHOC from './ModifyPlanIAPHOC';
import PlanItem from './PlanItem';
import PlanItemLoading from './PlanItemLoading';
import {Colors, Layout} from '../../../constants';

const ModifyPlanIAP = ({
  loading,
  // navigation,
  plan,
  plans,
  updating,
  updatingPlanId,
  yearly,
  isAuth,
  onSelectPlan,
  onToggleSwitch,
  onTermsClick,
  onPolicyClick,
  onBackToLogin,
  t,
}) => {
  if (loading) {
    plans = [
      {
        key: 0,
        yearly: false,
      },
      {
        key: 1,
        yearly: false,
      },
      {
        key: 2,
        yearly: false,
      },
    ];
  }

  const plansToggled = plans.filter((p) => p.yearly === yearly);
  const firstItem = plans.map((p) => p.id).indexOf(plan.id) || 0;

  return (
    <ScrollView style={styles.container}>
      <SafeArea color={Colors.background} />
      {isAuth && (
        <View>
          <View style={styles.titleWrapper}>
            <RegularText style={styles.title}>{t('selectAPlan')}</RegularText>
          </View>
          <IconButton
            style={styles.backButton}
            onPress={() => onBackToLogin()}
            icon="chevron-left"
            iconSize={33}
            iconColor={Colors.white}
          />
        </View>
      )}
      <View style={styles.switch}>
        <RegularText style={styles.switchText}>{t('quarterly')}</RegularText>
        <Switch
          onValueChange={onToggleSwitch}
          value={yearly}
          onTintColor={Colors.secondary}
          thumbTintColor={Layout.isIOS ? null : Colors.secondary}
        />
        <RegularText style={styles.switchText}>{t('yearly')}</RegularText>
      </View>
      <Carousel
        layout="default"
        firstItem={firstItem}
        ref={(c) => {
          this.carousel = c;
        }}
        data={plansToggled}
        renderItem={(props) => {
          if (loading) {
            return <PlanItemLoading />;
          }
          return (
            <PlanItem
              {...props}
              currentPlan={plan}
              updating={updating}
              updatingPlanId={updatingPlanId}
              onSelectPlan={onSelectPlan}
            />
          );
        }}
        sliderWidth={Layout.window.width - 32}
        itemWidth={Layout.window.width - 96}
      />
      <View style={styles.detailsContainer}>
        <RegularText style={styles.detail}>{t('paymentDetails')}.</RegularText>
        <RegularText style={styles.detail}>
          {t('acceptText')}
          <Text onPress={onTermsClick} style={styles.terms}>
            {t('terms')}
          </Text>
          {t('and')}
          <Text onPress={onPolicyClick} style={styles.terms}>
            {t('policy')}
          </Text>
          .
        </RegularText>
      </View>
    </ScrollView>
  );
};

ModifyPlanIAP.propTypes = {
  // navigation: PropTypes.object.isRequired,
  loading: PropTypes.any.isRequired,
  plan: PropTypes.any.isRequired,
  // eslint-disable-next-line react/require-default-props
  plans: PropTypes.any,
  // eslint-disable-next-line react/require-default-props
  updatingPlanId: PropTypes.any,
  // eslint-disable-next-line react/require-default-props
  isAuth: PropTypes.any,
  updating: PropTypes.bool.isRequired,
  yearly: PropTypes.bool.isRequired,
  onToggleSwitch: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  onSelectPlan: PropTypes.func.isRequired,
  onTermsClick: PropTypes.func.isRequired,
  onPolicyClick: PropTypes.func.isRequired,
  onBackToLogin: PropTypes.func.isRequired,
};

export default ModifyPlanIAPHOC(
  withTranslation('modifyPlanComponent')(ModifyPlanIAP),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: Layout.padding / 2,
    top: Layout.padding - 7,
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.margin,
  },
  switchText: {
    marginLeft: Layout.halfMargin,
    marginRight: Layout.halfMargin,
  },
  detailsContainer: {
    marginLeft: 2 * Layout.halfMargin,
    marginRight: 2 * Layout.halfMargin,
    marginBottom: 2 * Layout.margin,
  },
  detail: {
    textAlign: 'center',
    marginTop: Layout.margin,
    color: Colors.dustyGray,
  },
  terms: {
    color: Colors.secondary,
    marginBottom: 0,
    paddingBottom: 0,
    fontSize: 13.5,
  },
  title: {
    paddingLeft: Layout.padding,
    paddingRight: Layout.padding,
    marginBottom: 20,
    fontSize: 30,
    textAlign: 'center',
  },
});
