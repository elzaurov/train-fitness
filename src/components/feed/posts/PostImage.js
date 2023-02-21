import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {FeedContent} from '@traineffective/te-component-library';
import {Layout} from '../../../constants';
import PostImageHOC from './PostImageHOC';

const PostImage = ({post, postFeeling, onPressActivity}) => {
    return (
        <FeedContent
            sizedImages={!post?.imageURL && post?.metadata?.sizedImages}
            onPressActivity={onPressActivity}
            postFeeling={postFeeling}
            feedImage={post?.imageURL || post?.metadata?.thumbnail}
            workoutTitle={post?.metadata?.name}
            isWorkoutDuration={Boolean(post?.metadata?.time) || false}
            workoutDuration={Math.ceil(post?.metadata?.time)}
        />
    );
};

export default PostImageHOC(PostImage);

PostImage.propTypes = {
    post: PropTypes.objectOf(PropTypes.any).isRequired,
    postFeeling: PropTypes.objectOf(PropTypes.any),
    imageURL: PropTypes.string,
    thumbnail: PropTypes.string,
    onPressActivity: PropTypes.func.isRequired,
};

PostImage.defaultProps = {
    imageURL: null,
    thumbnail: null,
    postFeeling: null,
};

const styles = StyleSheet.create({
    container: {
        height: Layout.window.width * 0.85,
        width: Layout.window.width,
        marginBottom: 15,
    },
    linearGradient: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    image: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
    },
});
