import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet, View, ViewPropTypes} from 'react-native';
import SafeArea from './SafeArea';
import {Layout, Colors} from '../../constants';

const BottomBarTemplate = ({bottomBar, children, style}) => {
  const fullscreen = useSelector((state) => state.android_player.fullscreen);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.childrenContainer}>{children}</View>
      {bottomBar ? (
        <SafeArea style={fullscreen && styles.hideBottomBarContainer}>
          <View style={styles.bottomBarContainer}>
            {bottomBar}
          </View>
        </SafeArea>
      ) : null}
    </View>
  );
};

BottomBarTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  bottomBar: PropTypes.node,
  style: ViewPropTypes.style,
};

BottomBarTemplate.defaultProps = {
  bottomBar: null,
  style: {},
};

export default BottomBarTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background2,
  },
  childrenContainer: {
    flex: 1,
  },
  bottomBarContainer: {
    padding: Layout.padding / 2,
  },
  hideBottomBarContainer: {
    display: 'none',
  },
});
