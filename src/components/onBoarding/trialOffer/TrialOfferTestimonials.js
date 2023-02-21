import React from 'react';
import {StyleSheet, ViewPropTypes} from 'react-native';
import {Swiper} from '../../common';
import TrialOfferTestimonial from './TrialOfferTestimonial';

import salihoToure from '../../../assets/images/onBoarding/avatar-saliho-toure.png';
import jaydeeNicholson from '../../../assets/images/onBoarding/avatar-jaydee-nicholson.png';
import connorMorrissey from '../../../assets/images/onBoarding/avatar-connor-morrissey.jpg';
import kathyBaumann from '../../../assets/images/onBoarding/avatar-kathi-baumann.jpg';

const testimonials = [
  {
    name: 'Saliho Toure',
    club: 'American University (D1)',
    testimonial: 'Train Effective has helped me get into a D1 college.',
    image: salihoToure,
  },
  {
    name: 'Jaydee Nicholson',
    club: 'Nike Academy "The Chance" winner',
    testimonial: 'The best football tool around.',
    image: jaydeeNicholson,
  },
  {
    name: 'Katharina Baumann',
    club: 'FC Köln',
    testimonial:
      'Train Effective does not only offer pro drills, it also helps you to become a smarter player.',
    image: kathyBaumann,
  },
  {
    name: 'Connor Morrissey',
    club: 'Manchester City Academy Analyst',
    testimonial:
      'Train Effective covers everything we do in our academy. You train & develop as a pro would.',
    image: connorMorrissey,
  },
];

const TrialOfferTestimonials = ({style}) => (
  <Swiper
    style={[styles.container, style]}
    autoplay
    autoplayTimeout={3}
    dots={false}>
    {testimonials.map((testimonial) => (
      <TrialOfferTestimonial key={testimonial.name} {...testimonial} />
    ))}
  </Swiper>
);

TrialOfferTestimonials.propTypes = {
  style: ViewPropTypes.style,
};

TrialOfferTestimonials.defaultProps = {
  style: null,
};

export default TrialOfferTestimonials;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
