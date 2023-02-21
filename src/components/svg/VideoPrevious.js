import React from 'react';
import PropTypes from 'prop-types';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../constants';

const VideoPrevious = ({style, fill, size}) => (
  <Svg
    style={style}
    height={size}
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <Path
      fill={fill}
      d="M24 9h-2v-4h-4v-2h6v6zm-6 12v-2h4v-4h2v6h-6zm-18-6h2v4h4v2h-6v-6zm6-12v2h-4v4h-2v-6h6z"
    />
  </Svg>
);

VideoPrevious.propTypes = {
  style: PropTypes.any,
  fill: PropTypes.string,
  size: PropTypes.number,
};

VideoPrevious.defaultProps = {
  style: {},
  fill: Colors.white,
  size: 24,
};

export default VideoPrevious;
