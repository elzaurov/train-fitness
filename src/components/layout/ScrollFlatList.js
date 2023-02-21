import React from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScrollFlatListHOC from './ScrollFlatListHOC';
import Input from './Input';
import Select from './Select';
import TitleText from './TitleText';
import {Colors, Layout} from '../../constants';

const ScrollFlatList = ({
  categories,
  data,
  headerStyle,
  hideListOptions,
  hideSearch,
  isLoadingMoreEnabled,
  isListSequencial,
  loading,
  noFlex,
  optionsStyle,
  searchPlaceholder,
  searchText,
  selectedCategory,
  showNewItemOption,
  style,
  title,
  onCategoryChange,
  onNewPress,
  onLoadMore,
  onSearchInputChange,
  onToggleListOptions,
  renderItem,
  ...props
}) => (
  <FlatList
    style={[styles.container, style, noFlex ? {} : {flex: 1}]}
    // stickyHeaderIndices={[1]}
    ListHeaderComponent={
      <View style={[styles.header, headerStyle]}>
        {title && <TitleText style={styles.title}>{title}</TitleText>}
        {categories && (
          <Select
            style={styles.select}
            initValue={selectedCategory.label || ''}
            items={categories}
            onChange={onCategoryChange}
          />
        )}
        <View style={[styles.options, optionsStyle]}>
          {!hideSearch && (
            <Input
              viewStyle={styles.input}
              iconStyle={styles.inputIcon}
              value={searchText}
              icon="magnify"
              placeholder={searchPlaceholder}
              onChangeText={(text) => onSearchInputChange(text)}
            />
          )}
          {!hideListOptions && (
            <TouchableOpacity
              style={styles.listOption}
              onPress={onToggleListOptions}>
              <MaterialCommunityIcons
                style={styles.icon}
                name={isListSequencial ? 'checkbox-blank' : 'view-sequential'}
                size={32}
                color={Colors.white}
              />
            </TouchableOpacity>
          )}
          {showNewItemOption && (
            <TouchableOpacity style={styles.listOption} onPress={onNewPress}>
              <MaterialCommunityIcons
                style={styles.icon}
                name="plus"
                size={32}
                color={Colors.white}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    }
    data={data}
    // bounces={false}
    keyExtractor={(item) => item.key}
    onEndReached={isLoadingMoreEnabled ? onLoadMore : null}
    onEndReachedThreshold={0.5}
    renderItem={(itemProps) => renderItem({...itemProps, loadingMore: loading})}
    {...props}
  />
);

ScrollFlatList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.any),
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  headerStyle: PropTypes.any,
  hideListOptions: PropTypes.bool,
  hideSearch: PropTypes.bool,
  isListSequencial: PropTypes.bool.isRequired,
  isLoadingMoreEnabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  noFlex: PropTypes.bool,
  optionsStyle: PropTypes.any,
  searchPlaceholder: PropTypes.string,
  searchText: PropTypes.string.isRequired,
  selectedCategory: PropTypes.objectOf(PropTypes.string),
  showNewItemOption: PropTypes.bool,
  style: PropTypes.any,
  title: PropTypes.string,
  onCategoryChange: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  onNewPress: PropTypes.func,
  onSearchInputChange: PropTypes.func.isRequired,
  onToggleListOptions: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  renderHeaderItem: PropTypes.func,
};

ScrollFlatList.defaultProps = {
  categories: undefined,
  headerStyle: {},
  hideListOptions: false,
  hideSearch: false,
  noFlex: false,
  optionsStyle: {},
  title: undefined,
  searchPlaceholder: '',
  showNewItemOption: false,
  selectedCategory: undefined,
  style: {},
  onNewPress: () => {},
};

export default ScrollFlatListHOC(ScrollFlatList);

const styles = StyleSheet.create({
  container: {
    padding: Layout.padding,
    paddingTop: 0,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: Layout.padding,
    backgroundColor: Colors.background,
  },
  select: {
    width: Layout.window.width - Layout.margin * 2,
    marginBottom: Layout.margin,
  },
  input: {
    width: Layout.window.width - Layout.margin * 2 - 44,
    paddingLeft: 0,
    paddingRight: 0,
  },
  inputIcon: {
    left: 10,
  },
  listOption: {
    flex: 1,
    marginLeft: 12,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Layout.margin,
  },
});
