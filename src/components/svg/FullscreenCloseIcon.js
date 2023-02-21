import React from 'react';
import PropTypes from 'prop-types';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../constants';

const FullscreenCloseIcon = ({style, fill, size}) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="#FFF">
    <Path d="M18 3h2v4h4v2h-6V3zm6 12v2h-4v4h-2v-6h6zM6 21H4v-4H0v-2h6v6zM0 9V7h4V3h2v6H0z" />
  </Svg>
);

FullscreenCloseIcon.propTypes = {
  style: PropTypes.any,
  fill: PropTypes.string,
  size: PropTypes.number,
};

FullscreenCloseIcon.defaultProps = {
  style: {},
  fill: Colors.white,
  size: 24,
};

export default FullscreenCloseIcon;
