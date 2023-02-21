import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RegularText, TitleText} from '../layout';
import {PremiumWrapper, PremiumActionHOC} from '../premium';
import {UIBadge} from '../common';
import {Layout} from '../../constants';
import SearchResultItemHOC from './SearchResultItemHOC';

const PremiumAction = PremiumActionHOC(TouchableOpacity);

const SearchResultItem = ({
  title,
  description,
  thumbnailUrl,
  isPremium,
  isNew,
  onItemPress,
}) => (
  <PremiumAction
    isPremium={isPremium}
    style={styles.resultItem}
    onPress={onItemPress}>
    <PremiumWrapper style={styles.thumbnail} isPremium={isPremium} overlay>
      <FastImage style={styles.image} source={{uri: thumbnailUrl}} />
    </PremiumWrapper>
    <View style={styles.textWrapper}>
      <View style={styles.titleContainer}>
        <TitleText style={styles.title} numberOfLines={1}>
          {title}
        </TitleText>
        {isNew ? <UIBadge size="small" text="New" /> : null}
      </View>
      <RegularText style={styles.description} numberOfLines={2}>
        {description}
      </RegularText>
    </View>
  </PremiumAction>
);

SearchResultItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  thumbnailUrl: PropTypes.string,
  onItemPress: PropTypes.func.isRequired,
  isPremium: PropTypes.bool,
  isNew: PropTypes.bool,
};

SearchResultItem.defaultProps = {
  title: null,
  description: null,
  thumbnailUrl: null,
  isPremium: true,
  isNew: false,
};

export default SearchResultItemHOC(SearchResultItem);

const styles = StyleSheet.create({
  resultItem: {
    padding: Layout.padding,
    flexDirection: 'row',
  },
  thumbnail: {
    flex: 1,
    aspectRatio: 1,
    marginRight: 16,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    marginRight: 2,
    marginBottom: 0,
    flex: 1,
  },
  description: {
    fontSize: 12,
  },
  textWrapper: {
    flex: 4,
  },
});
