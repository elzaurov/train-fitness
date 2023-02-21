import React from 'react';
import PropTypes from 'prop-types';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../constants';

const FullscreenOpenIcon = ({style, fill, size}) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="#FFF">
    <Path d="M24 9h-2V5h-4V3h6v6zm-6 12v-2h4v-4h2v6h-6zM0 15h2v4h4v2H0v-6zM6 3v2H2v4H0V3h6z" />
  </Svg>
);

FullscreenOpenIcon.propTypes = {
  style: PropTypes.any,
  fill: PropTypes.string,
  size: PropTypes.number,
};

FullscreenOpenIcon.defaultProps = {
  style: {},
  fill: Colors.white,
  size: 24,
};

export default FullscreenOpenIcon;
