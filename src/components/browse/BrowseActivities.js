import React from 'react';
import PropTypes from 'prop-types';
import {FlatList, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Layout} from '../../constants';
import {PremiumActionHOC} from '../premium';

const RIGHT_OFFSET = 40;
const SCROLL_WINDOW = Layout.window.width - RIGHT_OFFSET;

const PremiumTouchableOpacity = PremiumActionHOC(TouchableOpacity);

const BrowseActivities = ({onSelect, renderItem, size, ...rest}) => {
  const TILE_WIDTH = size === 'small' ? SCROLL_WINDOW / 2 : SCROLL_WINDOW;

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      bounces={false}
      horizontal
      keyExtractor={({key}) => key}
      snapToInterval={TILE_WIDTH}
      style={styles.container}
      initialNumToRender={3}
      renderItem={({item}) => (
        <View style={[styles.tile, {width: TILE_WIDTH}]}>
          <PremiumTouchableOpacity
            isPremium={item.isPremium}
            onPress={() => onSelect(item)}>
            {renderItem(item)}
          </PremiumTouchableOpacity>
        </View>
      )}
      {...rest}
    />
  );
};

BrowseActivities.propTypes = {
  onSelect: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(['small', 'large']),
};

BrowseActivities.defaultProps = {
  size: 'small',
};

export default BrowseActivities;

const styles = StyleSheet.create({
  container: {
    paddingLeft: Layout.padding,
    paddingRight: Layout.padding,
  },
  tile: {
    paddingRight: 8,
  },
});
