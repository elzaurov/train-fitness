import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../../constants';

const UserPhotoLoading = ({hideLevel, size, style}) => {
  const levelSize = Math.round(size / 2);

  return (
    <View style={[styles.wrapper, style]}>
      <View
        style={[
          styles.photoLoading,
          {
            height: size,
            width: size,
            borderRadius: size / 2,
          },
        ]}
      />
      {!hideLevel && (
        <View
          style={[
            styles.photoLoading,
            {
              height: levelSize,
              width: levelSize,
              borderRadius: levelSize / 2,
              marginLeft: -(levelSize / 2),
            },
          ]}
        />
      )}
    </View>
  );
};

UserPhotoLoading.propTypes = {
  hideLevel: PropTypes.bool,
  size: PropTypes.number,
  style: PropTypes.any,
};

UserPhotoLoading.defaultProps = {
  hideLevel: false,
  size: 48,
  style: {},
};

export default UserPhotoLoading;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  photoLoading: {
    backgroundColor: Colors.loadingOverlay,
    borderWidth: 1,
    borderColor: Colors.white,
  },
});
