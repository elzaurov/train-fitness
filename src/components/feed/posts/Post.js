import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {
    FeedContainer,
    FeedCaption,
    FeedFooter,
    FeedLoading,
} from '@traineffective/te-component-library';
import PostHeader from './PostHeader';
import PostImage from './PostImage';
import {Layout, Colors} from '../../../constants';
import PostHOC from './PostHOC';

const Post = ({
    navigation,
    post,
    profile,
    postFeeling,
    isLiked,
    onPressReply,
    onPressEdit,
    onPressDelete,
    onLikePost,
    loading,
}) => {
    if (loading) {
        return <FeedLoading />;
    }
    return (
        <FeedContainer>
            <PostHeader
                navigation={navigation}
                profile={profile}
                post={post}
                onPressEdit={onPressEdit}
                onPressDelete={onPressDelete}
            />
            {(post?.metadata?.thumbnail || post?.imageURL) && (
                <PostImage
                    post={post}
                    postFeeling={postFeeling}
                    navigation={navigation}
                />
            )}
            {post?.metadata?.name && <FeedCaption userPostText={post?.text} />}
            <FeedFooter
                onLikePost={onLikePost}
                onPressReply={onPressReply}
                likeCount={post.likes?.length || '0'}
                isLikeActive={isLiked}
                isCommentActive={false}
                commentCount={
                    post.replies ? `${Object.keys(post.replies).length}` : '0'
                }
            />
        </FeedContainer>
    );
};

Post.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    post: PropTypes.objectOf(PropTypes.any).isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    postFeeling: PropTypes.objectOf(PropTypes.any),
    isLiked: PropTypes.bool.isRequired,
    onPressReply: PropTypes.func.isRequired,
    onPressEdit: PropTypes.func.isRequired,
    onPressDelete: PropTypes.func.isRequired,
    onLikePost: PropTypes.func.isRequired,
};

Post.defaultProps = {
    postFeeling: null,
};

export default PostHOC(Post);

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
        marginBottom: 10,
    },
    footerContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: Layout.padding,
        paddingRight: Layout.padding,
    },
    text: {
        fontSize: 16,
        color: Colors.silver,
        marginBottom: Layout.margin,
    },
    postText: {
        fontSize: 15,
        color: Colors.text,
        marginBottom: Layout.margin,
    },
    footerActions: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
});
