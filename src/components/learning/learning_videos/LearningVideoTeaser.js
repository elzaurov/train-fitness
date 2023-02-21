/* eslint-disable no-mixed-operators */
import React from 'react';
import PropTypes from 'prop-types';
import {Linking, StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RegularText} from '../../layout';
import {PremiumWrapper, PremiumActionHOC} from '../../premium';
import {Colors, Layout} from '../../../constants';

const LearningVideoTeaser = ({isListSequencial, learningVideo, onPress}) => {
  const {fileURL, name, thumbnail, type, isPremium} = learningVideo;

  const PremiumTouchableOpacity = PremiumActionHOC(TouchableOpacity);

  return (
    <PremiumTouchableOpacity
      onPress={type !== 'file' ? onPress : () => Linking.openURL(fileURL)}
      isPremium={isPremium}
      style={styles.teaser}>
      <PremiumWrapper isPremium={isPremium} overlay>
        <View
          style={[
            styles.wrapper,
            isListSequencial ? styles.wrapperSequencial : {},
          ]}>
          <FastImage
            source={{uri: thumbnail}}
            style={
              isListSequencial ? styles.thumbnailSequencial : styles.thumbnail
            }
          />
          <View
            style={
              isListSequencial
                ? styles.nameWrapperSequencial
                : styles.nameWrapper
            }>
            <RegularText style={styles.name}>
              {name.length > 60 ? `${name.substring(0, 60)}...` : name}
            </RegularText>
          </View>
        </View>
      </PremiumWrapper>
    </PremiumTouchableOpacity>
  );
};

LearningVideoTeaser.propTypes = {
  isListSequencial: PropTypes.bool.isRequired,
  learningVideo: PropTypes.objectOf(PropTypes.any).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default LearningVideoTeaser;

const styles = StyleSheet.create({
  teaser: {
    marginBottom: Layout.margin,
  },
  wrapper: {
    backgroundColor: Colors.white,
    borderRadius: 2,
    overflow: 'hidden',
  },
  wrapperSequencial: {
    flexDirection: 'row',
  },
  nameWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Layout.window.width - Layout.padding * 2,
  },
  nameWrapperSequencial: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Layout.window.width - Layout.padding * 2 - 120,
  },
  thumbnail: {
    width: Layout.window.width - Layout.padding * 2,
    height: (193 / 343) * (Layout.window.width - Layout.padding * 2),
  },
  thumbnailSequencial: {
    width: 120,
    height: (193 / 343) * 120,
  },
  name: {
    color: Colors.black,
    padding: Layout.padding / 2,
  },
});
