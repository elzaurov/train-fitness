import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressBar from 'react-native-progress/Bar';
import {SafeArea, RegularText} from '../layout';
import {Layout, Colors} from '../../constants';

const HeaderProgressBar = ({
  navigation,
  percentage,
  title,
  rightItem,
  disableBackButton,
}) => {
  const fullscreen = useSelector((state) => state.android_player.fullscreen);

  return (
    <View style={[styles.container, fullscreen ? styles.hideContainer : {}]}>
      <SafeArea color={Colors.gray3} />
      <View style={styles.headerContainer}>
        <View style={styles.itemContainer}>
          {!disableBackButton && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={navigation.goBack}>
              <MaterialCommunityIcons
                name="chevron-left"
                size={36}
                color={Colors.dustyGray}
              />
            </TouchableOpacity>
          )}
        </View>
        {!!title && (
          <RegularText style={styles.title}>{title.toUpperCase()}</RegularText>
        )}
        <View style={styles.itemContainer}>{rightItem}</View>
      </View>
      {!!percentage && (
        <ProgressBar
          progress={percentage}
          width={Layout.window.width}
          color={Colors.secondary2}
          height={3.5}
          borderWidth={0}
          borderRadius={0}
          unfilledColor={Colors.background2}
        />
      )}
    </View>
  );
};

HeaderProgressBar.propTypes = {
  navigation: PropTypes.any.isRequired,
  percentage: PropTypes.number,
  title: PropTypes.string,
  disableBackButton: PropTypes.bool,
  rightItem: PropTypes.any,
};

HeaderProgressBar.defaultProps = {
  percentage: null,
  title: '',
  disableBackButton: false,
  rightItem: undefined,
};

export default HeaderProgressBar;

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width,
    backgroundColor: Colors.gray3,
  },
  hideContainer: {
    display: 'none',
  },
  headerContainer: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 40,
  },
  backButton: {},
  title: {
    fontSize: 18,
  },
});
