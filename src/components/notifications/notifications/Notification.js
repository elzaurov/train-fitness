import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RegularText} from '../../layout';
import {Colors, Layout} from '../../../constants';
import NotificationLoading from './NotificationLoading';
import NotificationHOC from './NotificationHOC';

const Notification = ({
  deleted,
  loading,
  navigation,
  notification,
  params,
  screen,
  text,
  thumbnail,
  navigationAction,
}) => {
  if (loading) {
    return <NotificationLoading />;
  }

  if (deleted) {
    return <View />;
  }

  const {createdAt} = notification;

  return (
    <View style={styles.notification}>
      {screen || navigationAction ? (
        <TouchableOpacity
          style={styles.link}
          onPress={() =>
            navigationAction
              ? navigation.dispatch(navigationAction)
              : navigation.push(screen, params)
          }>
          <View>
            {thumbnail ? (
              <FastImage style={styles.thumbnail} source={{uri: thumbnail}} />
            ) : (
              <View style={styles.thumbnail}>
                <MaterialCommunityIcons
                  name="bell"
                  size={24}
                  color={Colors.background}
                />
              </View>
            )}
          </View>
          <View style={styles.content}>
            <RegularText style={styles.time}>
              {moment(createdAt).fromNow()}
            </RegularText>
            <RegularText style={styles.text}>{text}</RegularText>
          </View>
          {/* <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={Colors.white}
          /> */}
        </TouchableOpacity>
      ) : (
        <View style={styles.link}>
          <View>
            {thumbnail ? (
              <FastImage style={styles.thumbnail} source={{uri: thumbnail}} />
            ) : (
              <View style={styles.thumbnail}>
                <MaterialCommunityIcons
                  name="bell"
                  size={24}
                  color={Colors.background}
                />
              </View>
            )}
          </View>
          <View style={styles.contentWithoutLink}>
            <RegularText style={styles.time}>
              {moment(createdAt).fromNow()}
            </RegularText>
            <RegularText style={styles.text}>{text}</RegularText>
          </View>
        </View>
      )}
    </View>
  );
};

Notification.propTypes = {
  deleted: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  notification: PropTypes.objectOf(PropTypes.any).isRequired,
  params: PropTypes.objectOf(PropTypes.any),
  screen: PropTypes.string,
  text: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  navigationAction: PropTypes.shape({
    dispatch: PropTypes.func,
  }),
};

Notification.defaultProps = {
  params: {},
  screen: null,
  thumbnail: null,
  navigationAction: null,
};

export default NotificationHOC(Notification);

const styles = StyleSheet.create({
  thumbnail: {
    width: 42,
    height: 42,
    minWidth: 42,
    borderRadius: 2,
    marginRight: 12,
    backgroundColor: Colors.separator,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notification: {
    borderBottomWidth: 1,
    borderColor: Colors.separator,
    padding: Layout.padding,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
    color: Colors.dustyGray,
    fontSize: 10,
  },
  text: {
    fontSize: 12,
  },
  content: {
    width: Layout.window.width - Layout.padding * 2 - 86,
  },
  contentWithoutLink: {
    width: Layout.window.width - Layout.padding * 2 - 54,
  },
});
