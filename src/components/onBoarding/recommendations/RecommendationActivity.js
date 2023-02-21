import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {CachedImage, UIBadge} from '../../common';
import {Colors, Layout} from '../../../constants';
import {PremiumWrapper} from '../../premium';

const RecommendationActivity = ({thumbnail, isPremium}) => (
  <PremiumWrapper style={styles.container} isPremium={isPremium} overlay>
    <CachedImage
      style={styles.image}
      source={{uri: thumbnail}}
      resizeMode="contain"
    />
    <View style={styles.badgeContainer}>
      <UIBadge
        style={styles.badge}
        textStyle={styles.badgeText}
        text="Recommended for you"
      />
    </View>
  </PremiumWrapper>
);

RecommendationActivity.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  isPremium: PropTypes.bool,
};

RecommendationActivity.defaultProps = {
  isPremium: false,
};

export default RecommendationActivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Colors.mineShaft,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowColor: Colors.black2,
    margin: Layout.padding,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    alignItems: 'center',
    padding: Layout.padding,
  },
  badgeText: {
    textTransform: 'capitalize',
  },
});
