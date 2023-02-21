import React from 'react';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import {useImage} from '../../../hooks';

const RequirementIcon = ({name, iconUrl, iconURL, style}) => {
  const image = useImage(name, iconUrl || iconURL);
  if (image) {
    return <FastImage resizeMode="contain" style={style} source={image} />;
  }
  return null;
};

RequirementIcon.propTypes = {
  name: PropTypes.string,
  iconUrl: PropTypes.string,
  iconURL: PropTypes.string,
  style: PropTypes.any,
};

RequirementIcon.defaultProps = {
  iconUrl: '',
  iconURL: '',
  style: {},
  name: null,
};

export default RequirementIcon;
