import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {auth} from '../../config';
import {Alert} from 'react-native';

const ForgotPasswordScreenHOCWrapper = (InnerComponent) => {
  class ForgotPasswordScreenHOC extends Component {
    state = {
      submitting: false,
      email: '',
    };

    handleEmailInputChange = (email) => {
      this.setState({email});
    };

    handleSubmit = () => {
      const {navigation} = this.props;
      const {email} = this.state;

      this.setState({submitting: true}, () => {
        auth
          .sendPasswordResetEmail(email)
          .then(() => {
            Alert.alert(
              'Verification email sent',
              '',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.goBack(),
                },
              ],
              {cancelable: false},
            );
          })
          .catch((error) => {
            Alert.alert(
              'Oops...',
              error.message || error,
              [
                {
                  text: 'OK',
                  onPress: () => this.setState({submitting: false}),
                },
              ],
              {cancelable: false},
            );
          });
      });
    };

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onEmailInputChange={this.handleEmailInputChange}
          onSubmit={this.handleSubmit}
        />
      );
    }
  }

  ForgotPasswordScreenHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  return ForgotPasswordScreenHOC;
};

export default ForgotPasswordScreenHOCWrapper;
