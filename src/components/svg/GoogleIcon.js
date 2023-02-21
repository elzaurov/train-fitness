import React from 'react';
import PropTypes from 'prop-types';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../constants';

const GoogleIcon = ({style, fill, size}) => (
  <Svg width={size} height={size} style={style}>
    <Path
      class="a"
      d="M5.319,146.29l-.835,3.119-3.053.065a12.021,12.021,0,0,1-.088-11.205h0l2.718.5,1.191,2.7a7.162,7.162,0,0,0,.067,4.822Z"
      transform="translate(0 -131.787)"
      fill="#fbbb00"
    />
    <Path
      class="b"
      d="M273.154,208.176a12,12,0,0,1-4.278,11.6h0l-3.424-.175-.485-3.025a7.152,7.152,0,0,0,3.077-3.652h-6.417v-4.747h11.526Z"
      transform="translate(-249.364 -198.418)"
      fill="#518ef8"
    />
    <Path
      class="c"
      d="M48.591,316.263h0a12,12,0,0,1-18.082-3.671l3.889-3.183a7.137,7.137,0,0,0,10.284,3.654Z"
      transform="translate(-29.079 -294.905)"
      fill="#28b446"
    />
    <Path
      class="d"
      d="M46.942,2.763,43.054,5.945a7.136,7.136,0,0,0-10.52,3.737l-3.909-3.2h0A12,12,0,0,1,46.942,2.763Z"
      transform="translate(-27.282)"
      fill="#f14336"
    />
  </Svg>
);

GoogleIcon.propTypes = {
  style: PropTypes.any,
  fill: PropTypes.string,
  size: PropTypes.number,
};

GoogleIcon.defaultProps = {
  style: {},
  fill: Colors.white,
  size: 24,
};

export default GoogleIcon;
