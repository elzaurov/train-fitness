import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {StyleSheet, View, Platform} from 'react-native';
import RepliesHOC from './RepliesHOC';
import {Comment, CommentForm, CommentLoading} from '../../comments';
import {RegularText, ScrollFlatList} from '../../layout';
import {PremiumHOC} from '../../premium';
import {Colors, Layout} from '../../../constants';

const Replies = ({
  comment,
  commentId,
  editedComment,
  formVisible,
  loadedReply,
  loading,
  replies,
  replyUserId,
  type,
  onToggleReply,
  t,
}) => {
  const loadingReplies = [
    {key: '0'},
    {key: '1'},
    {key: '2'},
    {key: '3'},
    {key: '4'},
    {key: '5'},
  ];

  const filteredReplies = replies.filter(
    (reply) => reply.commentId === commentId,
  );
  const replyComponents = filteredReplies.map((reply) => (
    <Comment
      key={reply.key}
      type={type}
      comment={reply}
      isReply={true}
      onToggleReply={onToggleReply}
    />
  ));

  const creationDates = replies.map(({createdAt}) => createdAt);

  if (loadedReply && !creationDates.includes(loadedReply.createdAt)) {
    const reply = (
      <Comment
        key={loadedReply.key}
        type={type}
        comment={loadedReply}
        disabled={true}
        isReply={true}
        onToggleReply={onToggleReply}
      />
    );

    replyComponents.push(reply);
  }

  let heightFactor = comment.text.length < 60 ? 148 : 156;

  if (comment.text.length > 200) {
    heightFactor = 164;
  }

  const maxHeight = Layout.window.height - Layout.headerHeight - heightFactor;

  const paddingBottom = Platform.OS !== 'ios' ? 65 : 40

  const PremiumCommentForm = PremiumHOC(CommentForm);

  return (
    <Fragment>
      <View style={styles.content}>
        <View style={styles.comment}>
          {loading ? (
            <CommentLoading />
          ) : (
            <Comment
              style={{marginBottom: 0}}
              key={comment.key}
              type={type}
              comment={comment}
              isReplyScreen={true}
              onToggleReply={onToggleReply}
              canDislike={false}
            />
          )}
        </View>
        <View style={styles.replies}>
          <RegularText>{t('replies')}</RegularText>
        </View>
        <View style={{maxHeight,paddingBottom}}>
          <ScrollFlatList
            headerStyle={styles.list}
            optionsStyle={styles.list}
            noFlex={true}
            inverted={true}
            hideSearch={true}
            hideListOptions={true}
            data={loading ? loadingReplies : filteredReplies}
            renderItem={({item}) => {
              if (loading) {
                return <CommentLoading />;
              }

              return (
                <Comment
                  type={type}
                  comment={item}
                  isReply={true}
                  onToggleReply={onToggleReply}
                />
              );
            }}
          />
        </View>
      </View>
      {formVisible && (
        <PremiumCommentForm
          comment={comment}
          editedComment={editedComment}
          isReply={
            !editedComment ||
            (editedComment && editedComment.key !== comment.key)
          }
          replyUserId={replyUserId}
          type={type}
          onBlur={onToggleReply}
          onSubmit={onToggleReply}
        />
      )}
    </Fragment>
  );
};

Replies.propTypes = {
  editedComment: PropTypes.objectOf(PropTypes.any),
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
  commentId: PropTypes.string.isRequired,
  formVisible: PropTypes.bool.isRequired,
  loadedReply: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.bool.isRequired,
  replies: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
  replyUserId: PropTypes.string,
  onToggleReply: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

Replies.defaultProps = {
  editedComment: null,
  loadedReply: null,
  replyUserId: null,
};

export default RepliesHOC(withTranslation('repliesComponent')(Replies));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.background,
  },
  list: {
    margin: 0,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    paddingTop: 0,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  comment: {
    backgroundColor: Colors.separator,
    padding: Layout.padding,
    paddingBottom: Layout.halfPadding,
  },
  replies: {
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.separator,
    padding: Layout.padding,
    paddingTop: Layout.halfPadding,
    paddingBottom: Layout.halfPadding,
  },
});
