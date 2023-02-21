import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, View} from 'react-native';
import {BoldText, RegularText} from '../../layout';
import {CachedImage} from '../../common';
import {generateBadges} from '../../../utils';
import {Colors, Layout, UPCOMING_BADGE_URL} from '../../../constants';

const ProfileBadges = ({isMember, stats, userBadges, t}) => {
  let badgesData = generateBadges(stats);

  // Adding different badges without change the UI
  badgesData.push({
    title: 'Courses',
    description: 'Number of courses completed',
    badges: userBadges.map((b) => {
      return {
        badge: b.badge,
        level: 0,
        value: 0,
        name: b.title,
      };
    }),
  });

  const badgeComponents = badgesData.map((itemBadge) => {
    const {title, description, badges} = itemBadge;
    const filteredBadges = [...badges.filter(({upcoming}) => !upcoming)];
    const upcomingBadge = [...badges.filter(({upcoming}) => upcoming)][0];
    let percent = 0;

    if (upcomingBadge) {
      const lastBadgeIndex = filteredBadges.length - 1;
      const oldValue =
        lastBadgeIndex >= 0 ? filteredBadges[lastBadgeIndex].value : 0;
      const startValue = upcomingBadge.currentValue - oldValue;
      const endValue = upcomingBadge.value - oldValue;
      percent = Math.round((startValue * 100) / endValue);
    }

    const badgeItems = filteredBadges
      .filter(({badge}) => !!badge)
      .map(({badge}) => {
        return (
          <View key={badge} style={styles.badge}>
            <CachedImage
              style={styles.badgeImage}
              width={Layout.window.width / 2 - Layout.padding - 4}
              source={{uri: badge}}
            />
          </View>
        );
      });

    const upcomingBadgeItem = upcomingBadge ? (
      <View style={[styles.badge, styles.upcomingBadge]}>
        <CachedImage
          style={styles.badgeImage}
          width={Layout.window.width / 2 - Layout.padding - 4}
          source={{uri: UPCOMING_BADGE_URL}}
        />
        <View style={styles.percentBar}>
          <View style={[styles.percent, {width: `${percent}%`}]} />
        </View>
      </View>
    ) : null;

    return (
      <View key={title} style={styles.badgeSection}>
        <BoldText style={styles.title}>{t(title)}</BoldText>
        <RegularText style={styles.description}>{t(description)}</RegularText>
        {badgeItems.length === 0 ? (
          <View style={styles.badges}>
            {isMember && (
              <RegularText style={styles.noBadges}>{t('noBadges')}</RegularText>
            )}
            {!isMember && upcomingBadgeItem}
          </View>
        ) : (
          <View style={styles.badges}>
            {badgeItems}
            {!isMember && upcomingBadgeItem}
          </View>
        )}
      </View>
    );
  });

  return (
    <ScrollView style={{flex: 1}} bounces={false}>
      <View style={styles.view}>{badgeComponents}</View>
    </ScrollView>
  );
};

ProfileBadges.propTypes = {
  isMember: PropTypes.bool.isRequired,
  stats: PropTypes.objectOf(PropTypes.any).isRequired,
  userBadges: PropTypes.arrayOf(PropTypes.object).isRequired,
  t: PropTypes.func.isRequired,
};

export default ProfileBadges;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: Layout.padding,
  },
  title: {
    fontSize: 16,
    marginBottom: Layout.halfMargin / 2,
  },
  description: {
    fontSize: 12,
    marginBottom: Layout.halfMargin,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Layout.margin,
  },
  badge: {
    width: '50%',
    aspectRatio: 1 / 1,
    marginBottom: Layout.padding,
  },
  badgeImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  noBadges: {
    color: Colors.dustyGray,
  },
  upcomingBadge: {
    position: 'relative',
  },
  percentBar: {
    backgroundColor: Colors.white,
    position: 'absolute',
    left: '10%',
    width: '80%',
    bottom: '8%',
    borderRadius: 2,
    height: 5,
    overflow: 'hidden',
  },
  percent: {
    position: 'absolute',
    height: '100%',
    backgroundColor: Colors.secondary,
    bottom: 0,
    left: 0,
  },
});
