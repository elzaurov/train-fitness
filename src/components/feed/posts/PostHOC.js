import React, {Component} from 'react';
import {Alert} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    likeDislikeComment,
    loadUserProfile,
    deleteNote,
    deleteNoteAdmin,
} from '../../../actions';
import {
    FEED_NOTE_ACTION_LIKE,
    FEED_NOTE_ACTION_DISLIKE,
} from '../../../constants';

const PostHOCWrapper = InnerComponent => {
    class PostHOC extends Component {
        _isMounted = false;
        state = {
            liked: false,
            loading: true,
        };

        async componentDidMount() {
            this._isMounted = true;
            const {post} = this.props;

            await this.props.loadUserProfile(post.uid);

            if (this._isMounted) {
                this.setState({
                    loading: false,
                });
            }
        }

        componentWillUnmount() {
            this._isMounted = false;
        }

        handleLikePost = () => {
            const {post, profile} = this.props;
            const {liked} = this.state;
            const {uid} = profile;

            const reactedPost = {
                ...post,
                likes: [...(post.likes ?? [])],
            };

            if (reactedPost.likes.includes(uid)) {
                reactedPost.likes = reactedPost.likes.filter(
                    reactionUid => reactionUid !== uid,
                );
            } else {
                reactedPost.likes = [...reactedPost.likes, uid];
            }

            this.setState(
                {
                    post: reactedPost,
                    liked: !liked,
                },
                () => {
                    const action = this.state.liked
                        ? FEED_NOTE_ACTION_LIKE
                        : FEED_NOTE_ACTION_DISLIKE;

                    this.props.likeDislikeComment(
                        reactedPost,
                        reactedPost.uid,
                        action,
                    );
                },
            );
        };

        handleDelete = () => {
            Alert.alert(
                'Are you sure you want to delete the post?',
                'You will not restore this post',
                [
                    {text: 'No', onPress: () => {}},
                    {text: 'Yes', onPress: () => this.deleteNote()},
                ],
                {cancelable: true},
            );
        };

        deleteNote = async () => {
            const {key, uid: postUid} = this.props.post;
            const {isAdmin, uid} = this.props.profile;

            try {
                this.setState({deleting: true});

                if (uid === postUid) {
                    await this.props.deleteNote(key);
                } else if (isAdmin === true) {
                    await this.props.deleteNoteAdmin({key, uid: postUid});
                }
            } finally {
                this.setState({deleting: false});
            }
        };

        render() {
            const {navigation, post, profile} = this.props;
            const {key, likes} = post;
            const isLiked = likes ? likes.includes(profile.uid) : false;
            const handlePressReply = () =>
                navigation.push('Replies', {
                    id: key,
                    type: 'notes',
                    showInput: true,
                });
            const handlePressEdit = () =>
                navigation.push('WriteNote', {
                    id: key,
                });

            return (
                <InnerComponent
                    {...this.state}
                    {...this.props}
                    isLiked={isLiked}
                    onPressReply={handlePressReply}
                    onPressEdit={handlePressEdit}
                    onPressDelete={this.handleDelete}
                    onLikePost={this.handleLikePost}
                />
            );
        }
    }

    function mapStateToProps({profile, profiles, workouts}) {
        return {profile, profiles, workouts};
    }

    PostHOC.propTypes = {
        post: PropTypes.objectOf(PropTypes.any).isRequired,
        navigation: PropTypes.objectOf(PropTypes.any).isRequired,
        profile: PropTypes.objectOf(PropTypes.any).isRequired,
        loadUserProfile: PropTypes.func.isRequired,
        likeDislikeComment: PropTypes.func.isRequired,
        deleteNote: PropTypes.func.isRequired,
        deleteNoteAdmin: PropTypes.func.isRequired,
    };

    return connect(mapStateToProps, {
        loadUserProfile,
        likeDislikeComment,
        deleteNote,
        deleteNoteAdmin,
    })(PostHOC);
};

export default PostHOCWrapper;
