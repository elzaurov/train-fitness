import React from 'react';
import PropTypes from 'prop-types';
import Svg, {Path, G} from 'react-native-svg';
import {Colors} from '../../constants';

const VideoPause = ({style, fill, size}) => (
  <Svg width={80} height={80} viewBox="0 0 25 25">
    <G stroke="#fff">
      <Path
        d="M24.25 12.5c0 6.488-5.262 11.75-11.75 11.75S.75 18.988.75 12.5 6.012.75 12.5.75 24.25 6.012 24.25 12.5zm0 0"
        fill="none"
        strokeWidth={0.69444}
      />
      <Path
        d="M9.277 7.488h1.09v10.024h-1.09zm5.356 0h1.09v10.024h-1.09zm0 0"
        fillRule="evenodd"
        fill="#fff"
        strokeWidth={0.69444}
      />
    </G>
  </Svg>
);

VideoPause.propTypes = {
  style: PropTypes.any,
  fill: PropTypes.string,
  size: PropTypes.number,
};

VideoPause.defaultProps = {
  style: {},
  fill: Colors.white,
  size: 24,
};

export default VideoPause;
