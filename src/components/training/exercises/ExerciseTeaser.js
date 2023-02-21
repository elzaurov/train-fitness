/* eslint-disable no-mixed-operators */
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RegularText} from '../../layout';
import {PremiumWrapper, PremiumActionHOC} from '../../premium';
import {Colors, Layout} from '../../../constants';

const ExerciseTeaser = ({categories, exercise, isListSequencial, onPress}) => {
  const {name, thumbnail, isPremium} = exercise;

  const categoriesComponent = categories.map(({key, label}) => (
    <RegularText key={key} style={styles.category}>
      {label}
    </RegularText>
  ));

  const PremiumTouchableOpacity = PremiumActionHOC(TouchableOpacity);

  return (
    <PremiumTouchableOpacity
      onPress={onPress}
      isPremium={isPremium}
      style={styles.teaser}>
      <PremiumWrapper
        isPremium={isPremium}
        style={[
          styles.wrapper,
          isListSequencial ? styles.wrapperSequencial : {},
        ]}
        overlay>
        <FastImage
          source={{uri: thumbnail}}
          style={
            isListSequencial ? styles.thumbnailSequencial : styles.thumbnail
          }
        />
        <View
          style={
            isListSequencial ? styles.nameWrapperSequencial : styles.nameWrapper
          }>
          <RegularText style={styles.name}>
            {name.length > 60 ? `${name.substring(0, 60)}...` : name}
          </RegularText>
          {isListSequencial && (
            <View style={styles.categories}>{categoriesComponent}</View>
          )}
        </View>
      </PremiumWrapper>
    </PremiumTouchableOpacity>
  );
};

ExerciseTeaser.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  exercise: PropTypes.objectOf(PropTypes.any).isRequired,
  isListSequencial: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ExerciseTeaser;

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
    paddingBottom: 0,
    fontSize: 14,
    lineHeight: 16,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Layout.window.width - Layout.padding * 2 - 120,
    marginTop: 2,
    paddingLeft: Layout.halfPadding - 1,
    paddingRight: Layout.halfPadding - 1,
  },
  category: {
    color: Colors.dustyGray,
    fontSize: 9,
    margin: 1,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
