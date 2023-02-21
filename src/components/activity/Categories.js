import React from 'react';
import PropTypes from 'prop-types';
import {View, ViewPropTypes, StyleSheet, TouchableOpacity} from 'react-native';
import {Chip} from '../layout';
import {Layout, Colors} from '../../constants';

const Categories = ({
  categories,
  selectedCategories,
  onCategorySelect,
  categorySize,
  selectable,
  categoryStyle,
  style,
  isOnBlackBackground,
  isFilter,
  ...rest
}) => {
  const categoryItems = categories.map((category) => (
    <TouchableOpacity
      key={category.key}
      style={[styles.category, categoryStyle]}
      onPress={() => onCategorySelect(category)}
      disabled={!selectable}>
      <Chip
        size={categorySize}
        style={[
          styles.category,
          selectedCategories.includes(category) ? styles.selectedCategory : {},
          isOnBlackBackground
            ? {borderColor: Colors.silver}
            : {borderColor: Colors.dustyGray},
        ]}
        textStyle={[
          isOnBlackBackground
            ? {color: Colors.silver}
            : {color: Colors.dustyGray},
          selectedCategories.includes(category)
            ? styles.selectedCategoryText
            : {},
          {fontSize: isFilter ? 13 : Layout.isSmallDevice ? 7 : 9},
        ]}>
        {category.label}
      </Chip>
    </TouchableOpacity>
  ));

  return (
    <View style={[styles.container, style]} {...rest}>
      {categoryItems}
    </View>
  );
};

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategories: PropTypes.array,
  onCategorySelect: PropTypes.func,
  categorySize: PropTypes.oneOf(['small', 'large']),
  categoryStyle: ViewPropTypes.style,
  style: ViewPropTypes.style,
  selectable: PropTypes.bool,
};

Categories.defaultProps = {
  onCategorySelect: null,
  selectedCategories: [],
  categorySize: 'small',
  selectable: false,
  categoryStyle: {},
  style: {},
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  category: {
    marginRight: 4,
    marginBottom: 4,
    flex: 0,
    borderColor: Colors.silver,
  },
  selectedCategory: {
    borderWidth: 0,
    backgroundColor: Colors.silver,
  },
  selectedCategoryText: {
    color: Colors.mineShaft,
  },
  categoriesFontSize: {
    fontSize: 12,
  },
});
