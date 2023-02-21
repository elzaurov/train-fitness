import React, {Component} from 'react';
import PropTypes from 'prop-types';

const ChatScreenHOCWrapper = (InnerComponent) => {
  class ChatScreenHOC extends Component {
    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  ChatScreenHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  return ChatScreenHOC;
};

export default ChatScreenHOCWrapper;
