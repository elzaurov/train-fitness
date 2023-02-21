import React, {useState} from 'react';
import {View, ViewPropTypes, StyleSheet} from 'react-native';
import {Button, RegularText} from '../layout';
import {Layout, Colors} from '../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  signInWithApple,
  signInWithFacebook,
  signInWithGoogle,
} from '../../actions';

const buttons = {
  facebook: {
    title: 'Continue with Facebook',
    icon: 'facebook',
    action: signInWithFacebook,
    bgColor: '#1877f2',
    fgColor: Colors.white,
  },
  google: {
    title: 'Continue with Google',
    icon: 'google',
    action: signInWithGoogle,
    bgColor: Colors.white,
    fgColor: Colors.mineShaft,
  },
  apple: {
    title: 'Continue with Apple',
    icon: 'apple',
    action: signInWithApple,
    bgColor: Colors.white,
    fgColor: Colors.mineShaft,
  },
  email: {
    title: 'Continue with Email',
    icon: 'email',
    bgColor: Colors.secondary,
    fgColor: Colors.white,
  },
};

const WelcomeSocialButtons = ({style}) => {
  const [signingIn, setSigningIn] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSignIn = async (key) => {
    if (key === 'email') {
      navigation.navigate('SignUp');
    } else {
      setSigningIn(key);

      const {action} = buttons[key];
      await dispatch(action());

      setSigningIn(null);
    }
  };

  return (
    <View style={styles.buttons}>
      {Object.entries(buttons).map(([key, button]) => (
        <Button
          key={key}
          disabled={!!signingIn}
          loading={signingIn === key}
          style={[
            styles.button,
            {
              backgroundColor: button.bgColor,
            },
          ]}
          onPress={() => handleSignIn(key)}>
          <MaterialCommunityIcons
            style={styles.buttonIcon}
            name={button.icon}
            color={button.fgColor}
            size={24}
          />
          <RegularText style={[styles.buttonText, {color: button.fgColor}]}>
            {button.title}
          </RegularText>
        </Button>
      ))}
    </View>
  );
};

WelcomeSocialButtons.propTypes = {
  style: ViewPropTypes.style,
};

WelcomeSocialButtons.defaultProps = {
  style: null,
};

export default WelcomeSocialButtons;

const styles = StyleSheet.create({
  buttons: {
    flex: 0,
    width: '100%',
    padding: Layout.padding,
  },
  button: {
    borderRadius: 5,
    width: '100%',
    backgroundColor: Colors.secondary2,
    marginBottom: Layout.padding,
    flexDirection: 'row',
    height: 48,
  },
  buttonText: {
    padding: Layout.padding / 2,
    fontWeight: 'bold',
    width: '100%',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonIcon: {
    position: 'absolute',
    left: Layout.padding,
  },
});
