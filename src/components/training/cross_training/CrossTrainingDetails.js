import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, View} from 'react-native';
import {CollapsibleView, RegularText} from '../../layout';
import {Colors, Layout} from '../../../constants';

const CrossTrainingDetails = ({crossTraining, t}) => {
  const {description, name} = crossTraining;

  return (
    <ScrollView bounces={false}>
      <View style={styles.container}>
        {!!name && <RegularText style={styles.name}>{name}</RegularText>}
        {!!description && (
          <CollapsibleView style={styles.section} title={t('description')} initialCollapsed={false}>
            <RegularText style={styles.item}>{description}</RegularText>
          </CollapsibleView>
        )}
      </View>
    </ScrollView>
  );
};

CrossTrainingDetails.propTypes = {
  crossTraining: PropTypes.objectOf(PropTypes.any).isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('crossTrainingDetailsComponent')(
  CrossTrainingDetails,
);

const styles = StyleSheet.create({
  drillSetup: {
    height: Layout.window.width - Layout.padding * 2,
    width: Layout.window.width - Layout.padding * 2,
  },
  section: {
    marginLeft: -Layout.padding,
    marginRight: -Layout.padding,
  },
  name: {
    fontSize: 16,
    marginTop: Layout.margin / 2,
    marginBottom: Layout.margin / 2,
  },
  container: {
    padding: Layout.padding,
  },
  title: {
    color: Colors.dustyGray,
    marginTop: Layout.margin / 2,
    marginBottom: Layout.margin / 2,
  },
  item: {},
});
