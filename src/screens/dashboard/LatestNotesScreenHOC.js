import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Header} from '../../layout';

const LatestNotesScreenHOCWrapper = (InnerComponent) => {
  class LatestNotesScreenHOC extends Component {
    static navigationOptions = {
      title: 'LATEST NOTES',
      header: (props) => <Header {...props} backButton={true} />,
    };

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  LatestNotesScreenHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  return LatestNotesScreenHOC;
};

export default LatestNotesScreenHOCWrapper;
