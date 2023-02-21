import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Image, Text} from 'react-native';
import {RegularText} from '../../layout';
import {Layout, Colors} from '../../../constants';

const TestimonialSlide = ({
  name,
  description,
  testimonial,
  successStory,
  imgSource,
}) => (
  <View style={styles.container}>
    <Image source={imgSource} style={styles.image} />
    <View style={styles.textContainer}>
      {testimonial ? (
        <RegularText style={[styles.mainText, styles.testimonialText]}>
          <Text style={styles.quotation}>❝</Text>
          <Text style={styles.testimonialText} numberOfLines={3}>
            {testimonial}
          </Text>
          <Text style={styles.quotation}>❞</Text>
        </RegularText>
      ) : (
        <View style={styles.successStory}>
          <RegularText style={[styles.mainText, styles.successStoryTitle]}>
            Success Story
          </RegularText>
          <RegularText
            style={[styles.mainText, styles.successStoryDescription]}>
            {successStory}
          </RegularText>
        </View>
      )}
      <View style={styles.attestant}>
        <RegularText style={styles.name}>{name}</RegularText>
        <RegularText style={styles.description}>{description}</RegularText>
      </View>
    </View>
  </View>
);

TestimonialSlide.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  testimonial: PropTypes.string,
  successStory: PropTypes.string,
  imgSource: PropTypes.number,
};

TestimonialSlide.defaultProps = {
  name: null,
  description: null,
  testimonial: null,
  successStory: null,
  imgSource: null,
};

export default TestimonialSlide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    backgroundColor: `${Colors.background}88`,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  mainText: {
    alignSelf: 'stretch',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 16 * 1.5,
  },
  testimonialText: {
    padding: Layout.padding * 3,
  },
  successStory: {
    alignItems: 'center',
    padding: Layout.padding * 3,
  },
  successStoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Layout.padding,
  },
  successStoryDescription: {
    textAlign: 'center',
  },
  quotation: {
    fontSize: 20,
  },
  attestant: {
    flex: 0,
    alignSelf: 'flex-end',
    padding: Layout.padding,
  },
  name: {
    fontSize: 12,
    textAlign: 'right',
  },
  description: {
    fontSize: 10,
    textAlign: 'right',
  },
});
