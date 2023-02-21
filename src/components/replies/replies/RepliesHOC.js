import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadComment, loadNote, loadReplies} from '../../../actions';

const RepliesHOCWrapper = InnerComponent => {
    class RepliesHOC extends Component {
        state = {
            formVisible: false,
            loading: true,
            replyUserId: null,
        };

        async componentDidMount() {
            const {commentId, showInput, type} = this.props;
            const fn =
                type === 'notes' ? this.props.loadNote : this.props.loadComment;

            await Promise.all([
                fn(commentId),
                this.props.loadReplies(commentId),
            ]);

            this.setState({
                loading: false,
                formVisible: !!showInput,
            });
        }

        handleToggleReply = data => {
            const {editedComment, replyUserId, showInput = false} = data || {};

            this.setState(prevState => ({
                formVisible: !prevState.formVisible,
                editedComment,
                replyUserId,
                showInput,
            }));
        };

        render() {
            const {comments, commentId, notes, type} = this.props;
            const comment =
                type === 'notes'
                    ? notes.filter(({key}) => key === commentId)[0]
                    : comments.filter(({key}) => key === commentId)[0];

            return (
                <InnerComponent
                    {...this.state}
                    {...this.props}
                    comment={comment || {text: ''}}
                    onToggleReply={this.handleToggleReply}
                />
            );
        }
    }

    function mapStateToProps({comments, notes, replies}) {
        return {comments, notes, replies};
    }

    RepliesHOC.propTypes = {
        comments: PropTypes.arrayOf(PropTypes.object).isRequired,
        commentId: PropTypes.string.isRequired,
        notes: PropTypes.arrayOf(PropTypes.object).isRequired,
        type: PropTypes.string.isRequired,
        loadComment: PropTypes.func.isRequired,
        loadNote: PropTypes.func.isRequired,
        loadReplies: PropTypes.func.isRequired,
    };

    return connect(mapStateToProps, {
        loadComment,
        loadNote,
        loadReplies,
    })(RepliesHOC);
};

export default RepliesHOCWrapper;
