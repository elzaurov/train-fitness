import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ViewPropTypes, TouchableOpacity} from 'react-native';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {PremiumWrapper, PremiumActionHOC} from '../premium';
import {RegularText} from '../layout';
import {Colors} from '../../constants';

const PremiumAction = PremiumActionHOC(TouchableOpacity);

const ActivityCard = ({
  title,
  description,
  duration,
  isPremium,
  thumbnailUrl,
  style,
  onSelect,
}) => {
  // Hidden duration for now 
  // const durationText = duration
  //   ? `${moment.utc(duration * 1000).format('mm:ss')} mins`
  //   : null;

  return (
    <PremiumAction
      isPremium={isPremium}
      onPress={onSelect}
      style={[styles.container, style]}>
      <PremiumWrapper style={styles.thumbnail} isPremium={isPremium} overlay>
        <FastImage style={styles.image} source={{uri: thumbnailUrl}} />
      </PremiumWrapper>
      <View style={styles.body}>
        <View style={styles.header}>
          <RegularText numberOfLines={1} style={styles.title}>
            {title}
          </RegularText>
          {/* {durationText && (
            <RegularText style={styles.duration}>{durationText}</RegularText>
          )} */}
        </View>
        <View style={styles.description}>
          <RegularText numberOfLines={2} style={styles.description}>
            {description}
          </RegularText>
        </View>
      </View>
    </PremiumAction>
  );
};

ActivityCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isPremium: PropTypes.bool,
  thumbnailUrl: PropTypes.string,
  style: ViewPropTypes.style,
  onSelect: PropTypes.func,
};

ActivityCard.defaultProps = {
  title: '',
  description: '',
  duration: '',
  isPremium: true,
  thumbnailUrl: null,
  style: {},
  onSelect: () => {},
};

export default ActivityCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.mineShaft,
    borderRadius: 4,
    overflow: 'hidden',
  },
  thumbnail: {
    flex: 0,
    width: 80,
    height: '100%',
  },
  image: {
    flex: 1,
  },
  body: {
    flex: 1,
    padding: 8,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 4,
  },
  title: {
    flex: 1,
    fontSize: 14,
  },
  description: {
    padding: 4,
    fontSize: 12,
  },
  duration: {
    flex: 0,
    fontSize: 12,
    marginLeft: 8,
    color: Colors.silver,
  },
});
