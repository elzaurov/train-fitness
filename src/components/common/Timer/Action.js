import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Colors,
  SUCCESS,
  DANGER,
  NEUTRAL,
  BLUE,
  WARNING,
  DISABLED,
} from '../../../constants';

const Action = ({icon, type, size, onPress}) => {
  let buttonColor = '';
  let buttonTextColor = '';

  if (type === NEUTRAL) {
    buttonColor = '#3D3D3D';
  } else if (type === DANGER) {
    buttonColor = '#3C1715';
  } else if (type === SUCCESS) {
    buttonColor = '#1B361F';
  } else if (type === BLUE) {
    buttonColor = '#0715BC';
  } else if (type === WARNING) {
    buttonColor = '#FFC400';
  } else if (type === DISABLED) {
    buttonColor = '#3D3D3D';
  }

  if (type === NEUTRAL) {
    buttonTextColor = Colors.white;
  } else if (type === DANGER) {
    buttonTextColor = '#E33935';
  } else if (type === SUCCESS) {
    buttonTextColor = '#50D167';
  } else if (type === BLUE) {
    buttonTextColor = Colors.white;
  } else if (type === WARNING) {
    buttonTextColor = Colors.white;
  } else if (type === DISABLED) {
    buttonTextColor = Colors.gray3;
  }

  return (
    <View
      style={[
        {
          borderColor: buttonColor,
        },
      ]}>
      <TouchableOpacity
        style={[
          styles.action,
          {
            backgroundColor: buttonColor,
            width: size,
            height: size,
          },
        ]}
        onPress={() => onPress()}>
        <View>
          <MaterialCommunityIcons
            name={icon}
            size={28}
            color={buttonTextColor}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

Action.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  type: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

Action.defaultProps = {
  type: NEUTRAL,
  size: 48,
};

export default Action;

const styles = StyleSheet.create({
  action: {
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
