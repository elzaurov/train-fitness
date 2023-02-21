import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, View} from 'react-native';
import {EquipmentIcon, IntendedResultsIcon} from '../../svg';
import {CollapsibleView, RegularText} from '../../layout';
import {Colors, Layout} from '../../../constants';

const ProgramDetails = ({program, t}) => {
  const {description, equipments, intendedResults, name, tips} = program;

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

  const sectionComponents = sections
    .filter((item) => item.data && item.data.length)
    .map(({title, data, Icon}, index) => {
      return (
        <View key={title} style={styles.section}>
          <CollapsibleView title={t(title)} initialCollapsed={index !== 0}>
            {data.map((item) => (
              <RegularText key={item} style={styles.item}>
                {data.length > 1 ? '- ' : ''}
                {item}
              </RegularText>
            ))}
          </CollapsibleView>
        </View>
      );
    });

  return (
    <ScrollView bounces={false}>
      <View style={styles.container}>
        <RegularText style={styles.name}>{name}</RegularText>
        {sectionComponents}
      </View>
    </ScrollView>
  );
};

ProgramDetails.propTypes = {
  program: PropTypes.objectOf(PropTypes.any).isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('programDetailsComponent')(ProgramDetails);

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
  },
  container: {
    paddingTop: Layout.padding,
    paddingBottom: Layout.padding,
  },
  name: {
    fontSize: 16,
    paddingRight: Layout.padding,
    paddingLeft: Layout.padding,
    marginTop: Layout.margin / 2,
    marginBottom: Layout.margin / 2,
  },
  title: {
    color: Colors.dustyGray,
    marginTop: Layout.margin / 2,
    marginBottom: Layout.margin / 2,
  },
  item: {},
});
