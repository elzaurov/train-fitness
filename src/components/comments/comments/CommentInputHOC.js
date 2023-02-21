import React, {Component} from 'react';
import {connect} from 'react-redux';

const CommentInputHOCWrapper = (InnerComponent) => {
  class CommentInputHOC extends Component {
    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  function mapStateToProps({profile}) {
    return {profile};
  }

  return connect(mapStateToProps)(CommentInputHOC);
};

export default CommentInputHOCWrapper;
