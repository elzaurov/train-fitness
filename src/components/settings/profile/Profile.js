import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {TabBar, ScrollPager} from 'react-native-tab-view';
import {Animated, StyleSheet, View} from 'react-native';
import {TabView} from '../../layout';
import {LoadingFullScreen} from '../../loading';
import ProfileHOC from './ProfileHOC';
import ProfileHeader from './ProfileHeader';
import ProfileOverview from './ProfileOverview';
import ProfileStats from './ProfileStats';
import ProfileBadges from './ProfileBadges';
import {Colors, Layout} from '../../../constants';

const Profile = ({
  displayNameText,
  isMember,
  loading,
  profile,
  stats,
  badgesFilled,
  updating,
  onInputChange,
  onUpdate,
  t,
  ...rest
}) => {
  const {email, displayName} = profile;

  const routes = [
    {key: 'overview', title: t('overviewSection')},
    {key: 'stats', title: t('statsSection')},
    {key: 'badges', title: t('badgesSection')},
  ];

  if (loading) {
    return <LoadingFullScreen hideImage={true} secondary />;
  }

  const content = (
    <View style={styles.content}>
      <TabView
        style={{flex: 1}}
        routes={routes}
        renderScene={({route}) => {
          switch (route.key) {
            case 'overview':
              return (
                <ProfileOverview
                  displayNameText={displayName}
                  email={email}
                  isMember={isMember}
                  updating={updating}
                  onInputChange={onInputChange}
                  onUpdate={onUpdate}
                  profile={profile}
                  stats={stats}
                  t={t}
                  {...rest}
                />
              );
            case 'stats':
              return <ProfileStats hideHelpLink={isMember} stats={stats} />;
            case 'badges':
              return (
                <ProfileBadges
                  isMember={isMember}
                  stats={stats}
                  userBadges={badgesFilled}
                  t={t}
                />
              );
            default:
              return null;
          }
        }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={styles.tabs}
            pressOpacity={1}
            indicatorStyle={{
              backgroundColor: Colors.secondary,
            }}
          />
        )}
      />
    </View>
  );

  if (!Layout.isIOS) {
    return content;
  }

  return content;
};

Profile.propTypes = {
  avatarSource: PropTypes.string,
  displayNameText: PropTypes.string.isRequired,
  gamification: PropTypes.objectOf(PropTypes.any).isRequired,
  isMember: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  profile: PropTypes.objectOf(PropTypes.any).isRequired,
  stats: PropTypes.objectOf(PropTypes.any).isRequired,
  updating: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onUpdatePhotoClick: PropTypes.func.isRequired,
  onCancelPhotoClick: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  avatarSource: undefined,
};

export default ProfileHOC(withTranslation('profileComponent')(Profile));

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: Colors.mineShaft,
    borderBottomWidth: 1,
    borderColor: Colors.separator,
  },
  content: {
    flex: 1,
    height: Layout.window.height - Layout.headerHeight,
    backgroundColor: Colors.background,
  },
  firstInput: {marginTop: 32},
  input: {marginTop: 10},
  button: {marginTop: 10},
});
