import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {withNavigation} from '@react-navigation/compat';
import {connect} from 'react-redux';
import {
  insertComment,
  insertReply,
  updateComment,
  updateReply,
} from '../../../actions';

const CommentFormHOCWrapper = (InnerComponent) => {
  class CommentFormHOC extends Component {
    state = {
      loading: true,
      submitting: false,
      text: '',
    };

    componentDidMount() {
      const {editedComment} = this.props;

      if (editedComment) {
        this.setState({text: editedComment.text});
      }
    }

    handleChangeText = (text) => {
      this.setState({text});
    };

    handleInputRef = (ref) => {
      this.input = ref;

      if (this.input) {
        this.input.focus();
      }
    };

    handleSubmitComment = () => {
      const {
        comment,
        editedComment,
        isReply,
        type,
        replyUserId,
        videoId,
      } = this.props;
      const {text} = this.state;

      this.setState({submitting: true}, () => {
        if (isReply) {
          const reply = {
            commentId: comment.key,
            commentUserId: comment.uid,
            text,
          };

          if (replyUserId) {
            reply.replyUserId = replyUserId;
          }

          if (editedComment) {
            this.props
              .updateReply({...editedComment, text})
              .then((updatedComment) => {
                this.handleSubmitEnd(updatedComment);
              });
          } else {
            this.props
              .insertReply({
                type,
                videoId: comment.videoId,
                reply,
              })
              .then((addedReply) => {
                this.handleSubmitEnd(addedReply);
              });
          }
        } else {
          const newComment = {
            type,
            videoId,
            text,
          };

          if (editedComment) {
            this.props
              .updateComment({...editedComment, text})
              .then((updatedComment) => {
                this.handleSubmitEnd(updatedComment);
              });
          } else {
            this.props.insertComment(newComment).then((addedComment) => {
              this.handleSubmitEnd(addedComment);
            });
          }
        }
      });
    };

    handleSubmitEnd = (comment) => {
      this.setState({submitting:false});
      this.props.onSubmit(comment);
    };

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onChangeText={this.handleChangeText}
          onInputRef={this.handleInputRef}
          onSubmitComment={this.handleSubmitComment}
        />
      );
    }
  }

  function mapStateToProps({profile}) {
    return {profile};
  }

  CommentFormHOC.propTypes = {
    comment: PropTypes.objectOf(PropTypes.any),
    editedComment: PropTypes.objectOf(PropTypes.any),
    isReply: PropTypes.bool,
    type: PropTypes.string.isRequired,
    replyUserId: PropTypes.string,
    videoId: PropTypes.string,
    insertComment: PropTypes.func.isRequired,
    insertReply: PropTypes.func.isRequired,
    updateComment: PropTypes.func.isRequired,
    updateReply: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  CommentFormHOC.defaultProps = {
    comment: null,
    editedComment: null,
    isReply: false,
    replyUserId: null,
    videoId: null,
  };

  return connect(mapStateToProps, {
    insertComment,
    insertReply,
    updateComment,
    updateReply,
  })(withNavigation(CommentFormHOC));
};

export default CommentFormHOCWrapper;
