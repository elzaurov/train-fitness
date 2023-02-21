import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Header} from '../../layout';

const NotesScreenHOCWrapper = (InnerComponent) => {
  class NotesScreenHOC extends Component {
    static navigationOptions = {
      title: 'NOTES',
      header: (props) => <Header {...props} backButton={true} />,
    };

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  NotesScreenHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  return NotesScreenHOC;
};

export default NotesScreenHOCWrapper;
