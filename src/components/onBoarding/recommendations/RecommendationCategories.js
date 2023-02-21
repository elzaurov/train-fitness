import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ViewPropTypes, Pressable} from 'react-native';
import {
  Colors,
  Layout,
  ONBOARDING_RECOMMENDATIONS_CATEGORY_TITLES,
} from '../../../constants';
import RecommendationActivity from './RecommendationActivity';
import {RegularText} from '../../layout';
import RecommendationSwiper from './RecommendationsSwiper';

const RecommendationCategories = ({
  categories,
  selectedCategory,
  onSelect: onSelectionThing,
  style,
}) => {
  const selectedCategoryIndex =
    categories?.findIndex(
      (category) => category?.key === selectedCategory?.key,
    ) ?? 0;

  const handleIndexChanged = (index) => {
    onSelectionThing?.(categories[index]);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.titles}>
        {categories.map(({key}, index) => (
          <Pressable key={key} onPress={() => handleIndexChanged(index)}>
            <RegularText
              style={[
                styles.title,
                selectedCategory?.key === key ? styles.selectedTitle : null,
              ]}>
              {ONBOARDING_RECOMMENDATIONS_CATEGORY_TITLES[key]}
            </RegularText>
          </Pressable>
        ))}
      </View>
      <View style={styles.carouselContainer}>
        <RecommendationSwiper
          selectedIndex={selectedCategoryIndex}
          onIndexChanged={handleIndexChanged}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.dotStyle}>
          {categories.map(({key, activity = {}}) => (
            <RecommendationActivity key={key} {...activity} />
          ))}
        </RecommendationSwiper>
      </View>
      <RegularText style={styles.description} numberOfLines={3}>
        {selectedCategory?.activity?.description}
      </RegularText>
    </View>
  );
};

RecommendationCategories.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.object,
  onSelect: PropTypes.func,
  style: ViewPropTypes.style,
};

RecommendationCategories.defaultProps = {
  selectedCategory: null,
  onSelect: null,
  style: null,
};

export default RecommendationCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Layout.padding / 2,
  },
  carouselContainer: {
    flex: 1,
  },
  titles: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: Layout.padding / 2,
    paddingBottom: Layout.padding / 2,
    marginLeft: Layout.padding,
    marginRight: Layout.padding,
    marginBottom: Layout.padding,
    backgroundColor: Colors.gray2,
    borderRadius: 8,
  },
  title: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 0.3,
    textTransform: 'uppercase',
  },
  selectedTitle: {
    opacity: 1,
  },
  description: {
    paddingTop: Layout.padding,
    paddingBottom: Layout.padding,
    paddingLeft: Layout.padding * 2,
    paddingRight: Layout.padding * 2,
    fontSize: Layout.isSmallDevice ? 12 : 15,
  },
  dotStyle: {
    display: 'none',
  },
});
