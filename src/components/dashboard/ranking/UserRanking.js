import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BoldText, RegularText} from '../../layout';
import {UserPhoto} from '../../common';
import {Colors, Layout} from '../../../constants';
import UserRankingHOC from './UserRankingHOC';

const UserRanking = ({loading, profile, userId, userRanking}) => {
  const {displayName} = profile;
  const {experience, position, positionDiff, uid} = userRanking;

  let positionIcon;

  if (positionDiff && positionDiff !== 0) {
    positionIcon = positionDiff > 0 ? 'chevron-up' : 'chevron-down';
  }

  return (
    <View
      style={[
        styles.row,
        userId === uid ? {backgroundColor: Colors.separator} : {},
      ]}>
      <View style={styles.user}>
        <UserPhoto style={styles.avatar} uid={uid} size={36} />
        <View style={styles.content}>
          {loading ? (
            <View style={styles.nameLoading} />
          ) : (
            <BoldText style={!displayName ? styles.anonymousUser : null}>
              {displayName || 'Player'}
            </BoldText>
          )}
          <RegularText style={styles.experience}>
            Score: ({experience})
          </RegularText>
        </View>
      </View>
      <View style={styles.positionWrapper}>
        {positionIcon && (
          <View style={styles.positionIcon}>
            <RegularText
              style={{
                color: positionDiff > 0 ? Colors.green : Colors.alizarinCrimson,
              }}>
              {positionDiff}
            </RegularText>
            <MaterialCommunityIcons
              name={positionIcon}
              size={16}
              color={positionDiff > 0 ? Colors.green : Colors.alizarinCrimson}
            />
          </View>
        )}
        <RegularText style={styles.position}>{position || '-'}</RegularText>
      </View>
    </View>
  );
};

UserRanking.propTypes = {
  loading: PropTypes.bool.isRequired,
  profile: PropTypes.objectOf(PropTypes.any).isRequired,
  userId: PropTypes.string.isRequired,
  userRanking: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default UserRankingHOC(UserRanking);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Layout.halfMargin,
    width: Layout.window.width,
    padding: Layout.padding,
  },
  nameLoading: {
    backgroundColor: Colors.loadingOverlay,
    height: 12,
    width: 60,
    marginTop: 4,
    marginBottom: 6,
    borderRadius: 2,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  content: {
    // width: Layout.window.width - 70 - (Layout.padding * 2) - Layout.halfPadding,
    paddingLeft: Layout.halfPadding,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  experience: {
    color: Colors.dustyGray,
    fontSize: 12,
    marginTop: -3,
  },
  positionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  positionIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 12,
  },
  position: {
    alignItems: 'flex-end',
    textAlign: 'right',
    fontSize: 24,
  },
  anonymousUser: {
    opacity: 0.4,
  },
  // content: {
  //   width: Layout.window.width - 45 - Layout.padding - Layout.halfPadding,
  //   paddingLeft: Layout.halfPadding,
  // },
});
