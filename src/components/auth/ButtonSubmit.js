import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {StyleSheet, Text, Animated, View, Image} from 'react-native';
import {Colors, Layout} from '../../constants';
import {Button} from '../layout';

import spinner from '../../assets/images/auth/loading.gif';

const MARGIN = 40;

const ButtonSubmit = ({
  t,
  email,
  password,
  submitting,
  error,
  changeScale,
  onSubmit,
}) => {
  const disabled = !email || !password;

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        onPress={onSubmit}
        disabled={disabled}
        secondary2>
        {submitting ? (
          <Image source={spinner} style={styles.image} />
        ) : (
          t('login')
        )}
      </Button>
      {!!submitting && (
        <Animated.View
          style={[styles.circle, {transform: [{scale: changeScale}]}]}
        />
      )}
      {/* {!!error && <Text style={styles.error}>{error}</Text>} */}
    </View>
  );
};

ButtonSubmit.propTypes = {
  t: PropTypes.func.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired,
  changeScale: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

ButtonSubmit.defaultProps = {
  email: '',
  password: '',
  error: '',
};

export default withTranslation('authComponent')(ButtonSubmit);

const styles = StyleSheet.create({
  container: {
    marginTop: 56,
    // marginBottom: 32,
    // height: 50,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  button: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: Colors.secondary,
    // height: MARGIN,
    // borderRadius: 2,
    height: 50,
    borderRadius: 5,
    zIndex: 100,
    width: Layout.window.width - MARGIN,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: Colors.primary,
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 15,
  },
  error: {
    color: 'red',
    width: Layout.window.width - MARGIN,
  },
  image: {
    width: 24,
    height: 24,
  },
});
