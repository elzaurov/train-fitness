import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../constants';
import RegularText from './RegularText';

const FlatButton = ({
  badge,
  style,
  textStyle,
  iconStyle,
  children,
  disabled,
  icon,
  iconLeft,
  iconSize,
  iconColor,
  loading,
  ...props
}) => {
  const disabledStyle = disabled ? {opacity: 0.5} : {};

  let content;

  if (loading) {
    content = <ActivityIndicator size="small" />;
  } else {
    content = (
      <Fragment>
        {!!iconLeft && (
          <MaterialCommunityIcons
            style={[styles.iconLeft, iconStyle]}
            name={iconLeft}
            size={iconSize}
            color={iconColor}
          />
        )}
        {typeof children === 'string' ? (
          <RegularText style={textStyle}>{children.toUpperCase()}</RegularText>
        ) : (
          children
        )}
        <View style={styles.row}>
          {!!badge && (
            <View style={styles.badge}>
              <RegularText>{badge}</RegularText>
            </View>
          )}
          {!!icon && (
            <MaterialCommunityIcons
              style={[styles.icon, iconStyle]}
              name={icon}
              size={iconSize}
              color={iconColor}
            />
          )}
        </View>
      </Fragment>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.button, disabledStyle, style]}
      disabled={disabled || loading}
      {...props}>
      {content}
    </TouchableOpacity>
  );
};

FlatButton.propTypes = {
  badge: PropTypes.number,
  style: PropTypes.any,
  textStyle: PropTypes.any,
  iconStyle: PropTypes.any,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  iconLeft: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  loading: PropTypes.bool,
};

FlatButton.defaultProps = {
  badge: undefined,
  style: {},
  textStyle: {},
  iconStyle: {},
  children: undefined,
  disabled: false,
  icon: undefined,
  iconLeft: undefined,
  iconSize: 18,
  iconColor: Colors.white,
  loading: false,
};

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 6,
  },
  iconLeft: {
    marginRight: 6,
  },
  badge: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
    borderRadius: 18,
    backgroundColor: Colors.secondary,
  },
});
