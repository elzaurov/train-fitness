import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withNavigation} from '@react-navigation/compat';
import PropTypes from 'prop-types';
import {updateProfile} from '../../actions';

const PaymentSuccessHOCWrapper = (InnerComponent) => {
  class PaymentSuccessHOC extends Component {
    state = {
      selectedIntroductionItem: null,
      isWaiting: false,
    };

    handleIntroductionItemSelect = (item) => {
      this.setState({selectedIntroductionItem: item});
    };

    handleContinuePress = async () => {
      const {navigation} = this.props;
      const {selectedIntroductionItem} = this.state;

      try {
        this.setState({isWaiting: true});

        await this.props.updateProfile({
          introductionMethod: selectedIntroductionItem,
        });

        const returnRoute = this.props.route.params?.returnRoute;
        navigation.navigate(returnRoute || 'Main');
      } finally {
        this.setState({isWaiting: false});
      }
    };

    render() {
      return (
        <InnerComponent
          {...this.props}
          {...this.state}
          onContinuePress={this.handleContinuePress}
          onIntroductionItemSelect={this.handleIntroductionItemSelect}
        />
      );
    }
  }

  PaymentSuccessHOC.propTypes = {
    updateProfile: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      getParam: PropTypes.func,
    }).isRequired,
    route: PropTypes.object.isRequired,
  };

  const mapStateToProps = ({remoteConfigs}) => ({
    introductionItems: remoteConfigs.introduction_methods,
  });

  const mapDispatchToProps = {
    updateProfile,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withNavigation(PaymentSuccessHOC));
};

export default PaymentSuccessHOCWrapper;
