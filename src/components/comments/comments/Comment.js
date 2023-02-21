import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {withTranslation} from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import {UserPhoto} from '../../common';
import {PremiumActionHOC} from '../../premium';
import {BoldText, FlatButton, LinkText, RegularText, Input} from '../../layout';
import {Colors, Layout} from '../../../constants';
import CommentText from './CommentText';
import CommentHOC from './CommentHOC';

const Comment = ({
    cachedComment,
    comment,
    canDislike,
    deleting,
    disabled,
    isReply,
    isReplyScreen,
    isUserOwner,
    navigation,
    profile,
    replyUserProfile,
    style,
    type,
    userId,
    onDelete,
    onDislikeComment,
    onLikeComment,
    onToggleReply,
    isReplying,
    t,
}) => {
    const {createdAt, dislikes, editedAt, key, likes, replies, text, uid} =
        cachedComment || comment;
    const isReplyComment = isReply || isReplyScreen;
    const repliesLength = replies ? Object.keys(replies).length : 0;
    const {displayName} = profile;

    const onEditFn =
        type === 'notes' && !isReply
            ? () => navigation.push('WriteNote', {id: key})
            : () => onToggleReply({editedComment: comment});

    const onEdit = () => onEditFn();
    const onPressReply = isReplyComment
        ? () => onToggleReply({replyUserId: isReply ? comment.uid : uid})
        : () => navigation.push('Replies', {id: key, type, showInput: true});
    const createdDate = moment(Number(createdAt));
    const dateDiff = moment().diff(createdDate, 'days');
    const date =
        dateDiff >= 30 ? createdDate.format('ll') : createdDate.fromNow();
    const isLiked = likes ? likes.includes(userId) : null;
    const isDesliked = dislikes ? dislikes.includes(userId) : null;
    const CommentView = isReplyScreen ? ScrollView : Fragment;
    const commentProps = isReplyScreen ? {style: styles.replyComment} : {};

    const PremiumFlatButton = PremiumActionHOC(FlatButton);

    return (
        <CommentView {...commentProps}>
            <View style={[styles.row, style, deleting ? styles.deleting : {}]}>
                {uid && <UserPhoto style={styles.avatar} uid={uid} size={36} />}
                <View style={styles.content}>
                    <View style={styles.rowEnd}>
                        <BoldText>{displayName}</BoldText>
                        <RegularText style={styles.date}>{date}</RegularText>
                    </View>
                    <Menu>
                        <MenuTrigger disabled={deleting || !isUserOwner}>
                            {text
                                ? text
                                      .replace(/\n{2,}/g, '\n')
                                      .split(/\n/g)
                                      .map((txt, i) => (
                                          <CommentText
                                              key={i}
                                              isFirst={i === 0}
                                              text={txt}
                                              replyUserProfile={
                                                  replyUserProfile
                                              }
                                          />
                                      ))
                                : null}
                            {editedAt && (
                                <RegularText style={styles.edited}>
                                    ( {t('edited')} )
                                </RegularText>
                            )}
                        </MenuTrigger>
                        <MenuOptions
                            customStyles={{
                                optionText: {fontSize: 18},
                                optionWrapper: {padding: Layout.padding},
                            }}>
                            <MenuOption onSelect={onEdit} text={t('edit')} />
                            <MenuOption
                                onSelect={onDelete}
                                text={t('delete')}
                            />
                        </MenuOptions>
                    </Menu>
                    <View style={styles.rowCenter}>
                        <PremiumFlatButton
                            style={styles.replyButton}
                            textStyle={styles.replyText}
                            onPress={onPressReply}
                            disabled={disabled}>
                            REPLY
                        </PremiumFlatButton>
                        {likes && likes.length > 0 && (
                            <RegularText style={styles.replyText}>
                                {likes.length}
                            </RegularText>
                        )}
                        <FlatButton onPress={onLikeComment} disabled={disabled}>
                            <MaterialCommunityIcons
                                name="thumb-up"
                                color={
                                    isLiked ? Colors.green : Colors.dustyGray
                                }
                                size={14}
                            />
                        </FlatButton>
                        {canDislike ? (
                            <FlatButton
                                onPress={onDislikeComment}
                                disabled={disabled}>
                                <MaterialCommunityIcons
                                    name="thumb-down"
                                    color={
                                        isDesliked
                                            ? Colors.alizarinCrimson
                                            : Colors.dustyGray
                                    }
                                    size={14}
                                />
                            </FlatButton>
                        ) : null}
                        {dislikes && dislikes.length > 0 && (
                            <RegularText style={styles.replyText}>
                                {dislikes.length}
                            </RegularText>
                        )}
                    </View>

                    {repliesLength > 0 && !isReplyScreen && (
                        <View>
                            <LinkText
                                onPress={() =>
                                    navigation.push('Replies', {id: key, type})
                                }>
                                {`${t('show')} ${repliesLength} ${
                                    repliesLength === 1
                                        ? t('reply')
                                        : t('replies')
                                }`}
                            </LinkText>
                        </View>
                    )}
                </View>
            </View>
        </CommentView>
    );
};

Comment.propTypes = {
    cachedComment: PropTypes.objectOf(PropTypes.any),
    comment: PropTypes.objectOf(PropTypes.any).isRequired,
    deleting: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    canDislike: PropTypes.bool,
    isReply: PropTypes.bool,
    isReplyScreen: PropTypes.bool,
    isUserOwner: PropTypes.bool.isRequired,
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    replyUserProfile: PropTypes.objectOf(PropTypes.any),
    style: PropTypes.objectOf(PropTypes.any),
    type: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDislikeComment: PropTypes.func.isRequired,
    onLikeComment: PropTypes.func.isRequired,
    onToggleReply: PropTypes.func,
    t: PropTypes.func.isRequired,
};

Comment.defaultProps = {
    cachedComment: null,
    canDislike: true,
    disabled: false,
    isReply: false,
    isReplyScreen: false,
    onToggleReply: () => {},
    replyUserProfile: undefined,
    style: {},
};

export default CommentHOC(withTranslation('commentComponent')(Comment));

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: Layout.margin + Layout.halfMargin,
    },
    rowEnd: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    date: {
        color: Colors.dustyGray,
        paddingLeft: Layout.halfPadding,
        marginBottom: 1,
        fontSize: 11,
    },
    avatar: {
        marginTop: 3,
    },
    deleting: {
        opacity: 0.5,
    },
    replyComment: {
        maxHeight: 120,
    },
    content: {
        width: Layout.window.width - 45 - Layout.padding - Layout.halfPadding,
        paddingLeft: Layout.halfPadding,
    },
    edited: {
        color: Colors.dustyGray,
        fontSize: 10,
    },
    privateText: {
        paddingLeft: 4,
    },
    replyButton: {
        padding: 0,
        paddingLeft: 0,
        paddingRight: Layout.halfPadding,
        // marginRight: Layout.halfMargin,
    },
    replyText: {
        color: Colors.dustyGray,
    },
});
