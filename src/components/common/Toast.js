import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {RegularText, IconButton, TitleText} from '../layout';
import {
  Colors,
  Layout,
  EVENT_TYPE_INFO,
  EVENT_TYPE_WARNING,
  EVENT_TYPE_SUCCESS,
  EVENT_TYPE_ERROR,
} from '../../constants';

const Toast = ({text, title, type, onPress, onSeen}) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const opacityValue = new Animated.Value(0);

    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();

    setOpacity(opacityValue);
  }, []);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container]}>
      <SafeAreaView>
        <Animated.View
          key={text}
          style={[
            styles.content,
            {
              borderLeftColor: Colors[colorMappings[type]],
              opacity: opacity,
            },
          ]}>
          <View style={styles.textContainer}>
            {title ? (
              <TitleText style={styles.title} numberOfLines={1}>
                {String(title)}
              </TitleText>
            ) : null}
            {text ? (
              <RegularText style={styles.text} numberOfLines={2}>
                {String(text)}
              </RegularText>
            ) : null}
          </View>
          <IconButton icon="close" onPress={onSeen} />
        </Animated.View>
      </SafeAreaView>
    </TouchableOpacity>
  );
};

Toast.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  onSeen: PropTypes.func,
  onPress: PropTypes.func,
};

Toast.defaultProps = {
  text: null,
  title: null,
  type: EVENT_TYPE_INFO,
  onSeen: () => {},
  onPress: () => {},
};

export default Toast;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 100,
    // android only
    elevation: 3,
  },
  content: {
    padding: Layout.padding,
    backgroundColor: Colors.mineShaft,
    marginLeft: Layout.padding,
    marginRight: Layout.padding,
    marginBottom: 8,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderLeftColor: Colors.success,
    borderLeftWidth: 4,
    // ios only
    shadowColor: Colors.black,
    shadowRadius: 4,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginTop: Layout.isIOS ? 0 : 8,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
  },
});

const colorMappings = {
  [EVENT_TYPE_INFO]: 'info',
  [EVENT_TYPE_WARNING]: 'warning',
  [EVENT_TYPE_SUCCESS]: 'success',
  [EVENT_TYPE_ERROR]: 'error',
};
