import React from 'react';
import {View, StyleSheet, ViewPropTypes} from 'react-native';
import {Colors, Layout} from '../../../constants';
import {RegularText} from '../../layout';
import StarRating from 'react-native-star-rating';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TikTokIcon} from '../../svg';

const TE_SOCIAL_APP_RATING = 4.7;
const TE_SOCIAL_APP_REVIEWS = 500;

const ICON_SIZE = 32;
const STAR_SIZE = 24;

const socialRatings = {
  tiktok: {
    name: 'TikTok',
    icon: 'tiktok',
    followers: '165k',
  },
  instagram: {
    name: 'Instagram',
    icon: 'instagram',
    followers: '75k',
  },
  youtube: {
    name: 'YouTube',
    icon: 'youtube',
    followers: '70k',
  },
};

const TrialOfferSocialBrief = ({style}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.ratingContainer}>
        <RegularText style={styles.ratingTitle}>
          {`${TE_SOCIAL_APP_RATING} (+${TE_SOCIAL_APP_REVIEWS} Reviews)`}
        </RegularText>
        <StarRating
          fullStarColor={Colors.silver}
          emptyStarColor={Colors.silver}
          starSize={STAR_SIZE}
          disabled
          rating={TE_SOCIAL_APP_RATING}
        />
      </View>
      <View style={styles.socialContainer}>
        <RegularText style={styles.socialTitle}>
          Fans around the world
        </RegularText>
        <View style={styles.socialIconsContainer}>
          {Object.entries(socialRatings).map(([key, {icon, followers}]) => (
            <View style={styles.socialIconContainer}>
              {key === 'tiktok' ? (
                <View style={styles.tiktokIcon}>
                  <TikTokIcon size={ICON_SIZE * 0.8} color={Colors.silver} />
                </View>
              ) : (
                <MaterialCommunityIcons
                  key={key}
                  name={icon}
                  size={ICON_SIZE}
                  color={Colors.silver}
                />
              )}
              <RegularText style={styles.followersText}>
                {followers}
              </RegularText>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

TrialOfferSocialBrief.propTypes = {
  style: ViewPropTypes.style,
};

TrialOfferSocialBrief.defaultProps = {
  style: null,
};

export default TrialOfferSocialBrief;

const styles = StyleSheet.create({
  container: {
    paddingTop: Layout.padding / 2,
    paddingRight: Layout.padding * 2,
    paddingBottom: Layout.padding / 2,
    paddingLeft: Layout.padding * 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  ratingTitle: {
    marginBottom: Layout.padding,
  },
  ratingContainer: {
    alignItems: 'center',
  },
  socialContainer: {
    alignItems: 'center',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  socialTitle: {
    paddingBottom: Layout.padding,
  },
  socialIconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  followersText: {
    fontSize: 12,
    color: Colors.silver,
  },
  tiktokIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
