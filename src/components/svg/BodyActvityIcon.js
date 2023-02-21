import React from 'react';
import PropTypes from 'prop-types';
import {ViewPropTypes} from 'react-native';
import Svg, {Path, Ellipse} from 'react-native-svg';
import {Colors} from '../../constants';

const BodyActivityIcon = ({fill, style, size}) => (
  <Svg style={style} width={size} height={size} viewBox="0 0 27.595 46.926">
    <Ellipse
      fill={fill}
      cx="3.971"
      cy="3.971"
      rx="3.971"
      ry="3.971"
      transform="translate(8.742 8.014) rotate(-67.5)"
    />
    <Path
      fill={fill}
      d="M-657.369,266.767l-3.145-8.227a1.763,1.763,0,0,0-2.275-1.017,1.762,1.762,0,0,0-1.017,2.275l2.449,6.408-7.042,1.913a1.759,1.759,0,0,0-.636.322h-5.179c-.023,0-.045,0-.067,0a1.755,1.755,0,0,0-.571-.306l-5.92-1.861,2.477-6.478a1.762,1.762,0,0,0-1.017-2.275,1.762,1.762,0,0,0-2.275,1.017l-3.145,8.227a1.763,1.763,0,0,0,.06,1.4,1.762,1.762,0,0,0,1.058.914l7.612,2.394V302.35a1.982,1.982,0,0,0,1.983,1.982,1.982,1.982,0,0,0,1.982-1.982V286.856h1.974V302.35a1.983,1.983,0,0,0,1.982,1.982,1.982,1.982,0,0,0,1.983-1.982v-31.2l7.545-2.049a1.762,1.762,0,0,0,1.109-.9A1.763,1.763,0,0,0-657.369,266.767Z"
      transform="translate(684.848 -257.407)"
    />
  </Svg>
);

BodyActivityIcon.propTypes = {
  fill: PropTypes.string,
  style: ViewPropTypes.style,
  size: PropTypes.number,
};

BodyActivityIcon.defaultProps = {
  fill: Colors.white,
  style: {},
  size: 48,
};

export default BodyActivityIcon;
