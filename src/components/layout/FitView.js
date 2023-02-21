import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, ViewPropTypes} from 'react-native';

const FitView = ({aspectRatio, style, onLayout: superOnLayout, ...rest}) => {
  const [width, setWidth] = useState(undefined);
  const [height, setHeight] = useState(undefined);

  return (
    <View
      style={[
        style,
        width || height
          ? {
              width,
              height,
            }
          : null,
      ]}
      {...rest}
      onLayout={(e) => {
        const {
          width: currentWidth,
          height: currentHeight,
        } = e.nativeEvent.layout;

        const ratio = currentWidth / currentHeight;

        if (ratio > aspectRatio) {
          // fit by height
          setWidth(currentHeight * aspectRatio);
          setHeight(currentHeight);
        } else {
          // fit by width
          setWidth(currentWidth);
          setHeight(currentWidth / aspectRatio);
        }

        superOnLayout?.(e);
      }}
    />
  );
};

FitView.propTypes = {
  aspectRatio: PropTypes.number,
  style: ViewPropTypes.style,
  onLayout: PropTypes.func,
};

FitView.defaultProps = {
  aspectRatio: 1,
  style: null,
  onLayout: null,
};

export default FitView;
