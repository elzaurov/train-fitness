import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../constants';
import SearchResultHOC from './SearchResultHOC';
import SearchResultItem from './SearchResultItem';
import {RegularText} from '../layout';

const SearchResult = ({
  result,
  showResult,
  noResult,
  searching,
  onContainerTouch,
}) => {
  if (!showResult) {
    return null;
  }

  let content;

  if (searching) {
    content = <ActivityIndicator style={styles.centered} size="large" />;
  } else if (result && result.length > 0) {
    content = (
      <ScrollView>
        {result.map((item) => (
          <SearchResultItem {...item} />
        ))}
      </ScrollView>
    );
  } else if (noResult) {
    content = (
      <View style={[styles.centered, styles.noResult]}>
        <MaterialCommunityIcon
          name="emoticon-sad-outline"
          color={Colors.white}
          size={48}
        />
        <RegularText>No result found</RegularText>
      </View>
    );
  } else {
    content = (
      <View style={styles.centered}>
        <RegularText>
          Type any keyword.. (for example: dribbling, defending or Ronaldo)
        </RegularText>
      </View>
    );
  }

  return (
    <View style={styles.wrapper} onTouchStart={onContainerTouch}>
      {content}
    </View>
  );
};

SearchResult.propTypes = {
  result: PropTypes.array,
  showResult: PropTypes.bool,
  noResult: PropTypes.bool,
  searching: PropTypes.bool,
  onContainerTouch: PropTypes.func.isRequired,
};

SearchResult.defaultProps = {
  result: null,
  showResult: false,
  noResult: false,
  searching: false,
};

export default SearchResultHOC(SearchResult);

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    elevation: Platform.OS === 'android' ? 50 : 0,
    zIndex: 10,
    backgroundColor: `${Colors.mineShaft}ee`,
  },
  centered: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  noResult: {
    alignItems: 'center',
  },
});
