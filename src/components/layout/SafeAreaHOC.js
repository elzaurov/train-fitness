import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const SafeAreaHOCWrapper = (InnerComponent) => {
  class SafeAreaHOC extends Component {
    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  SafeAreaHOC.propTypes = {};

  function mapStateToProps({statusBarColor}) {
    return {statusBarColor};
  }

  return connect(mapStateToProps, null)(SafeAreaHOC);
};

export default SafeAreaHOCWrapper;
