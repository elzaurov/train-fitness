import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  FlatButton,
  ProfileStats,
  RegularText,
  ScreenScrollView,
  TitleText,
  UserExperience,
  UserPhoto,
  BottomBarTemplate,
  Button,
} from '../../components';
import RewardMenuScreenHOC from './RewardMenuScreenHOC';
import {Colors, Layout} from '../../constants';
import {InAppReview} from '../../utils';

const RewardMenuScreen = ({
  gamification,
  metadata,
  navigation,
  noteId,
  profile,
  stats,
  badge,
  onWriteNote,
  loading,
  navigateAfterDone,
  t,
}) => {
  const {experience} = gamification;
  const {firstName, uid} = profile;

  const options = [
    {
      link: 'WriteNote',
      text: noteId ? t('editNote') : t('writeNote'),
      params: {id: noteId, metadata, onWriteNote},
      hasCheck: true,
      checked: !!noteId,
    },
  ];
  useEffect(() => {
    InAppReview.rate();
  }, []);

  const screens = options.map(
    ({link, text, params, hasCheck, checked}, index) => (
      <FlatButton
        key={link}
        style={[
          styles.screenButton,
          index === 0 ? styles.firstScreenButton : {},
        ]}
        onPress={() => navigation.push(link, params)}
        icon="chevron-right"
        iconSize={24}>
        <View style={styles.option}>
          <RegularText>{text}</RegularText>
          {hasCheck && (
            <MaterialCommunityIcons
              style={checked ? {} : {opacity: 0.5}}
              name={checked ? 'check-circle' : 'check-circle-outline'}
              size={24}
              color={checked ? Colors.green : Colors.dustyGray}
            />
          )}
        </View>
      </FlatButton>
    ),
  );

  if (loading) {
    return null;
  }

  return (
    <BottomBarTemplate
      bottomBar={
        <Button onPress={navigateAfterDone}>Done</Button>
      }>
      <View style={styles.container}>
        <ScreenScrollView>
          <View style={styles.header}>
            <TitleText style={styles.title}>{t('wellDone')}</TitleText>
            <View style={styles.statsWrapper}>
              <View style={styles.stats}>
                <View style={styles.expWrapper}>
                  <RegularText style={styles.xp}>+</RegularText>
                  <RegularText
                    style={
                      stats.exp.toString().length >= 3 &&
                      stats.percentageSeen &&
                      stats.percentageSeen.toString().length >= 3
                        ? styles.expSmall
                        : styles.exp
                    }>
                    {stats.exp}
                  </RegularText>
                  <RegularText style={styles.xp}>XP!</RegularText>
                </View>
              </View>
              {stats.percentageSeen && (
                <View style={styles.stats}>
                  <View style={styles.expWrapper}>
                    <RegularText
                      style={
                        stats.exp.toString().length >= 3 &&
                        stats.percentageSeen.toString().length >= 3
                          ? styles.expSmall
                          : styles.exp
                      }>
                      {stats.percentageSeen}
                    </RegularText>
                    <RegularText style={styles.xp}>%</RegularText>
                  </View>
                </View>
              )}
              <View style={styles.user}>
                <View>
                  <RegularText style={styles.name}>{firstName}</RegularText>
                  <UserExperience experience={experience} />
                </View>
                <View style={{width: 45, height: 32, marginLeft: 12}}>
                  <UserPhoto uid={uid} size={36} />
                </View>
              </View>
            </View>
          </View>

          {badge && stats.percentageSeen && stats.percentageSeen === 100 && (
            <View style={styles.header}>
              <TitleText style={styles.badgeTitle}>
                You earned a badge!
              </TitleText>
              <View style={styles.statsWrapper}>
                <FastImage style={styles.badge} source={{uri: badge.badge}} />
              </View>
              <View style={styles.statsWrapper}>
                <RegularText style={styles.badgeTitle}>
                  {badge.title}
                </RegularText>
              </View>
              <View style={styles.statsWrapper}>
                <RegularText style={styles.badgeDescription}>
                  {badge.description}
                </RegularText>
              </View>
            </View>
          )}

          <View style={styles.options}>{screens}</View>

          <View>
            <ProfileStats
              hideGeneralStats={true}
              hideHelpLink={true}
              stats={stats}
            />
          </View>
        </ScreenScrollView>
        {/* <SafeArea color={Colors.background2} /> */}
      </View>
    </BottomBarTemplate>
  );
};

RewardMenuScreen.propTypes = {
  loading: PropTypes.bool.isRequired,
  gamification: PropTypes.objectOf(PropTypes.any).isRequired,
  metadata: PropTypes.objectOf(PropTypes.any).isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  noteId: PropTypes.string,
  navigateAfterDone: PropTypes.func.isRequired,
  profile: PropTypes.objectOf(PropTypes.any).isRequired,
  stats: PropTypes.objectOf(PropTypes.any).isRequired,
  badge: PropTypes.objectOf(PropTypes.any),
  schedule: PropTypes.objectOf(PropTypes.any).isRequired,
  onWriteNote: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

RewardMenuScreen.defaultProps = {
  noteId: undefined,
  badge: undefined,
};

export default RewardMenuScreenHOC(
  withTranslation('rewardMenuScreen')(RewardMenuScreen),
);

const styles = StyleSheet.create({
  header: {
    padding: Layout.padding,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  option: {
    width: Layout.window.width - Layout.padding * 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: Layout.halfPadding,
  },
  title: {
    textAlign: 'center',
    marginBottom: Layout.margin,
  },
  statsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  stats: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  expWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exp: {
    color: Colors.green,
    fontSize: 48,
  },
  expSmall: {
    color: Colors.green,
    fontSize: 38,
  },
  xp: {
    fontSize: 18,
    color: Colors.green,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    textAlign: 'left',
  },
  firstScreenButton: {
    borderTopWidth: 1,
    borderTopColor: Colors.separator,
  },
  screenButton: {
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.separator,
    padding: Layout.padding,
  },
  footer: {},
  doneButton: {
    borderRadius: 0,
  },

  badge: {
    height: Layout.window.width / 2,
    width: Layout.window.width / 2,
  },
  badgeTitle: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 22,
  },
  badgeDescription: {
    marginTop: 7,
    marginBottom: 10,
    color: Colors.dustyGray,
    fontSize: 17,
  },
});
