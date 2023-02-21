import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadStripeData} from '../../../actions';

const PlanHOCWrapper = (InnerComponent) => {
  class PlanHOC extends Component {
    state = {
      loading: true,
    };

    async componentDidMount() {
      await this.props.loadStripeData();

      this.setState({loading: false});
    }

    handleUpdate = () => {
      this.props.navigation.goBack();
    };

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onUpdate={this.handleUpdate}
        />
      );
    }
  }

  PlanHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    loadStripeData: PropTypes.func.isRequired,
  };

  function mapStateToProps({plan, profile, stripe}) {
    return {plan, profile, stripe};
  }

  return connect(mapStateToProps, {
    loadStripeData,
  })(PlanHOC);
};

export default PlanHOCWrapper;
