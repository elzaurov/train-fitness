import React from 'react';
import PropTypes from 'prop-types';
import {View, ViewPropTypes} from 'react-native';
import {Svg, Polyline, G, Path} from 'react-native-svg';
import {Colors} from '../../constants';

const NewBadge = ({style, size, color, label}) => (
  <View style={[style]}>
    <Svg viewBox="0 0 500 500" width={size} height={size}>
      <Polyline class="st0" points="0,500 0,0 500,0 " fill={color} />
      {label ? (
        <G>
          <Path
            class="st1"
            fill={Colors.white}
            d="M44.8,167.3l19.9-87.5h27.8l4.6,68.6h1.5L114,79.8h16.9l-19.9,87.5H84.5l-5.6-69.9h-1.5l-16.1,69.9H44.8z"
          />
          <Path
            class="st1"
            fill={Colors.white}
            d="M119.3,167.3l19.8-87.5h50.7l-3.6,15.4h-33l-4.7,20.6h26.2l-3.6,15.4h-26l-4.7,20.6h33.1l-3.4,15.4H119.3z"
          />
          <Path
            class="st1"
            fill={Colors.white}
            d="M188.1,79.8h17.5l-5.3,71.2h1.8l28.7-69.9h19.3l-4.2,69.9h1.8l28.4-71.2h17.5l-36.9,87.5h-25.4l4.2-63.6
          l-25.1,63.6h-26.2L188.1,79.8z"
          />
        </G>
      ) : null}
    </Svg>
  </View>
);

NewBadge.propTypes = {
  style: ViewPropTypes.style,
  size: PropTypes.number,
  color: PropTypes.string,
  label: PropTypes.bool,
};

NewBadge.defaultProps = {
  style: {},
  size: 50,
  color: Colors.secondary2,
  label: true,
};

export default NewBadge;
