import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Header} from '../../layout';

const LatestCommentsScreenHOCWrapper = (InnerComponent) => {
  class LatestCommentsScreenHOC extends Component {
    static navigationOptions = {
      title: 'LATEST COMMENTS',
      header: (props) => <Header {...props} backButton={true} />,
    };

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  LatestCommentsScreenHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  return LatestCommentsScreenHOC;
};

export default LatestCommentsScreenHOCWrapper;
