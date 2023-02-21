import React from 'react';
import PropTypes from 'prop-types';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../constants';

const VideoNext = ({style, fill, size}) => (
  <Svg
    style={style}
    height={size}
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 24">
    <Path
      fill={fill}
      style="fill:none;stroke-width:1;stroke-linecap:square;stroke-linejoin:miter;stroke:#FFFFFF;stroke-opacity:1;stroke-miterlimit:4;"
      d="M 0.736861 27.261719 L 0.736861 0.738281 L 18.38157 14 Z M 24.263139 0.738281 L 24.263139 27.261719 "
      transform="matrix(0.88,0,0,0.857143,0,0)"
    />
  </Svg>
);

VideoNext.propTypes = {
  style: PropTypes.any,
  fill: PropTypes.string,
  size: PropTypes.number,
};

VideoNext.defaultProps = {
  style: {},
  fill: Colors.white,
  size: 24,
};

export default VideoNext;
