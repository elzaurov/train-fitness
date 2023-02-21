import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressBar from 'react-native-progress/Bar';
import {SafeArea} from '../../components/layout';
import {Layout, Colors} from '../../constants';
import HeaderProgressHOC from './HeaderProgressHOC';

const HeaderProgress = ({
  navigation,
  percentage,
  title,
  disableBackButton,
  onLeftAction,
  onRightAction,
}) => (
  <View style={styles.container}>
    <SafeArea color={Colors.mineShaft} />
    <View style={styles.headerContainer}>
      {!disableBackButton ? (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => (onLeftAction ? onLeftAction() : navigation.pop())}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={36}
            color={Colors.dustyGray}
          />
        </TouchableOpacity>
      ) : null}
      {title ? (
        <Text numberOfLines={1} style={styles.title}>
          {title.toUpperCase()}
        </Text>
      ) : null}
      {onRightAction ? (
        <TouchableOpacity
          style={styles.rightActionButton}
          onPress={() => onRightAction()}>
          <MaterialCommunityIcons
            name="check"
            size={29}
            color={Colors.dustyGray}
          />
        </TouchableOpacity>
      ) : null}
    </View>
    {percentage ? (
      <ProgressBar
        progress={percentage}
        width={Layout.window.width}
        color={Colors.secondary2}
        height={3.5}
        borderWidth={0}
        borderRadius={0}
        unfilledColor={Colors.background2}
      />
    ) : null}
  </View>
);

HeaderProgress.propTypes = {
  navigation: PropTypes.any.isRequired,
  percentage: PropTypes.number,
  title: PropTypes.string,
  disableBackButton: PropTypes.bool,
  onRightAction: PropTypes.func,
  onLeftAction: PropTypes.func,
};

HeaderProgress.defaultProps = {
  percentage: null,
  title: '',
  disableBackButton: false,
  onRightAction: null,
  onLeftAction: null,
};

export default HeaderProgressHOC(HeaderProgress);

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width,
    backgroundColor: Colors.mineShaft,
  },
  headerContainer: {
    // height: 60,
    height: Layout.iosVersion < 11 && Layout.isIOS ? 76 : 56,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 7,
  },
  rightActionButton: {
    position: 'absolute',
    right: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Regular',
    color: Colors.white,
    width: Layout.window.width * 0.7,
  },
});
