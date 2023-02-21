import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  loadCommentToNotification,
  loadNoteToNotification,
  loadUserProfile,
} from '../../../actions';
import {DEFAULT_PHOTO_URL} from '../../../constants';
import {NavigationActions} from '@react-navigation/compat';

const NotificationHOCWrapper = (InnerComponent) => {
  class NotificationHOC extends Component {
    state = {
      deleted: false,
      loading: true,
      text: '',
      screen: null,
      thumbnail: null,
      params: {},
    };

    async componentDidMount() {
      const {notification} = this.props;
      const {key} = notification;
      const localNotifications =
        (await AsyncStorage.getItem('notifications')) ||
        `{ "createdAt": ${moment().valueOf()} }`;
      let cachedNotifications = await JSON.parse(localNotifications);

      if (moment().diff(cachedNotifications.createdAt, 'hours') >= 24) {
        AsyncStorage.removeItem('notifications');
        cachedNotifications = {createdAt: moment().valueOf()};
      }

      const data = cachedNotifications[key]
        ? cachedNotifications[key]
        : await this.generateNotificationData(notification);

      cachedNotifications[key] = data;

      AsyncStorage.setItem(
        'notifications',
        JSON.stringify(cachedNotifications),
      );

      this.setState({
        ...data,
        loading: false,
      });
    }

    generateNotificationData = async ({type, metadata}) => {
      // const { profile } = this.props;

      if (type.includes('reply') || type.includes('post')) {
        const {commentId, fromUser} = metadata;
        const {displayName, photoURL} = await this.props.loadUserProfile(
          fromUser,
        );

        const isComment = type === 'reply-comments';
        const isPostLike = type === 'post-like';
        const isReplyLike = type === 'reply-like';

        if (isComment) {
          const comment = await this.props.loadCommentToNotification(commentId);
          const commentText =
            comment.text && comment.text.length > 40
              ? `${comment.text.substring(0, 37)}...`
              : comment.text;

          return {
            deleted: !commentText,
            text: `${displayName} replied to your comment "${
              commentText || ''
            }"`,
            screen: 'Replies',
            thumbnail: photoURL || DEFAULT_PHOTO_URL,
            params: {id: commentId, type: 'comments'},
          };
        } else if (isPostLike) {
          return {
            text: `${displayName} liked your post`,
            thumbnail: photoURL || DEFAULT_PHOTO_URL,
            navigationAction: NavigationActions.navigate({
              routeName: 'Main',
              action: NavigationActions.navigate({
                routeName: 'Feed',
                params: {id: commentId},
              }),
            }),
          };
        } else if (isReplyLike) {
          return {
            text: `${displayName} liked your reply`,
            screen: 'Replies',
            thumbnail: photoURL || DEFAULT_PHOTO_URL,
            params: {id: commentId, type: 'comments'},
          };
        }

        const note = await this.props.loadNoteToNotification(commentId);
        const noteText =
          note.text && note.text.length > 40
            ? `${note.text.substring(0, 37)}...`
            : note.text;
        // const isOwner = note.commentUserId === profile.userId;

        return {
          deleted: !noteText,
          text: `${displayName} replied to your note "${noteText || ''}"`,
          screen: 'Replies',
          thumbnail: photoURL || DEFAULT_PHOTO_URL,
          params: {id: commentId, type: 'notes'},
        };
      } else if (type.includes('community-exercise')) {
        const {videoName, status, fromUser} = metadata;
        const {displayName} = await this.props.loadUserProfile(fromUser);

        if (status) {
          return {
            text: `You video "${videoName}" was ${status} by ${displayName}!`,
            screen: null,
            // url: '/community?tab="my-exercises"',
          };
        }

        return {
          text: `${displayName} add a new community exercise video "${videoName}"!`,
          screen: null,
          // url: '/admin/community/exercises',
        };
      } else if (type === 'new-stats') {
        const {experience, item} = metadata;
        const isLearning = item && item.url.includes('learning');
        const screens = {
          'cross-training': 'CrossTraining',
          'game-brain': 'Learning',
          team: 'Team',
          classroom: 'Learning',
          workout: 'ViewWorkout',
        };
        let message = item
          ? ` for ${isLearning ? 'watching' : 'completing'} "${item.name}"`
          : '';

        if (item && item.topComment) {
          message = ' for the top comment';
        }
        return {
          text: `You earned ${experience}xp${message}! Good job!`,
          thumbnail: item ? item.thumbnail : null,
          screen: item ? screens[item.type] : null,
          params: item
            ? {id: item.key, type: item.type, videoPath: item.type}
            : null,
        };
      } else if (type === 'new-badge') {
        const {badge} = metadata;

        return {
          text: `Congratulations! You unlocked the badge "${badge.title} - ${badge.level}"`,
          thumbnail: badge.badge,
          screen: 'Profile',
        };
      }

      return {text: '', url: null};
    };

    // handleNotificationClick = ({ screen, params }) => {
    //
    // }

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          // onNotificationClick={this.handleNotificationClick}
        />
      );
    }
  }

  function mapStateToProps({profile, profiles}) {
    return {profile, profiles};
  }

  NotificationHOC.propTypes = {
    notification: PropTypes.objectOf(PropTypes.any).isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    loadCommentToNotification: PropTypes.func.isRequired,
    loadNoteToNotification: PropTypes.func.isRequired,
    loadUserProfile: PropTypes.func.isRequired,
  };

  return connect(mapStateToProps, {
    loadCommentToNotification,
    loadNoteToNotification,
    loadUserProfile,
  })(NotificationHOC);
};

export default NotificationHOCWrapper;
