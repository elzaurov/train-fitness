import React from 'react';
import {View, ViewPropTypes, StyleSheet} from 'react-native';
import {TitleText} from '../../layout';
import {Swiper} from '../../common';
import CoachSlide from './CoachSlide';
import rioFerdinand from '../../../assets/images/paywall/coaches/rio-ferdinand.png';
import nickHarvey from '../../../assets/images/paywall/coaches/nick-harvey.png';
import steveCorns from '../../../assets/images/paywall/coaches/steve-corns.png';
import tomCooper from '../../../assets/images/paywall/coaches/tom-cooper.png';
import johnMoses from '../../../assets/images/paywall/coaches/john-moses.png';
import martinEdwards from '../../../assets/images/paywall/coaches/martin-edwards.png';

const CoachesSwiper = ({style}) => (
  <View style={style}>
    <TitleText style={styles.titleText}>Meet your new coaches!</TitleText>
    <Swiper swiperStyle={styles.swiper}>
      <CoachSlide
        name="Rio Ferdinand"
        description="Manchester United Legend"
        imgSource={rioFerdinand}
      />
      <CoachSlide
        name="Nick Harvey"
        description="England Strength Coach"
        imgSource={nickHarvey}
      />
      <CoachSlide
        name="Steve Corns"
        description="Stoke City First Team Analyst"
        imgSource={steveCorns}
      />
      <CoachSlide
        name="Tom Cooper"
        description="UEFA Performance Analyst"
        imgSource={tomCooper}
      />
      <CoachSlide
        name="John Moses"
        description="Former International Player"
        imgSource={johnMoses}
      />
      <CoachSlide
        name="Martin Edwards"
        description="Former Tottenham Hotspur Goalkeeping Coach"
        imgSource={martinEdwards}
      />
    </Swiper>
  </View>
);

CoachesSwiper.propTypes = {
  style: ViewPropTypes.style,
};

CoachesSwiper.defaultProps = {
  style: {},
};

export default CoachesSwiper;

const styles = StyleSheet.create({
  swiper: {
    aspectRatio: 1 / 1,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 14,
  },
});
