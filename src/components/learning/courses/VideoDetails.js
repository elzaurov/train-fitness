import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, View} from 'react-native';
import {BallIcon, DesignedByIcon} from '../../svg';
import {CollapsibleView, RegularText} from '../../layout';
import {Specialist} from '../../common';
import {Colors, Layout} from '../../../constants';
import VideoDetailsHOC from './VideoDetailsHOC';

const VideoDetails = ({categories, video, designedBy, t}) => {
  const {intendedResults, name, description} = video;

  const sections = [
    {
      title: 'description',
      data: [description],
    },
    {
      title: 'category',
      data: categories || [],
      Icon: BallIcon,
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
        {name && <RegularText style={styles.name}>{name}</RegularText>}
        {sectionComponents}
        {designedBy && (
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

VideoDetails.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  video: PropTypes.objectOf(PropTypes.any).isRequired,
  t: PropTypes.func.isRequired,
};

export default VideoDetailsHOC(
  withTranslation('videoDetailsComponent')(VideoDetails),
);

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
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
  description: {
    fontSize: 14,
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
