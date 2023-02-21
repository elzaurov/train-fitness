import React from 'react';
import PropTypes from 'prop-types';
import {Animated, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IconButton, RegularText} from '../layout';
import Header from './Header';

const AuthHeader = ({backButton, title, scene, ...rest}) => {
  const navigation = useNavigation();
  const headerTitle = scene?.descriptor?.options?.title ?? title;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const progress = Animated.add(
    scene.progress.current,
    scene.progress.next ?? 0,
  );

  const opacity = progress.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return (
    <Animated.View style={{opacity}}>
      <Header
        left={
          backButton ? (
            <IconButton
              icon="chevron-left"
              iconSize={36}
              onPress={handleBackPress}
            />
          ) : null
        }
        middle={
          headerTitle ? (
            <RegularText style={styles.header}>{headerTitle}</RegularText>
          ) : null
        }
        scene={scene}
        {...rest}
      />
    </Animated.View>
  );
};

AuthHeader.propTypes = {
  backButton: PropTypes.bool,
  title: PropTypes.string,
  scene: PropTypes.object,
};

AuthHeader.defaultProps = {
  backButton: false,
  title: null,
  scene: null,
};

export default AuthHeader;

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 18,
  },
});
