import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadComments} from '../../../actions';

const CommentsHOCWrapper = (InnerComponent) => {
  class CommentsHOC extends Component {
    state = {
      loading: true,
    };

    async componentDidMount() {
      await this.props.loadComments(this.props.videoId);

      this.setState({loading: false});
    }

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  CommentsHOC.propTypes = {
    videoId: PropTypes.string.isRequired,
    loadComments: PropTypes.func.isRequired,
  };

  function mapStateToProps({comments}) {
    return {comments};
  }

  return connect(mapStateToProps, {
    loadComments,
  })(CommentsHOC);
};

export default CommentsHOCWrapper;
