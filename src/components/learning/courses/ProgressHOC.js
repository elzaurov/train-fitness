import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {Alert} from 'react-native';

const ProgressHOCWrapper = (InnerComponent) => {
  class ProgressHOC extends Component {
    state = {
      dialogOpened: false,
      onPressDisable: false,
    };

    handleVerifyFinish = () => {
      const {onFinish} = this.props;
      onFinish();
      
    };

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onVerifyFinish={this.handleVerifyFinish}
        />
      );
    }
  }

  ProgressHOC.propTypes = {
    hasUncheckedItems: PropTypes.bool,
    percentageSeen: PropTypes.number.isRequired,
    onFinish: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  ProgressHOC.defaultProps = {
    hasUncheckedItems: false,
  };

  return withTranslation('progressComponent')(ProgressHOC);
};

export default ProgressHOCWrapper;
