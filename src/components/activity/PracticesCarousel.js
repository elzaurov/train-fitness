import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-snap-carousel';
import {Layout, Colors} from '../../constants';
import {Requirements, Section} from '..';
import ExperienceEarning from './earnings/ExperienceEarning';
import FeaturedPeople from './FeaturedPeople';

const PracticesCarousel = ({practices, onPracticeSelect}) => (
  <Carousel
    layout="default"
    data={practices}
    sliderWidth={Layout.window.width}
    itemWidth={Layout.window.width * 0.8}
    style={styles.carousesl}
    renderItem={({item: practice}) => {
      let content = [];

      if (practice.requirements) {
        const youWillNeed = (
          <Section
            key="you-will-need"
            title="You will need"
            style={styles.requirements}>
            <Requirements
              style={styles.requirements}
              imageStyle={{
                width: 32,
                height: 32,
              }}
              itemStyle={{
                width: '33.33%',
              }}
              requirements={{
                equipments:
                  practice.requirements.equipments &&
                  practice.requirements.equipments.slice(0, 3),
                knowledge:
                  practice.requirements.knowledge &&
                  practice.requirements.knowledge.slice(0, 3),
              }}
            />
          </Section>
        );

        content.push(youWillNeed);
      }

      if (practice.designedBy || practice.createdBy || practice.earnings) {
        const moreInfo = (
          <View key="more-info" style={styles.moreInfo}>
            {(practice.designedBy || practice.createdBy) && (
              <FeaturedPeople
                title="Designed By"
                people={[practice.designedBy || practice.createdBy]}
                style={styles.designedBy}
                showDescription={false}
              />
            )}
            {practice.earnings && practice.earnings.experience && (
              <ExperienceEarning
                style={styles.experience}
                experience={practice.earnings.experience}
              />
            )}
          </View>
        );

        content.push(moreInfo);
      }

      if (Layout.window.width <= 375) {
        content = content.slice(0, 1);
      }

      return (
        <TouchableOpacity
          style={styles.program}
          onPress={() => onPracticeSelect(practice.key)}>
          <FastImage
            style={styles.thumbnail}
            source={{uri: practice.thumbnail}}
          />
          <View style={styles.content}>{content}</View>
        </TouchableOpacity>
      );
    }}
  />
);

PracticesCarousel.propTypes = {
  practices: PropTypes.array.isRequired,
  onPracticeSelect: PropTypes.func.isRequired,
};

export default PracticesCarousel;

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
  },
  program: {
    flex: 1,
    backgroundColor: Colors.mineShaft,
    borderRadius: 5,
    overflow: 'hidden',
  },
  thumbnail: {
    backgroundColor: Colors.emperor,
    flex: 1,
    maxHeight: '50%',
  },
  moreInfo: {
    flexDirection: 'row',
  },
  designedBy: {
    flex: 1,
  },
  experience: {
    flex: 0,
    padding: 8,
    margin: Layout.padding,
  },
});
