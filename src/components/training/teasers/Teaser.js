/* eslint-disable no-mixed-operators */
/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RegularText} from '../../layout';
import {PremiumWrapper} from '../../premium';
import {Colors, Layout} from '../../../constants';

const Teaser = ({isListSequencial, isSmall, teaser, hideName, onPress}) => {
  const {name, thumbnail, isPremium} = teaser;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{marginBottom: isSmall ? 0 : Layout.margin}}>
      <PremiumWrapper
        isPremium={isPremium}
        style={[
          styles.wrapper,
          isListSequencial ? styles.wrapperSequencial : {},
        ]}
        overlay>
        <FastImage
          style={
            isListSequencial
              ? styles.thumbnailSequencial
              : isSmall
              ? styles.thumbnailSmall
              : styles.thumbnail
          }
          source={{uri: thumbnail}}
        />
        {!isSmall && !hideName && (
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
        )}
      </PremiumWrapper>
    </TouchableOpacity>
  );
};

Teaser.propTypes = {
  isListSequencial: PropTypes.bool.isRequired,
  teaser: PropTypes.objectOf(PropTypes.any).isRequired,
  hideName: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Teaser;

const styles = StyleSheet.create({
  // teaser: {
  // marginBottom: Layout.margin,
  // },
  wrapper: {
    backgroundColor: Colors.white,
    borderRadius: 2,
    overflow: 'hidden',
  },
  wrapperSequencial: {
    flexDirection: 'row',
  },
  thumbnail: {
    height: Layout.window.width - Layout.padding * 2,
    width: Layout.window.width - Layout.padding * 2,
  },
  thumbnailSmall: {
    height: (Layout.window.width - Layout.padding * 3) * 0.46 - 10,
    width: (Layout.window.width - Layout.padding * 3) * 0.46,
  },
  thumbnailSequencial: {
    width: 72,
    height: 72,
  },
  nameWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Layout.window.width - Layout.padding * 2,
  },
  nameWrapperSequencial: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Layout.window.width - Layout.padding * 2 - 72,
  },
  name: {
    color: Colors.black,
    padding: Layout.padding / 2,
    fontSize: 14,
    lineHeight: 16,
  },
});
