import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {withTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {BoldText, RegularText, ScreenScrollView} from '../../layout';
import {LoadingFullScreen} from '../../loading';
import PlanHOC from './PlanHOC';
import {Colors, Layout} from '../../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Plan = ({loading, navigation, plan, profile, stripe, onUpdate, t}) => {
  if (loading) {
    return <LoadingFullScreen secondary hideImage />;
  }

  const {name, status, nextCharge} = plan;
  const {customer, subscription} = stripe;

  const sections = [
    {
      title: t('details'),
      data: [
        {label: t('plan'), value: profile.isAdmin ? t('admin') : name},
        {
          label: t('status'),
          value: `${status.charAt(0).toUpperCase()}${status.substr(1)}`,
        },
      ],
    },
  ];

  if (!profile.isAdmin && subscription) {
    sections[0].data.push({
      label: t('nextCharge'),
      value: moment(nextCharge).format('ll'),
    });
  }

  if (subscription && !profile.isAdmin) {
    sections[0].data.push({
      label: t('modifyPlan'),
      screen: 'ModifyPlan',
      isIAP: false,
    });
  }

  if (!subscription && !profile.isAdmin) {
    sections[0].data.push({label: t('modifyPlan'), screen: 'Paywall'});
  }

  if (customer && customer.sources && customer.sources.data) {
    const card = customer.sources.data[0];
    const {last4, exp_month, exp_year} = card;

    sections.push({
      title: t('card'),
      data: [
        {label: t('number'), value: `...${last4}`},
        {label: t('expiresAt'), value: `${exp_month}/${exp_year}`},
        // {label: t('updateCard'), screen: 'UpdateCard'},
      ],
    });
  }
  return (
    <ScreenScrollView>
      {sections.map((section) => (
        <Fragment key={section.title}>
          <BoldText style={styles.title}>{section.title}</BoldText>
          {section.data.map(({label, value, screen, isIAP}) => (
            <Fragment key={label}>
              {screen ? (
                <TouchableOpacity
                  onPress={() => navigation.push(screen, {onUpdate, isIAP})}
                  style={styles.item}>
                  <RegularText>{label}</RegularText>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={24}
                    color={Colors.white}
                  />
                </TouchableOpacity>
              ) : (
                <View style={styles.item}>
                  <RegularText>{label}</RegularText>
                  <RegularText>{value}</RegularText>
                </View>
              )}
            </Fragment>
          ))}
        </Fragment>
      ))}
    </ScreenScrollView>
  );
};

Plan.propTypes = {
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  plan: PropTypes.objectOf(PropTypes.any).isRequired,
  profile: PropTypes.objectOf(PropTypes.any).isRequired,
  stripe: PropTypes.objectOf(PropTypes.any).isRequired,
  onUpdate: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default PlanHOC(withTranslation('planComponent')(Plan));

const styles = StyleSheet.create({
  title: {
    padding: Layout.padding,
    paddingTop: Layout.halfPadding,
    paddingBottom: Layout.halfPadding,
    backgroundColor: Colors.separator,
  },
  item: {
    padding: Layout.padding,
    borderBottomWidth: 1,
    borderColor: Colors.separator,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
