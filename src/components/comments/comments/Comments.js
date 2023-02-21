import React from 'react';
import PropTypes from 'prop-types';
import {ScrollFlatList} from '../../layout';
import Comment from './Comment';
import CommentLoading from './CommentLoading';
import CommentInput from './CommentInput';
import CommentsHOC from './CommentsHOC';

const Comments = ({comments, loading, navigation, type, onToggleReply}) => {
  const loadingItems = [
    {key: '0'},
    {key: '1'},
    {key: '2'},
    {key: '3'},
    {key: '4'},
    {key: '5'},
    {key: '6'},
  ];

  return (
    <ScrollFlatList
      hideSearch={true}
      hideListOptions={true}
      data={loading ? loadingItems : [{key: '0'}, ...comments]}
      renderItem={({item, index}) => {
        if (loading) {
          return <CommentLoading />;
        }

        if (index === 0) {
          return <CommentInput onToggleReply={onToggleReply} />;
        }

        return (
          <Comment
            navigation={navigation}
            comment={item}
            type={type}
            onToggleReply={onToggleReply}
          />
        );
      }}
    />
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
  onToggleReply: PropTypes.func.isRequired,
};

export default CommentsHOC(Comments);
