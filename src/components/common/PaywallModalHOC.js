import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {hidePaywallModal} from '../../actions';

const PaywallModalHOCWrapper = (InnerComponent) => {
  class PaywallModalHOC extends Component {
    handleClose = () => {
      this.props.hidePaywallModal();
    };

    handleBecomePremium = () => {
      this.props.hidePaywallModal();

      const {navigation} = this.props;
      navigation.push('Paywall');
    };

    render() {
      return (
        <InnerComponent
          {...this.props}
          {...this.state}
          onBecomePremium={this.handleBecomePremium}
          onClose={this.handleClose}
        />
      );
    }
  }

  PaywallModalHOC.propTypes = {
    navigation: PropTypes.object.isRequired,
    hidePaywallModal: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state) => ({
    modalVisible: state.paywallModal,
  });

  const mapDispatchToProps = {
    hidePaywallModal,
  };

  return connect(mapStateToProps, mapDispatchToProps)(PaywallModalHOC);
};

export default PaywallModalHOCWrapper;
