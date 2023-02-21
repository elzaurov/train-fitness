import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ViewPropTypes} from 'react-native';
import RNSwiper from 'react-native-swiper';
import {Colors} from '../../constants';

const Swiper = ({children, style, swiperStyle, dots, ...rest}) => (
  <View style={[style]}>
    <RNSwiper
      containerStyle={StyleSheet.flatten([styles.container, swiperStyle])}
      showButton={false}
      dotStyle={dots ? [styles.dot, styles.inactiveDot] : styles.dotsHidden}
      activeDotStyle={dots ? [styles.dot, styles.activeDot] : styles.dotsHidden}
      {...rest}>
      {children}
    </RNSwiper>
    {dots ? <View style={styles.sliderSpacer} /> : null}
  </View>
);

Swiper.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style,
  swiperStyle: ViewPropTypes.style,
  dots: PropTypes.bool,
};

Swiper.defaultProps = {
  children: null,
  style: {},
  swiperStyle: null,
  dots: true,
};

export default Swiper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderSpacer: {
    height: 50,
  },
  dot: {
    backgroundColor: Colors.white,
    marginBottom: -100,
  },
  dotsHidden: {
    display: 'none',
  },
  inactiveDot: {
    opacity: 0.4,
  },
  activeDot: {
    opacity: 0.9,
  },
});
