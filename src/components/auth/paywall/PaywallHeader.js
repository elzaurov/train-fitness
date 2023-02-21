import React from 'react';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import TitleText from '../../layout/TitleText';
import Logo from '../../svg/Logo';
import {View, StyleSheet, ViewPropTypes} from 'react-native';
import {RegularText, IconButton} from '../../layout';
import {Layout} from '../../../constants';

const PaywallHeader = ({style, back, title}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else if (back) {
      navigation.replace(back.screen, back.params || {});
    }
  };

  return (
    <View style={[styles.container, style]}>
      <IconButton
        icon="chevron-left"
        iconSize={32}
        onPress={handleBackPress}
        style={styles.backButton}
      />
      <RegularText style={[styles.title, styles.premiumTitle]}>
        Premium Membership
      </RegularText>
      <Logo style={styles.logo} height={48} />
      <TitleText style={[styles.title, styles.sloganTitle]}>{title}</TitleText>
    </View>
  );
};

PaywallHeader.propTypes = {
  style: ViewPropTypes.style,
  title: PropTypes.string,
};

PaywallHeader.defaultProps = {
  style: {},
  title: null,
};

export default PaywallHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  logo: {
    marginTop: 12,
    marginBottom: 12,
  },
  title: {
    textAlign: 'center',
    paddingLeft: Layout.padding,
    paddingRight: Layout.padding,
  },
  premiumTitle: {
    fontSize: 14,
  },
  sloganTitle: {
    fontSize: 24,
  },
});
