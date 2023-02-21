import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../constants';

const AddOn = ({field}) =>
  field.isValidating ? (
    <ActivityIndicator size="small" />
  ) : (
    field.validates && (
      <MaterialCommunityIcons
        name="checkbox-marked-circle"
        size={24}
        color={Colors.green}
      />
    )
  );

AddOn.propTypes = {
  field: PropTypes.shape({
    isValidating: PropTypes.bool,
    validates: PropTypes.bool,
  }).isRequired,
};

export default AddOn;
