import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Animated, Easing, StatusBar, Platform} from 'react-native';
import {connect} from 'react-redux';
// import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
// import { GoogleSignin } from 'react-native-google-signin';
import {clearActions, updateProfile, signIn} from '../../actions';
import {Colors} from '../../constants';

const MARGIN = 40;

const LoginHOCWrapper = (InnerComponent) => {
  class LoginHOC extends Component {
    _isMounted = false;
    state = {
      modalVisible: false,
      submitting: false,
      email: '',
      password: '',
      error: '',
      buttonAnimated: new Animated.Value(0),
      growAnimated: new Animated.Value(0),
      isLoading: false,
    };

    componentDidMount() {
      this._isMounted = true;
      
      this.props.clearActions();

      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(Colors.mineShaft);
      }
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    handleSubmit = async () => {
      const {email, password} = this.state;

      try {
        this.setState({submitting: true});
        await this.props.signIn({email, password});
      } catch (error) {
        this.setState({error: String(error)});
      } finally {
        if (this._isMounted) {
          this.setState({submitting: false});
        }
      }
    };

    handleGrowAnimation = () => {
      Animated.timing(this.state.growAnimated, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
      }).start();
    };

    handleEmailChange = (email) => {
      this.setState({email});
    };

    handlePasswordChange = (password) => {
      this.setState({password});
    };

    handleToggleModal = () => {
      this.setState((prevState) => ({
        modalVisible: !prevState.modalVisible,
      }));
    };

    handleRegister = () => {
      const {navigation} = this.props;
      navigation.push('SignUp');
    };

    render() {
      const {growAnimated} = this.state;

      const changeScale = growAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: [1, MARGIN],
      });

      return (
        <InnerComponent
          {...this.props}
          {...this.state}
          changeScale={changeScale}
          onEmailChange={this.handleEmailChange}
          onPasswordChange={this.handlePasswordChange}
          onSubmit={this.handleSubmit}
          onToggleModal={this.handleToggleModal}
          onRegister={this.handleRegister}
          facebookButtonText="LOGIN BY FACEBOOK"
          googleButtonText="LOGIN BY GOOGLE"
          onFacebookRegister={this.handleFacebookRegister}
          onGoogleRegister={this.handleGoogleRegister}
          onEmailRegister={this.handleEmailRegister}
        />
      );
    }
  }

  LoginHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    clearActions: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
  };

  return connect(null, {
    clearActions,
    updateProfile,
    signIn,
  })(LoginHOC);
};

export default LoginHOCWrapper;
