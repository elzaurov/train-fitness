import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, FlatButton, RegularText} from '../../layout';
import {UserPhoto, CachedImage} from '../../common';
import StatsOverview from './StatsOverview';
import {Layout, Colors} from '../../../constants';

const ProfileHeader = ({
  avatarSource,
  gamification,
  isMember,
  profile,
  stats,
  badges,
  updating,
  onCancelPhotoClick,
  onUpdatePhotoClick,
  onUpdate,
  t,
}) => (
  <View style={styles.header}>
    <View style={styles.headerBackgroundContainer}>
      <CachedImage
        style={styles.headerBackground}
        width={Layout.window.width}
        resizeMode="cover"
        source={{
          uri:
            'https://firebasestorage.googleapis.com/v0/b/train-effective.appspot.com/o/app-images%2Fprofiles%2Fwalpaper.jpg?alt=media&token=1c3be4e3-a74c-453f-8ddb-8291ea68a82f',
        }}
      />
    </View>
    {isMember ? (
      <Fragment>
        <UserPhoto
          hideLink={true}
          levelSize={48}
          levelStyle={styles.levelStyle}
          profileImageURL={avatarSource}
          size={150}
          style={styles.photo}
          uid={profile.uid}
        />
        <RegularText style={styles.name}>{profile.displayName}</RegularText>
      </Fragment>
    ) : (
      <Fragment>
        <TouchableOpacity onPress={avatarSource ? null : onUpdatePhotoClick}>
          <UserPhoto
            hideLevel={true}
            hideStar={true}
            uid={profile.uid}
            profileImageURL={avatarSource}
            size={150}
            style={styles.photo}
          />
        </TouchableOpacity>
        {avatarSource ? (
          <View style={styles.buttons}>
            <FlatButton disabled={updating} onPress={onCancelPhotoClick}>
              {t('cancel')}
            </FlatButton>
            <Button
              disabled={updating}
              style={styles.update}
              onPress={onUpdate}>
              {updating ? t('updating') : t('update')}
            </Button>
          </View>
        ) : (
          <FlatButton onPress={onUpdatePhotoClick}>
            {t('uploadPicture')}
          </FlatButton>
        )}
      </Fragment>
    )}
    <StatsOverview
      gamification={gamification}
      stats={stats}
      badges={badges}
      t={t}
    />
  </View>
);

ProfileHeader.propTypes = {
  avatarSource: PropTypes.string,
  gamification: PropTypes.objectOf(PropTypes.any).isRequired,
  isMember: PropTypes.bool.isRequired,
  profile: PropTypes.objectOf(PropTypes.any).isRequired,
  stats: PropTypes.objectOf(PropTypes.any).isRequired,
  badges: PropTypes.any.isRequired,
  updating: PropTypes.bool,
  onCancelPhotoClick: PropTypes.func.isRequired,
  onUpdatePhotoClick: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

ProfileHeader.defaultProps = {
  avatarSource: undefined,
  updating: false,
};

export default ProfileHeader;

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    alignItems: 'center',
    height: 280,
    overflow: 'hidden',
    margin: Layout.padding,
    borderRadius: 8,
  },
  headerBackgroundContainer: {
    backgroundColor: Colors.mineShaft,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  headerBackground: {
    height: 280,
  },
  name: {
    // color: Colors.black,
    fontSize: 18,
  },
  photo: {
    marginTop: Layout.margin,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  update: {
    marginLeft: Layout.halfMargin,
    paddingLeft: Layout.padding,
    paddingRight: Layout.padding,
    width: 'auto',
  },
  levelStyle: {
    position: 'absolute',
    top: 8,
    left: 136,
  },
});
