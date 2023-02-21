import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Button, RegularText} from '../layout';
import {Colors, Layout} from '../../constants';
import NotAvailableFeatureHOC from './NotAvailableFeatureHOC';

const NotAvailableFeature = ({navigation, t}) => (
  <View>
    <RegularText style={styles.featureNotAvailable}>
      {t('featureNotAvailable')}
    </RegularText>
    <Button onPress={() => navigation.push('Paywall')}>
      {t('modifyPlan')}
    </Button>
  </View>
);

NotAvailableFeature.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  t: PropTypes.func.isRequired,
};

export default NotAvailableFeatureHOC(
  withTranslation('notAvailableFeatureComponent')(NotAvailableFeature),
);

const styles = StyleSheet.create({
  featureNotAvailable: {
    borderColor: Colors.separator,
    borderWidth: 1,
    borderRadius: 2,
    padding: Layout.padding,
    marginBottom: Layout.margin,
  },
});
