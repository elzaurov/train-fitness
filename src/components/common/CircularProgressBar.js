import React from 'react';
import PropTypes from 'prop-types';
import {View, ViewPropTypes, StyleSheet} from 'react-native';
import {Svg, Circle, Text} from 'react-native-svg';
import {Colors} from '../../constants';

const CircularProgressBar = ({
  children,
  style,
  strokeWidth,
  value,
  baseColor,
  barColor,
}) => {
  const circleLength = 2 * Math.PI * (50 - strokeWidth);

  // if a single value supplied, convert to to array
  const values = Array.isArray(value) ? value : [{value}];

  const bars = values.reduce((ac, itemValue, idx) => {
    const length = (itemValue.value / 100) * circleLength;
    const color = itemValue.color ? itemValue.color : barColor;
    let offset = 0;

    if (idx > 0) {
      offset = ac[idx - 1].length + ac[idx - 1].offset;
    }

    ac.push({length, color, offset});

    return ac;
  }, []);

  let content;

  if (!children || typeof children === 'string') {
    content = (
      <Text
        x="50"
        y="50"
        fontSize="32"
        fontFamily="TitilliumWeb-Regular"
        alignmentBaseline="middle"
        fill={Colors.white}
        textAnchor="middle">
        {children || values[0].value}
      </Text>
    );
  } else {
    content = children;
  }

  return (
    <View style={[styles.container, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 100 100">
        <Circle
          cx={50}
          cy={50}
          r={50 - strokeWidth}
          strokeWidth={strokeWidth}
          stroke={baseColor}
          fill="none"
        />
        {bars.map((bar, idx) => (
          <Circle
            key={idx}
            cx={50}
            cy={50}
            r={50 - strokeWidth}
            strokeWidth={strokeWidth}
            stroke={bar.color}
            fill="none"
            strokeDasharray={`${bar.length} ${circleLength - bar.length}`}
            strokeDashoffset={circleLength * 0.25 - bar.offset}
          />
        ))}
        {content}
      </Svg>
    </View>
  );
};

CircularProgressBar.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style,
  strokeWidth: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.array]).isRequired,
  baseColor: PropTypes.string,
  barColor: PropTypes.string,
};

CircularProgressBar.defaultProps = {
  children: null,
  style: {},
  strokeWidth: 4,
  baseColor: Colors.mineShaft,
  barColor: Colors.orange,
};

export default CircularProgressBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
