import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {HeaderProgress} from '../../layout';

const WriteNoteScreenHOCWrapper = (InnerComponent) => {
  class WriteNoteScreenHOC extends Component {
    static navigationOptions = {
      header: (props) => {
        return <HeaderProgress {...props} title="WRITE A NOTE" />;
      },
    };

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  WriteNoteScreenHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  return WriteNoteScreenHOC;
};

export default WriteNoteScreenHOCWrapper;
