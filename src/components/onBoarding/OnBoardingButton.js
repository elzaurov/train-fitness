import React from 'react';
import PropTypes from 'prop-types';
import { Button, FlatButton, RegularText } from '../layout';
import { StyleSheet } from 'react-native';
import { Layout } from '../../constants';

const OnBoardingButton = ({ fitToOneLine, flat, children, ...rest }) => {
  const text = typeof children === 'string' ? children : children;

  return flat ? (
    <FlatButton {...rest}>
      <RegularText adjustsFontSizeToFit={fitToOneLine} numberOfLines={fitToOneLine ? 1 : 0} style={styles.flatButtonText}>{text}</RegularText>
    </FlatButton>
  ) : (
    <Button {...rest}>
      <RegularText adjustsFontSizeToFit={fitToOneLine} numberOfLines={fitToOneLine ? 1 : 0} style={styles.buttonText}>{text}</RegularText>
    </Button>
  );
};

OnBoardingButton.propTypes = {
  flat: PropTypes.bool,
  children: PropTypes.node,
  fitToOneLine: PropTypes.bool,
};

OnBoardingButton.defaultProps = {
  flat: false,
  children: null,
};

export default OnBoardingButton;

const styles = StyleSheet.create({
  flatButtonText: {
    fontSize: 14,
    padding: 4,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 18,
    padding: Layout.padding - 4,
    fontWeight: 'bold',
  },
});
