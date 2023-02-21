import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Header} from '../../layout';

const RepliesScreenHOCWrapper = (InnerComponent) => {
  class RepliesScreenHOC extends Component {
    static navigationOptions = {
      title: 'REPLIES',
      header: (props) => (
        <Header {...props} backButton={true} modalTitle="REPLIES" />
      ),
    };

    render() {
      const {id: commentId, showInput, type} = this.props.route.params ?? {};

      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          commentId={commentId}
          showInput={showInput}
          type={type}
        />
      );
    }
  }

  RepliesScreenHOC.propTypes = {
    route: PropTypes.object.isRequired,
  };

  return RepliesScreenHOC;
};

export default RepliesScreenHOCWrapper;
