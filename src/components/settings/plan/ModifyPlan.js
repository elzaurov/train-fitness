import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {withTranslation} from 'react-i18next';
import {RegularText} from '../../layout';
import {Layout} from '../../../constants';
import ModifyPlanHOC from './ModifyPlanHOC';

const ModifyPlan = ({loading, t}) => {
  if (loading) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <RegularText style={styles.manageText}>
          {t('manageYourAccount')}
        </RegularText>
      </View>
    </View>
  );
};

ModifyPlan.propTypes = {
  loading: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default ModifyPlanHOC(
  withTranslation('modifyPlanComponent')(ModifyPlan),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    paddingLeft: Layout.padding,
    paddingRight: Layout.padding,
  },
  manageText: {
    fontSize: 15,
  },
});
