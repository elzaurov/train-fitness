import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withNavigation} from '@react-navigation/compat';
import {connect} from 'react-redux';
import {loadStripeData} from '../../actions';

const NotAvailableFeatureHOCWrapper = (InnerComponent) => {
  class NotAvailableFeatureHOC extends Component {
    async componentDidMount() {
      await this.props.loadStripeData();
    }

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onContactClick={this.handleContactClick}
        />
      );
    }
  }

  NotAvailableFeatureHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    loadStripeData: PropTypes.func.isRequired,
  };

  function mapStateToProps({stripe}) {
    return {stripe};
  }

  return withNavigation(
    connect(mapStateToProps, {
      loadStripeData,
    })(NotAvailableFeatureHOC),
  );
};

export default NotAvailableFeatureHOCWrapper;
