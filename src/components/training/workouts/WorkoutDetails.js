/* eslint-disable no-mixed-operators */
import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {EquipmentIcon, IntendedResultsIcon} from '../../svg';
import {RegularText} from '../../layout';
import {Colors, Layout} from '../../../constants';

const WorkoutDetails = ({workout, t}) => {
  const {
    name,
    description,
    equipments,
    intendedResults,
    tips,
    thumbnail,
  } = workout;

  const sections = [
    {
      title: 'description',
      data: [description],
    },
    {
      title: 'tips',
      data: tips || [],
    },
    {
      title: 'equipments',
      data: equipments || [],
      Icon: EquipmentIcon,
    },
    {
      title: 'intendedResult',
      data: intendedResults || [],
      Icon: IntendedResultsIcon,
    },
  ];

  const sectionComponents = sections.map(({title, data, Icon}) => {
    if (data.length === 0) {
      return null;
    }

    return (
      <View key={title} style={styles.section}>
        <View style={styles.sectionHeader}>
          {Icon && (
            <Icon style={styles.icon} fill={Colors.dustyGray} size={14} />
          )}
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
        <FastImage style={styles.thumbnail} source={{uri: thumbnail}} />
        <RegularText style={styles.name}>{name}</RegularText>
        {sectionComponents}
      </View>
    </ScrollView>
  );
};

WorkoutDetails.propTypes = {
  workout: PropTypes.objectOf(PropTypes.any).isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('workoutDetailsComponent')(WorkoutDetails);

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
  },
  thumbnail: {
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
