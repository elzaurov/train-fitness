import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, View} from 'react-native';
import {RegularText} from '../../layout';
import {DesignedByIcon} from '../../svg';
import {Specialist} from '../../common';
import {Colors, Layout} from '../../../constants';

const LearningVideoDetails = ({learningVideo, t}) => {
  const {designedBy, description, name} = learningVideo;

  return (
    <ScrollView bounces={false}>
      <View style={styles.container}>
        {!!name && <RegularText style={styles.name}>{name}</RegularText>}
        {!!description && (
          <View style={styles.section}>
            <RegularText style={styles.title}>{t('description')}</RegularText>
            <RegularText style={styles.item}>{description}</RegularText>
          </View>
        )}
        {!!designedBy && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <DesignedByIcon
                style={styles.icon}
                fill={Colors.dustyGray}
                size={14}
              />
              <RegularText style={styles.title}>{t('designedBy')}</RegularText>
            </View>
            <Specialist id={designedBy} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

LearningVideoDetails.propTypes = {
  learningVideo: PropTypes.objectOf(PropTypes.any).isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('learningVideoDetailsComponent')(
  LearningVideoDetails,
);

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
  },
  drillSetup: {
    height: Layout.window.width - Layout.padding * 2,
    width: Layout.window.width - Layout.padding * 2,
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
