import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  BallIcon,
  DesignedByIcon,
  DrillSetupIcon,
  EquipmentIcon,
  HowIcon,
  IntendedResultsIcon,
  RSRIcon,
} from '../../svg';
import {RegularText} from '../../layout';
import {Specialist, CachedImage} from '../../common';
import {Colors, Layout} from '../../../constants';
import ExerciseDetailsHOC from './ExerciseDetailsHOC';

const ExerciseDetails = ({categories, exercise, t}) => {
  const {
    designedBy,
    drillSetup,
    equipments,
    how,
    intendedResults,
    name,
    rsr,
  } = exercise;

  const sections = [
    {
      title: 'how',
      data: how || [],
      Icon: HowIcon,
    },
    {
      title: 'rsr',
      data: rsr
        ? [
            `${t('recovery')}: ${rsr.recovery}`,
            `${t('reps')}: ${rsr.reps}`,
            `${t('sets')}: ${rsr.sets}`,
          ]
        : [],
      Icon: RSRIcon,
    },
    {
      title: 'equipments',
      data: equipments || [],
      Icon: EquipmentIcon,
    },
    {
      title: 'intendedResult',
      data: intendedResults ? [intendedResults] : [],
      Icon: IntendedResultsIcon,
    },
    {
      title: 'categories',
      data: categories || [],
      Icon: BallIcon,
    },
  ];

  const sectionComponents = sections.map(({title, data, Icon}) => {
    if (data.length === 0) {
      return null;
    }

    return (
      <View key={title} style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon style={styles.icon} fill={Colors.dustyGray} size={14} />
          <RegularText style={styles.title}>{t(title)}</RegularText>
        </View>
        {data.map((item) => (
          <RegularText key={item} style={styles.item}>
            {data.length > 1 ? '- ' : ''}
            {item}
          </RegularText>
        ))}
      </View>
    );
  });

  return (
    <ScrollView bounces={false}>
      <View style={styles.container}>
        {!!name && <RegularText style={styles.name}>{name}</RegularText>}
        {sectionComponents}
        {!!drillSetup && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <DrillSetupIcon
                style={styles.icon}
                fill={Colors.dustyGray}
                size={14}
              />
              <RegularText style={styles.title}>{t('drillSetup')}</RegularText>
            </View>
            <CachedImage
              style={styles.image}
              width={Layout.window.width - Layout.padding * 2}
              source={{uri: drillSetup}}
            />
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

ExerciseDetails.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  exercise: PropTypes.objectOf(PropTypes.any).isRequired,
  t: PropTypes.func.isRequired,
};

export default ExerciseDetailsHOC(
  withTranslation('exerciseDetailsComponent')(ExerciseDetails),
);

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
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
  image: {
    resizeMode: 'cover',
  },
});
