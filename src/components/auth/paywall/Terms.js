import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {View, ViewPropTypes, StyleSheet, Linking, Platform} from 'react-native';
import SafariView from 'react-native-safari-view';
import {RegularText} from '../../layout';
import {Layout, Colors, TERMS_URL, POLICY_URL} from '../../../constants';

const Terms = ({t, style, textStyle}) => {
  const handleRedirect = (url) => {
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
      });
    } else {
      Linking.openURL(url);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {/* <RegularText style={styles.detailsText}>
        {t(Layout.isIOS ? 'paymentDetailsIOS' : 'paymentDetailsAndroid')}
      </RegularText> */}
      <RegularText style={[styles.links, textStyle]}>
        {t('acceptText')}
        <RegularText
          onPress={() => handleRedirect(TERMS_URL)}
          style={styles.link}>
          {t('terms')}
        </RegularText>
        {t('and')}
        <RegularText
          onPress={() => handleRedirect(POLICY_URL)}
          style={styles.link}>
          {t('policy')}
        </RegularText>
      </RegularText>
    </View>
  );
};

Terms.propTypes = {
  style: ViewPropTypes.style,
  textStyle: PropTypes.any,
  t: PropTypes.func.isRequired,
};

Terms.defaultProps = {
  textStyle: null,
  style: null,
};

export default withTranslation('paywallScreen')(Terms);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
  detailsText: {
    fontSize: 12,
    textAlign: 'justify',
    color: Colors.silver,
  },
  links: {
    textAlign: 'center',
  },
  link: {
    fontWeight: 'bold',
  },
});
