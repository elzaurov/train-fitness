import React from 'react';
import {Image, View, StyleSheet, ViewPropTypes} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RNSwiper from 'react-native-swiper';

// images
import bg1 from '../../assets/images/welcome/bg-1.jpg';
import bg2 from '../../assets/images/welcome/bg-2.jpg';
import {Colors} from '../../constants';

const COLOR_BACKGROUND_TRANSPARENT = `${Colors.background}00`;
const COLOR_BACKGROUND_OPAQUE = Colors.background;
const COLOR_BACKGROUND_SEMI_OPAQUE = `${Colors.background}99`;

const WelcomeImages = ({style}) => (
  <View style={[styles.container, style]}>
    <RNSwiper
      autoplay
      autoplayTimeout={5}
      dotStyle={styles.dotStyle}
      activeDotStyle={styles.dotStyle}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={bg2} />
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={bg1} />
      </View>
    </RNSwiper>
    <LinearGradient
      colors={[
        COLOR_BACKGROUND_SEMI_OPAQUE,
        COLOR_BACKGROUND_TRANSPARENT,
        COLOR_BACKGROUND_TRANSPARENT,
        COLOR_BACKGROUND_OPAQUE,
      ]}
      locations={[0, 0.2, 0.6, 1]}
      style={styles.gradient}
    />
  </View>
);

WelcomeImages.propTypes = {
  style: ViewPropTypes.style,
};

WelcomeImages.defaultProps = {
  style: null,
};

export default WelcomeImages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  dotStyle: {
    display: 'none',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
