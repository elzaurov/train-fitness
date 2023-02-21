import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {Alert} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import {connect} from 'react-redux';
import {
    deleteComment,
    deleteNote,
    deleteReply,
    likeDislikeComment,
    likeDislikeReply,
    loadUserProfile,
} from '../../../actions';
import {
    FEED_REPLY_ACTION_LIKE,
    FEED_REPLY_ACTION_DISLIKE,
    FEED_NOTE_ACTION_LIKE,
    FEED_NOTE_ACTION_DISLIKE,
} from '../../../constants';

const CommentHOCWrapper = InnerComponent => {
    class CommentHOC extends Component {
        state = {
            cachedComment: null,
            deleting: false,
            loading: true,
        };

        async componentDidMount() {
            const {comment} = this.props;

            await this.props.loadUserProfile(comment.uid);

            if (comment.replyUserId) {
                await this.props.loadUserProfile(comment.replyUserId);
            }

            this.setState({loading: false, cachedComment: comment});
        }

        componentDidUpdate(props) {
            const {comment, isReplyScreen, navigation, t} = props;

            if (!comment.uid && isReplyScreen && !this.alertOpened) {
                this.alertOpened = true;

                Alert.alert(
                    t('alert.titles.deleted'),
                    t('alert.messages.deleted'),
                    [
                        {
                            text: t('alert.buttons.ok'),
                            onPress: () => navigation.goBack(),
                        },
                    ],
                    {cancelable: false},
                );
            }
        }

        handleDelete = () => {
            const {comment, isReply, t} = this.props;
            const type = comment.videoId ? 'comments' : 'notes';
            let fn = type === 'notes' ? this.deleteNote : this.deleteComment;

            if (isReply) {
                fn = this.deleteReply;
            }

            Alert.alert(
                t(`alert.titles.${isReply ? 'replies' : type}`),
                t(`alert.messages.${isReply ? 'replies' : type}`),
                [
                    {text: t('alert.buttons.no'), onPress: () => {}},
                    {text: t('alert.buttons.yes'), onPress: () => fn()},
                ],
                {cancelable: true},
            );
        };

        deleteReply = () => {
            const {comment} = this.props;

            this.setState({deleting: true}, () => {
                this.props.deleteReply(comment.key);
            });
        };

        deleteNote = () => {
            this.deleteItem(this.props.deleteNote);
        };

        deleteComment = () => {
            this.deleteItem(this.props.deleteComment);
        };

        deleteItem = deleteFn => {
            const {comment} = this.props;

            this.setState({deleting: true}, () => {
                deleteFn(comment.key);
            });
        };

        handleLikeComment = () => {
            const {comment, isReply, profile} = this.props;
            const {uid} = profile;

            const reactedComment = {
                ...comment,
                likes: [...(comment.likes ?? [])],
                dislikes: [...(comment.dislikes ?? [])],
            };

            if (reactedComment.likes.includes(uid)) {
                reactedComment.likes = reactedComment.likes.filter(
                    reactedUid => reactedUid !== uid,
                );
            } else {
                reactedComment.likes = [...reactedComment.likes, uid];
                reactedComment.dislikes = reactedComment.dislikes.filter(
                    reactedUid => reactedUid !== uid,
                );
            }

            this.setState({cachedComment: reactedComment}, () => {
                if (isReply) {
                    this.props.likeDislikeReply(
                        reactedComment,
                        reactedComment.uid,
                        FEED_REPLY_ACTION_LIKE,
                    );
                } else {
                    this.props.likeDislikeComment(
                        reactedComment,
                        reactedComment.uid,
                        FEED_NOTE_ACTION_LIKE,
                    );
                }
            });
        };

        handleDislikeComment = () => {
            const {comment, isReply, profile} = this.props;
            const {uid} = profile;

            const reactedComment = {
                ...comment,
                likes: [...(comment.likes ?? [])],
                dislikes: [...(comment.dislikes ?? [])],
            };

            if (reactedComment.dislikes.includes(uid)) {
                reactedComment.dislikes = reactedComment.dislikes.filter(
                    reactedUid => reactedUid !== uid,
                );
            } else {
                reactedComment.dislikes = [...reactedComment.dislikes, uid];
                reactedComment.likes = reactedComment.likes.filter(
                    reactedUid => reactedUid !== uid,
                );
            }

            this.setState({cachedComment: reactedComment}, () => {
                if (isReply) {
                    this.props.likeDislikeReply(
                        reactedComment,
                        reactedComment.uid,
                        FEED_REPLY_ACTION_DISLIKE,
                    );
                } else {
                    this.props.likeDislikeComment(
                        reactedComment,
                        reactedComment.uid,
                        FEED_NOTE_ACTION_DISLIKE,
                    );
                }
            });
        };


        render() {
            const {comment, profile, profiles} = this.props;
            const {uid} = comment;

            return (
                <InnerComponent
                    {...this.state}
                    {...this.props}
                    isUserOwner={profile.uid === uid}
                    userId={profile.uid}
                    profile={
                        profile.uid === uid
                            ? {...profiles[uid], ...profile}
                            : profiles[uid] || {}
                    }
                    replyUserProfile={profiles[comment.replyUserId]}
                    onDelete={this.handleDelete}
                    onDislikeComment={this.handleDislikeComment}
                    onLikeComment={this.handleLikeComment}
                />
            );
        }
    }

    function mapStateToProps({profile, profiles}) {
        return {profile, profiles};
    }

    CommentHOC.propTypes = {
        comment: PropTypes.objectOf(PropTypes.any).isRequired,
        isReply: PropTypes.bool,
        isReplyScreen: PropTypes.bool,
        navigation: PropTypes.objectOf(PropTypes.any).isRequired,
        profile: PropTypes.objectOf(PropTypes.any).isRequired,
        profiles: PropTypes.objectOf(PropTypes.any).isRequired,
        type: PropTypes.string.isRequired,
        deleteComment: PropTypes.func.isRequired,
        deleteNote: PropTypes.func.isRequired,
        deleteReply: PropTypes.func.isRequired,
        likeDislikeComment: PropTypes.func.isRequired,
        likeDislikeReply: PropTypes.func.isRequired,
        loadUserProfile: PropTypes.func.isRequired,
        t: PropTypes.func.isRequired,
    };

    CommentHOC.defaultProps = {
        isReply: false,
        isReplyScreen: false,
    };

    return connect(mapStateToProps, {
        deleteComment,
        deleteNote,
        deleteReply,
        likeDislikeComment,
        likeDislikeReply,
        loadUserProfile,
    })(withNavigation(withTranslation('commentComponent')(CommentHOC)));
};

export default CommentHOCWrapper;
