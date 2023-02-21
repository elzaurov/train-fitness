import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Image} from 'react-native';
import {ScreenView, TitleText, RegularText} from '../layout';
import failureImage from '../../assets/images/app/failure.gif';
import {Colors} from '../../constants';

const FatalError = ({error}) => (
  <ScreenView>
    <View style={styles.content}>
      <Image style={styles.image} source={failureImage} />
      <TitleText style={styles.titleText}>Something went wrong!</TitleText>
      <RegularText style={styles.bodyText} numberOfLines={2}>
        Please re-open the app and try again
      </RegularText>
      {error ? (
        <RegularText style={styles.errorText}>{String(error)}</RegularText>
      ) : null}
    </View>
  </ScreenView>
);

FatalError.propTypes = {
  error: PropTypes.object,
};

FatalError.defaultProps = {
  error: null,
};

export default FatalError;

const styles = StyleSheet.create({
  content: {
    marginTop: 'auto',
    marginBottom: 'auto',
    flex: 0,
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 8,
  },
  bodyText: {
    marginTop: 8,
    textAlign: 'center',
  },
  titleText: {
    marginTop: 32,
    textAlign: 'center',
  },
  errorText: {
    color: Colors.emperor,
    fontSize: 12,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40,
  },
});
