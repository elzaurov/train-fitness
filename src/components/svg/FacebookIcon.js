import React from 'react';
import PropTypes from 'prop-types';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../constants';

const FacebookIcon = ({style, fill, size}) => (
  <Svg width={size} height={size} style={style}>
    <Path
      d="M20.484,0H3.516A3.52,3.52,0,0,0,0,3.516V20.484A3.52,3.52,0,0,0,3.516,24h7.078V15.516H7.781V11.3h2.813V8.438a4.223,4.223,0,0,1,4.219-4.219h4.266V8.438H14.813V11.3h4.266l-.7,4.219H14.813V24h5.672A3.52,3.52,0,0,0,24,20.484V3.516A3.52,3.52,0,0,0,20.484,0Zm0,0"
      fill="#fff"
    />
  </Svg>
);

FacebookIcon.propTypes = {
  style: PropTypes.any,
  fill: PropTypes.string,
  size: PropTypes.number,
};

FacebookIcon.defaultProps = {
  style: {},
  fill: Colors.white,
  size: 24,
};

export default FacebookIcon;
