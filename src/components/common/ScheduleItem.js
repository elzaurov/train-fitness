import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BoldText, Button, RegularText} from '../layout';
import {Colors, Layout} from '../../constants';
import ScheduleItemHOC from './ScheduleItemHOC';

const ScheduleItem = ({
  editable,
  item,
  navigation,
  submitting,
  onRemovePress,
  t,
}) => {
  const {
    completed,
    experience,
    percentageSeen,
    id,
    name,
    stats,
    time,
    timestamp,
    thumbnail,
    type,
    uid,
  } = item;

  if (!uid) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.newItemContent}
          onPress={() => navigation.push('NewSchedule', {timestamp})}>
          <MaterialCommunityIcons name="plus" color={Colors.black} size={72} />
        </TouchableOpacity>
      </View>
    );
  }

  const timeMinutes = Math.round(time / 60);
  const url = type
    .replace(/(^|-)(\w)/g, (c) => c.toUpperCase())
    .replace(/-/g, '');

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <FastImage style={styles.image} source={{uri: thumbnail}} />
        {editable && (!completed || stats) && (
          <TouchableOpacity
            style={styles.removeItem}
            disabled={submitting}
            onPress={onRemovePress}>
            <MaterialCommunityIcons
              name="close"
              color={Colors.white}
              size={32}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.content}>
        <BoldText style={styles.title}>{name}</BoldText>
        {completed ? (
          <View style={styles.completed}>
            <MaterialCommunityIcons
              name="trophy-variant"
              color={Colors.green}
              size={20}
            />
            <RegularText style={styles.exp}>{experience}xp</RegularText>
            {item.category !== 'course' && (
              <RegularText style={styles.time}>/ {timeMinutes}min</RegularText>
            )}
            {percentageSeen && (
              <RegularText style={styles.time}>/ {percentageSeen}%</RegularText>
            )}
          </View>
        ) : (
          <Button
            onPress={() =>
              navigation.push(url, {id, timestamp, scheduleId: uid})
            }>
            {t('start')}
          </Button>
        )}
      </View>
    </View>
  );
};

ScheduleItem.propTypes = {
  editable: PropTypes.bool.isRequired,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  submitting: PropTypes.bool.isRequired,
  onRemovePress: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('scheduleItemComponent')(
  ScheduleItemHOC(ScheduleItem),
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    overflow: 'hidden',
  },
  newItemContent: {
    backgroundColor: Colors.white,
    padding: Layout.padding,
    width: '100%',
    height: Layout.window.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: Colors.white,
    padding: Layout.padding,
    width: '100%',
  },
  imageWrapper: {},
  image: {
    height: Layout.window.width - 96,
    width: Layout.window.width - 96,
  },
  title: {
    fontSize: 16,
    color: Colors.black,
    marginBottom: Layout.margin / 2,
  },
  completed: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  exp: {
    color: Colors.green,
    paddingRight: 6,
    paddingLeft: 4,
    fontSize: 16,
  },
  time: {
    color: Colors.dustyGray,
  },
  removeItem: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 42,
    width: 42,
    borderBottomLeftRadius: 21,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: Layout.padding / 4,
  },
});
