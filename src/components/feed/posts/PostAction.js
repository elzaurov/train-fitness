import React from 'react';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';
import {FlatButton, RegularText} from '../../layout';

const PostAction = ({
  color,
  activeColor,
  number,
  isActive,
  icon,
  size,
  onPress,
}) => (
  <FlatButton onPress={onPress} style={styles.container}>
    <MaterialCommunityIcons
      style={styles.icon}
      name={icon}
      color={color}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      color={isActive ? activeColor : color}
      size={size}
    />
    <RegularText
      style={[styles.number, {color: isActive ? activeColor : color}]}>
      {number}
    </RegularText>
  </FlatButton>
);

export default PostAction;

PostAction.propTypes = {
  color: PropTypes.string.isRequired,
  activeColor: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
  number: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 2,
    marginLeft: 7,
  },
  icon: {
    bottom: -1.5,
  },
});
