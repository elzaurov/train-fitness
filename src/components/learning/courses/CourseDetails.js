import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {withTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, View} from 'react-native';
import {EquipmentIcon, IntendedResultsIcon} from '../../svg';
import {RegularText, Button, CollapsibleView} from '../../layout';
import {ProgressBar, Badge} from '../../common';
import {Colors, Layout} from '../../../constants';

const CourseDetails = ({course, progress, badge, onRemoveCourse, t}) => {
  const {
    name,
    description,
    equipments,
    intendedResults,
    tips,
    thumbnail,
  } = course;

  const sections = [
    {
      data: [],
      progress,
      Item: ProgressBar,
    },
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
    // {
    //   title: 'badge',
    //   data: Badge || [],
    // },
  ];

  const sectionComponents = sections
    .filter((item) => item.data && item.data.length)
    .map(({title, data, Icon, Item, progress}, index) => {
      if (Item && progress) {
        return (
          <Item
            key={progress}
            progress={progress}
            width={Layout.window.width - Layout.padding * 2}
          />
        );
      }
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
        <FastImage style={styles.thumbnail} source={{uri: thumbnail}} />
        <RegularText style={styles.name}>{name}</RegularText>
        {sectionComponents}
        {!!badge && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <RegularText style={styles.title}>{t('badge')}</RegularText>
            </View>
            <Badge badge={badge} />
          </View>
        )}
      </View>
      {!!progress && (
        <View>
          <Button
            style={styles.removeButton}
            onPress={() => onRemoveCourse()}
            primary>
            {t('remove')}
          </Button>
        </View>
      )}
    </ScrollView>
  );
};

CourseDetails.propTypes = {
  course: PropTypes.objectOf(PropTypes.any).isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('courseDetailsComponent')(CourseDetails);

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
  badgeThumbnail: {
    height: (Layout.window.width - Layout.padding * 2) / 2,
    width: (Layout.window.width - Layout.padding * 2) / 2,
  },
  name: {
    fontSize: 16,
    marginTop: Layout.margin / 2,
    marginBottom: Layout.margin / 2,
  },
  section: {
    marginLeft: -Layout.padding,
    marginRight: -Layout.padding,
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
  footer: {},
  removeButton: {
    borderRadius: 0,
  },
});
