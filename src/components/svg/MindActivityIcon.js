import React from 'react';
import PropTypes from 'prop-types';
import {ViewPropTypes} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../constants';

const MindActivityIcon = ({fill, style, size}) => (
  <Svg style={style} width={size} height={size} viewBox="0 0 29.084 39.213">
    <Path
      fill={fill}
      d="M12.624,39.213h0a3.433,3.433,0,0,1-1.534-.368c-.048-.039-.141-5.536-.145-5.77a1.071,1.071,0,0,0-1.058-1.057H7.435A4.524,4.524,0,0,1,2.917,27.5V23.989H1.859A1.826,1.826,0,0,1,.32,23.124a1.835,1.835,0,0,1-.1-1.923l2.6-4.711V13.365A13.354,13.354,0,0,1,15.607,0h.337A13.139,13.139,0,0,1,29.069,13.124a19.823,19.823,0,0,1-2.453,10.143l-.1.192v5.913c0,.049,0,.1-.047.1-2.231,0-4.541,2.436-6.775,4.792C17.39,36.7,15,39.212,12.624,39.213Zm6.313-21.89h0A2.849,2.849,0,0,0,21.91,19.6c.128,0,.208-.007.212-.007V15.973c.028-.024,2.8-2.366,2.77-5.5A5.76,5.76,0,0,0,23.3,6.138c-1.373-1.347-3.639-2.1-6.926-2.292-.472-.028-.931-.042-1.364-.042-2.785,0-4.752.563-6.014,1.72A5.713,5.713,0,0,0,7.3,9.56a4.279,4.279,0,0,0,1.146,3.164,5.62,5.62,0,0,0,4.26,1.592,10.651,10.651,0,0,0,1.238-.076c.435,1.936,1.2,3.224,3.5,3.224a8.892,8.892,0,0,0,1.487-.142Z"
    />
  </Svg>
);

MindActivityIcon.propTypes = {
  fill: PropTypes.string,
  style: ViewPropTypes.style,
  size: PropTypes.number,
};

MindActivityIcon.defaultProps = {
  fill: Colors.white,
  style: {},
  size: 48,
};

export default MindActivityIcon;
