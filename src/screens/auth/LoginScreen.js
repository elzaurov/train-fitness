import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {Colors, Layout} from '../../constants';
import {
  BoldText,
  ButtonRegister,
  ButtonSubmit,
  Form,
  ForgotPassword,
  // HowItWorksModal,
  Logo,
  SafeArea,
  FacebookButton,
  GoogleButton,
} from '../../components';
import LoginScreenHOC from './LoginScreenHOC';

const LoginScreen = ({isLoading, ...props}) => {
  if (isLoading === true) {
    return (
      <View style={styles.loading}>
        <Logo style={styles.logo} height={96} />
        <ActivityIndicator size="large" color={Colors.white} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeArea color={Colors.background} />
      <View style={styles.content}>
        <Logo style={styles.logo} height={96} />
        {/* <GoogleButton {...props} />
          <FacebookButton {...props} />
          <BoldText style={styles.linkText}>OR</BoldText> */}
        <Form {...props} />
        <ForgotPassword {...props} />
        <ButtonSubmit {...props} />
        <ButtonRegister {...props} />
      </View>
      {/* {
          !Layout.isIOS && (
            <HowItWorksModal {...props} />
          )
        } */}
      {/* <HowItWorksModal {...props} /> */}
    </View>
  );
};

export default LoginScreenHOC(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: Layout.window.height - 50,
  },
  linkText: {
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 4,
    fontSize: 15,
  },
  loading: {
    flex: 1,
    height: Layout.window.height - 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  logo: {
    marginBottom: Layout.margin * 2,
    width: 200,
    height: 130,
  },
});
