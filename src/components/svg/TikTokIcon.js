import React from 'react';
import PropTypes from 'prop-types';
import {Svg, G, Path} from 'react-native-svg';
import {Colors} from '../../constants';

const TikTokIcon = ({size, color, ...rest}) => (
  <Svg
    id="Capa_1"
    enable-background="new 0 0 512 512"
    height={size}
    viewBox="0 0 512 512"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}>
    <G>
      <Path
        fill={color}
        d="m480.32 128.39c-29.22 0-56.18-9.68-77.83-26.01-24.83-18.72-42.67-46.18-48.97-77.83-1.56-7.82-2.4-15.89-2.48-24.16h-83.47v228.08l-.1 124.93c0 33.4-21.75 61.72-51.9 71.68-8.75 2.89-18.2 4.26-28.04 3.72-12.56-.69-24.33-4.48-34.56-10.6-21.77-13.02-36.53-36.64-36.93-63.66-.63-42.23 33.51-76.66 75.71-76.66 8.33 0 16.33 1.36 23.82 3.83v-62.34-22.41c-7.9-1.17-15.94-1.78-24.07-1.78-46.19 0-89.39 19.2-120.27 53.79-23.34 26.14-37.34 59.49-39.5 94.46-2.83 45.94 13.98 89.61 46.58 121.83 4.79 4.73 9.82 9.12 15.08 13.17 27.95 21.51 62.12 33.17 98.11 33.17 8.13 0 16.17-.6 24.07-1.77 33.62-4.98 64.64-20.37 89.12-44.57 30.08-29.73 46.7-69.2 46.88-111.21l-.43-186.56c14.35 11.07 30.04 20.23 46.88 27.34 26.19 11.05 53.96 16.65 82.54 16.64v-60.61-22.49c.02.02-.22.02-.24.02z"
      />
    </G>
  </Svg>
);

TikTokIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

TikTokIcon.defaultProps = {
  size: 24,
  color: Colors.black,
};

export default TikTokIcon;
