import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Platform } from 'react-native';

import { FeedHeader } from '@traineffective/te-component-library';

import PostHeaderHOC from './PostHeaderHOC';
import { getBadgeColor } from '../../../utils/badgeColor';

const getAlertMessageHeader = platform => {
    if (platform === 'android') {
        return 'Post';
    }

    return null;
};

const getAlertMessage = platform => {
    if (platform === 'android') {
        return 'Options';
    }

    return null;
};
const defaultBlankAvatar =
    'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg';
const PostHeader = props => {
    const {
        createdAt,
        post,
        postProfile,
        profile,
        actionEnabled,
        onPressEdit,
        onPressDelete,
        handlePressAvatar,
    } = props;

    const onPressMore = () => {
        const MENU_ITEMS = [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Delete Post',
                onPress: onPressDelete,
                style: 'destructive',
            },
            { text: 'Edit', onPress: onPressEdit },
        ]

        if (profile.isAdmin) {
            MENU_ITEMS.pop();
        }

        Alert.alert(
            getAlertMessageHeader(Platform.OS),
            getAlertMessage(Platform.OS),
            MENU_ITEMS,
            { cancelable: true },
        );
    };

    let userLevel = post?.userLevel;
    if (!userLevel || userLevel < postProfile?.level) {
        userLevel = postProfile?.level;
    }

    return (
        <FeedHeader
            createdAt={createdAt}
            onPressMore={onPressMore}
            showMoreIcon={actionEnabled}
            onAvatarPress={handlePressAvatar}
            badgeLevel={userLevel}
            avatarImage={post?.userPhotoURL || defaultBlankAvatar}
            badgeColor={getBadgeColor(userLevel)}
            userName={
                post?.userName ||
                postProfile?.displayName ||
                profile?.displayName
            }
            postDateTime={createdAt}
            experienceStats={post?.metadata?.experience || null}
        />
    );
};

export default PostHeaderHOC(PostHeader);

PostHeader.propTypes = {
    createdAt: PropTypes.string.isRequired,
    post: PropTypes.objectOf(PropTypes.any).isRequired,
    postProfile: PropTypes.objectOf(PropTypes.any).isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    actionEnabled: PropTypes.bool,
    onPressEdit: PropTypes.func.isRequired,
    onPressDelete: PropTypes.func.isRequired,
};
