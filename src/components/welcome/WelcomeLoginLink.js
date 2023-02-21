import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View, ViewPropTypes} from 'react-native';
import {Layout} from '../../constants';
import {RegularText} from '../layout';

const WelcomeLoginLink = ({style}) => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.push('SignIn');
  };

  return (
    <TouchableOpacity onPress={handleLoginPress}>
      <View style={[styles.container, style]}>
        <RegularText style={styles.text}>
          Already a member of the Train Effective fam?
        </RegularText>
        <RegularText style={[styles.text, styles.loginHereText]}>
          Login Here
        </RegularText>
      </View>
    </TouchableOpacity>
  );
};

WelcomeLoginLink.propTypes = {
  style: ViewPropTypes.style,
};

WelcomeLoginLink.defaultProps = {
  style: null,
};

export default WelcomeLoginLink;

const styles = StyleSheet.create({
  container: {
    paddingLeft: Layout.padding,
    paddingRight: Layout.padding,
    paddingBottom: Layout.padding,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  loginHereText: {
    fontWeight: 'bold',
    marginLeft: 4,
    marginRight: 4,
  },
});
