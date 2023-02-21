import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, StyleSheet, Text} from 'react-native';
import {RegularText} from '../../layout';
import {Colors, Layout} from '../../../constants';

const AVATAR_SIZE = Layout.isSmallDevice ? 72 : 96;

const TrialOfferTestimonials = ({name, club, testimonial, image}) => (
  <View style={styles.container}>
    <View style={styles.contentContainer}>
      <View style={styles.headerContainer}>
        <RegularText style={styles.name}>{name}</RegularText>
        <RegularText style={styles.club}>{club}</RegularText>
      </View>
      <View style={styles.testimonialContainer}>
        <RegularText style={styles.testimonial}>
          <Text>“</Text>
          {testimonial}
          <Text>”</Text>
        </RegularText>
      </View>
    </View>
    <Image source={image} style={styles.image} />
  </View>
);

TrialOfferTestimonials.propTypes = {
  name: PropTypes.string,
  club: PropTypes.string,
  testimonial: PropTypes.string,
  image: PropTypes.any,
};

TrialOfferTestimonials.defaultProps = {
  name: null,
  club: null,
  testimonial: null,
  image: null,
};

export default TrialOfferTestimonials;

const styles = StyleSheet.create({
  container: {
    margin: Layout.padding,
    flex: 1,
  },
  contentContainer: {
    marginTop: AVATAR_SIZE / 2,
    paddingTop: AVATAR_SIZE / 2 + Layout.padding / 2,
    paddingLeft: Layout.padding * 2,
    paddingRight: Layout.padding * 2,
    paddingBottom: Layout.padding,
    flex: 1,
    borderRadius: 8,
    backgroundColor: Colors.gray4,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowColor: Colors.black2,
  },
  headerContainer: {
    flex: 0,
    alignItems: 'center',
    marginBottom: Layout.padding / 2,
  },
  testimonialContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -AVATAR_SIZE / 2,
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden',
    resizeMode: 'cover',
    backgroundColor: Colors.silver,
    marginBottom: Layout.padding,
  },
  name: {
    fontSize: 16,
  },
  club: {
    fontSize: 12,
  },
  testimonial: {
    fontSize: Layout.isSmallDevice ? 18 : 24,
    textAlign: 'center',
  },
});
