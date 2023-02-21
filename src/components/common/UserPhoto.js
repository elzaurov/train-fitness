import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RegularText} from '../layout';
import {Colors} from '../../constants';
import UserPhotoLoading from './UserPhotoLoading';
import UserPhotoHOC from './UserPhotoHOC';
import profile_default_photo from '../../assets/images/profile/profile_default_photo.png';

const UserPhoto = ({
  hideLevel,
  hideLink,
  hideStar,
  isCurrentUser,
  profileImageURL,
  levelSize,
  levelStyle,
  loading,
  level,
  profile,
  style,
  size,
  onPress,
}) => {
  const {isAdmin} = profile;
  const lvlSize = levelSize || Math.round(size / 2);
  const fontSize = Math.round(lvlSize / 2);

  if (loading) {
    return <UserPhotoLoading hideLevel={hideLevel} size={size} style={style} />;
  }

  const content = (
    <View style={[styles.wrapper, style]}>
      <FastImage
        style={[
          {
            height: size,
            width: size,
            borderRadius: size / 2,
            borderWidth: Math.round(size / 24),
            borderColor: Colors.white,
          },
        ]}
        source={
          profileImageURL
            ? {
                uri: profileImageURL,
              }
            : profile_default_photo
        }
      />
      {!hideLevel && (
        <View
          style={[
            styles.level,
            {
              height: lvlSize,
              width: lvlSize,
              borderRadius: lvlSize / 2,
              borderWidth: Math.round(size / 48),
              marginLeft: -(lvlSize / 2),
            },
            levelStyle,
          ]}>
          <RegularText style={{fontSize}}>{level}</RegularText>
        </View>
      )}
      {!hideStar && isAdmin && (
        <MaterialCommunityIcons
          style={styles.starIcon}
          name="star"
          size={12}
          color={Colors.secondary}
        />
      )}
    </View>
  );

  if (isCurrentUser || hideLink) {
    return content;
  }

  return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
};

UserPhoto.propTypes = {
  hideLevel: PropTypes.bool,
  hideLink: PropTypes.bool,
  hideStar: PropTypes.bool,
  isCurrentUser: PropTypes.bool.isRequired,
  profileImageURL: PropTypes.string,
  levelSize: PropTypes.number,
  levelStyle: PropTypes.any,
  loading: PropTypes.bool,
  level: PropTypes.number,
  profile: PropTypes.objectOf(PropTypes.any).isRequired,
  size: PropTypes.number,
  style: PropTypes.any,
  onPress: PropTypes.func.isRequired,
};

UserPhoto.defaultProps = {
  hideLevel: false,
  hideLink: false,
  hideStar: false,
  levelSize: undefined,
  levelStyle: {},
  loading: false,
  size: 48,
  level: null,
  profileImageURL: null,
  style: {},
};

export default UserPhotoHOC(UserPhoto);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  level: {
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    fontSize: 9,
  },
  starIcon: {
    position: 'absolute',
    bottom: -3,
    right: -3,
  },
});
