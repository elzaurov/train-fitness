import React from 'react';
import PropTypes from 'prop-types';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../constants';

const DesignedByIcon = ({style, fill, size}) => (
  <Svg
    style={style}
    height={size}
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 460 460">
    <Path
      fill={fill}
      d="M187.433 270.696c-10.714 4.946-20.9 10.838-30.433 17.592V445h97V334.32c-33.083-5.64-59.48-30.832-66.567-63.624zM268.065 305.528c26.536 0 48.525-19.752 52.03-45.363-16.548-4.625-33.997-7.1-52.03-7.1-18.032 0-35.482 2.475-52.028 7.1 3.504 25.61 25.493 45.363 52.028 45.363zM348.698 270.696c-6.955 32.172-32.49 57.038-64.698 63.292V445h176c0-77.614-45.586-143.97-111.302-174.304zM269 119v30H168.422c12.868 42.846 52.607 74.064 99.643 74.064 57.455 0 104.032-46.577 104.032-104.032S325.52 15 268.065 15c-47.013 0-86.735 31.188-99.624 74H108v30h161zM30 253h67v30H30zM127 283H97v30H30v-30H0v162h127"
    />
  </Svg>
);

DesignedByIcon.propTypes = {
  style: PropTypes.any,
  fill: PropTypes.string,
  size: PropTypes.number,
};

DesignedByIcon.defaultProps = {
  style: {},
  fill: Colors.white,
  size: 24,
};

export default DesignedByIcon;
