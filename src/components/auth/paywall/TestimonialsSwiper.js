import React from 'react';
import {View, ViewPropTypes, StyleSheet} from 'react-native';
import {TitleText} from '../../layout';
import {Swiper} from '../../common';
import TestimonialSlide from './TestimonialSlide';
import emilKonradsenCeide from '../../../assets/images/paywall/testimonials/emil-konradsen-ceide.png';
import gabeQuesada from '../../../assets/images/paywall/testimonials/gabe-quesada.png';
import jaydeeNicholson from '../../../assets/images/paywall/testimonials/jaydee-nicholson.png';
import kathrinaBaumann from '../../../assets/images/paywall/testimonials/kathrina-baumann.png';
import olleOlson from '../../../assets/images/paywall/testimonials/olle-olson.png';
import salihoToure from '../../../assets/images/paywall/testimonials/saliho-toure.png';
import shayanKhademi from '../../../assets/images/paywall/testimonials/shayan-khademi.png';

const TestimonialsSwiper = ({style}) => (
  <View style={{style}}>
    <TitleText style={styles.titleText}>
      Some of our users' experience
    </TitleText>
    <Swiper swiperStyle={styles.swiper}>
      <TestimonialSlide
        name="Jaydee Nicholson"
        description="Nike Academy “The Chance” Winner"
        testimonial="You’re going to be blown away by how many options there are inside Train Effective. The BEST Football tool around. I love it!"
        imgSource={jaydeeNicholson}
      />
      <TestimonialSlide
        name="Emil Konradsen Ceide"
        description="Rosenberg BK & Norway U/19 Player"
        successStory="From Haiti to one of Denmark’s Hottest Young Talents"
        imgSource={emilKonradsenCeide}
      />
      <TestimonialSlide
        name="Gabe Quesada"
        description="FC Boulder U23"
        testimonial="After two days, there is a significant increase in my confidence."
        imgSource={gabeQuesada}
      />
      <TestimonialSlide
        name="Olle Olson"
        description="Östersunds FK"
        successStory="From Local Swedish Side to Ostersunds FK"
        imgSource={olleOlson}
      />
      <TestimonialSlide
        name="Saliho Toure"
        description="NCAA Division 1 Player for U.S. university"
        testimonial="It’s helped me get into a D1 college soccer program"
        imgSource={salihoToure}
      />
      <TestimonialSlide
        name="Shayan Khademi"
        description="Leca FC"
        successStory="From Los Angeles to Professional in Portugal"
        imgSource={shayanKhademi}
      />
      <TestimonialSlide
        name="Katharina Baumann"
        description=" Professional Player at Eintracht Frankfurt"
        testimonial="Effective does not only offer drills but also helps you to become a smarter player."
        imgSource={kathrinaBaumann}
      />
    </Swiper>
  </View>
);

TestimonialsSwiper.propTypes = {
  style: ViewPropTypes.style,
};

TestimonialsSwiper.defaultProps = {
  style: {},
};

export default TestimonialsSwiper;

const styles = StyleSheet.create({
  swiper: {
    aspectRatio: 1 / 1,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 14,
  },
});
