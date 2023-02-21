import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RegularText, IconButton} from '../../layout';
import {Colors} from '../../../constants';
import {getRouteNameFromType} from '../../../utils';

const Activity = ({
  name,
  id,
  uid,
  thumbnail,
  type,
  time,
  experience,
  percentageSeen,
  onRemoveSchedule,
  completed,
  navigation,
  selectedDate,
}) => {
  let routeName = getRouteNameFromType(type);

  return (
    <View style={styles.container}>
      <FastImage style={styles.image} source={{uri: thumbnail}} />
      <View style={styles.content}>
        <TouchableOpacity
          disabled={completed === true}
          onPress={() => {
            navigation.navigate('Performing', {
              screen: routeName,
              params: {
                scheduleId: uid,
                type,
                id,
                date: selectedDate,
              },
            });
          }}>
          <RegularText style={styles.text}>{name}</RegularText>
          <View style={styles.badgeContainer}>
            {completed === true && (
              <RegularText style={[styles.statusBadge]}>Completed</RegularText>
            )}
            {experience > 0 && (
              <View style={styles.experienceBadge}>
                <MaterialCommunityIcon
                  name="trophy"
                  size={16}
                  color={Colors.green}
                />
                <RegularText style={styles.experienceBadgeText}>
                  +{String(experience)}
                </RegularText>
              </View>
            )}
            {time > 0 && (
              <RegularText style={styles.timeBadge}>
                {String(Math.round(time / 60))}mins
              </RegularText>
            )}
            {type === 'course' && percentageSeen && (
              <RegularText style={styles.timeBadge}>
                {percentageSeen}%
              </RegularText>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <IconButton
        icon="close"
        style={styles.deleteButton}
        iconSize={24}
        iconColor={Colors.mineShaft}
        onPress={onRemoveSchedule}
      />
    </View>
  );
};

Activity.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  time: PropTypes.number,
  experience: PropTypes.number,
  percentageSeen: PropTypes.string,
  onRemoveSchedule: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  selectedDate: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
};

Activity.defaultProps = {
  thumbnail: null, // default image url
  time: null,
  experience: null,
  percentageSeen: null,
};

export default Activity;

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: Colors.white,
    marginBottom: 16,
    alignItems: 'center',
    minHeight: 80,
  },
  image: {
    flex: 0,
    width: 80,
    height: '100%',
    backgroundColor: Colors.silver,
  },
  content: {
    flex: 1,
    padding: 8,
  },
  text: {
    color: Colors.black,
    fontSize: 16,
  },
  badgeContainer: {
    marginTop: 8,
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
  },
  statusBadge: {
    backgroundColor: Colors.green,
    color: Colors.white,
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 12,
    borderRadius: 2,
  },
  timeBadge: {
    fontSize: 14,
    marginLeft: 8,
    color: Colors.dustyGray,
  },
  experienceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  experienceBadgeText: {
    color: Colors.green,
    fontSize: 14,
  },
  deleteButton: {
    padding: 8,
  },
};
