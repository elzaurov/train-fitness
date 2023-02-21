import * as React from 'react';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Feeling = ({color, icon, size}) => {
  if (icon) {
    return <MaterialCommunityIcons name={icon} color={color} size={size} />;
  }
  return null;
};

Feeling.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  icon: PropTypes.string,
};

Feeling.defaultProps = {
  size: 14,
  icon: null,
  color: null,
};

export default Feeling;

// const styles = StyleSheet.create({
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },
// });
