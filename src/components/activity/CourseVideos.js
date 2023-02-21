import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Layout} from '../../constants';
import {Card, Section} from '../common';
import {PremiumWrapper} from '../premium';
import {RegularText} from '../layout';
import CourseVideosHOC from './CourseVideosHOC';
import SubItemsPlaceholder from './SubItemsPlaceholder';

const CourseVideos = ({videos, isPremium, title, onVideoSelect}) => (
  <Section title={title}>
    <PremiumWrapper
      isPremium={isPremium}
      placeholder={<SubItemsPlaceholder />}
      overlay>
      {videos.map((video) => (
        <TouchableOpacity
          key={video.key}
          onPress={() => onVideoSelect(video.key, video.type)}>
          <Card
            style={styles.videoCard}
            thumbnail={video.thumbnail}
            thumbnailStyle={styles.videoCardThumbnail}>
            <RegularText style={styles.name}>{video.name}</RegularText>
          </Card>
        </TouchableOpacity>
      ))}
    </PremiumWrapper>
  </Section>
);

CourseVideos.propTypes = {
  title: PropTypes.string,
  videos: PropTypes.array,
  onVideoSelect: PropTypes.func.isRequired,
  isPremium: PropTypes.bool,
};

CourseVideos.defaultProps = {
  title: 'Lessons',
  videos: [],
  isPremium: false,
};

export default CourseVideosHOC(CourseVideos);

const styles = StyleSheet.create({
  videoCard: {
    marginBottom: 16,
    minHeight: 90,
  },
  videoCardThumbnail: {
    minHeight: 90,
    width: 155,
  },
  videoName: {
    color: Colors.black,
    padding: Layout.padding,
  },
  name: {
    color: Colors.black,
    fontSize: 14,
    marginBottom: 8,
    width: '100%',
  },
});
