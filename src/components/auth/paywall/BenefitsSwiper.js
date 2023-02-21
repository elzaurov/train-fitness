import React from 'react';
import {View, ViewPropTypes, StyleSheet, Image} from 'react-native';
import {Swiper} from '../../common';
import {TitleText} from '../../layout';

// Images
import courses from '../../../assets/images/paywall/benefits/swipe-1.png';
import exercises from '../../../assets/images/paywall/benefits/swipe-2.png';
import feed from '../../../assets/images/paywall/benefits/swipe-3.png';
import leaderboard from '../../../assets/images/paywall/benefits/swipe-4.png';
import tracker from '../../../assets/images/paywall/benefits/swipe-5.png';

const BenefitsSwiper = ({style}) => (
  <View style={style}>
    <TitleText style={styles.title}>Premium Benefits</TitleText>
    <Swiper swiperStyle={styles.swiper}>
      <Image style={styles.image} source={exercises} />
      <Image style={styles.image} source={feed} />
      <Image style={styles.image} source={courses} />
      <Image style={styles.image} source={tracker} />
      <Image style={styles.image} source={leaderboard} />
    </Swiper>
  </View>
);

BenefitsSwiper.propTypes = {
  style: ViewPropTypes.style,
};

BenefitsSwiper.defaultProps = {
  style: {},
};

export default BenefitsSwiper;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    textAlign: 'center',
  },
  swiper: {
    aspectRatio: 1 / 1,
  },
  image: {flex: 1, width: '100%', resizeMode: 'cover'},
});
