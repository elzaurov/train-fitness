import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {crashlytics} from '../../config';
import FatalError from './FatalError';

class ErrorHandler extends Component {
  state = {
    renderError: null,
  };

  componentDidCatch(error) {
    this.setState({renderError: error});
    crashlytics.recordError(error);
  }

  render() {
    const {renderError} = this.state;

    return this.state.renderError ? (
      <FatalError error={renderError} />
    ) : (
      this.props.children
    );
  }
}

ErrorHandler.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorHandler;
