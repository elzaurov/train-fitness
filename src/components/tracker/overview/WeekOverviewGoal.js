import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import Svg, {Circle, Text, G} from 'react-native-svg';
import {Colors, Layout} from '../../../constants';

const STROKE_WIDTH = 2;

const WeekOverviewGoal = ({goal, time, mindTime, bodyTime}) => {
    const circleLength = 2 * Math.PI * (50 - STROKE_WIDTH);
    const remainingTime = time < goal ? goal - time : 0;
    const mindTimeLength = goal > 0 ? (mindTime / goal) * circleLength : 0;
    const bodyTimeLength = goal > 0 ? (bodyTime / goal) * circleLength : 0;

    let text;

    if (remainingTime > 0) {
        text = (
            <G x="50" y="55">
                <Text
                    fontSize="32"
                    fontFamily="TitilliumWeb-Regular"
                    fill={Colors.white}
                    textAnchor="middle">
                    {Math.round(remainingTime)}
                </Text>
                <Text
                    fontSize="10"
                    fontFamily="TitilliumWeb-Regular"
                    fill={Colors.silver}
                    textAnchor="middle"
                    y="15">
                    Mins to Goal
                </Text>
            </G>
        );
    } else {
        text = (
            <Text
                x="50"
                y="52"
                fontSize="24"
                fontWeight="normal"
                alignmentBaseline="middle"
                fontFamily="TitilliumWeb-Regular"
                fill={Colors.dustyGray}
                textAnchor="middle">
                DONE!
            </Text>
        );
    }

    return (
        <View style={goalStyle.container}>
            <Svg
                // temporary solution for android
                width={Layout.window.width * 0.45}
                height={Layout.window.width * 0.45}
                viewBox="0 0 100 100">
                <Circle
                    cx={50}
                    cy={50}
                    r={50 - STROKE_WIDTH}
                    strokeWidth={STROKE_WIDTH}
                    stroke={Colors.mineShaft}
                    fill="none"
                />
                <Circle
                    cx={50}
                    cy={50}
                    r={50 - STROKE_WIDTH}
                    strokeWidth={STROKE_WIDTH}
                    stroke={
                        remainingTime > 0 ? Colors.dodgerBlur : Colors.green
                    }
                    fill="none"
                    strokeDasharray={`${mindTimeLength} ${
                        circleLength - mindTimeLength
                    }`}
                    strokeDashoffset={circleLength * 0.25}
                />
                <Circle
                    cx={50}
                    cy={50}
                    r={50 - STROKE_WIDTH}
                    strokeWidth={STROKE_WIDTH}
                    stroke={remainingTime > 0 ? Colors.orange : Colors.green}
                    fill="none"
                    strokeDasharray={`${bodyTimeLength} ${
                        circleLength - bodyTimeLength
                    }`}
                    strokeDashoffset={circleLength * 0.25 - mindTimeLength}
                />
                {text}
            </Svg>
        </View>
    );
};

WeekOverviewGoal.propTypes = {
    time: PropTypes.number,
    goal: PropTypes.number,
    mindTime: PropTypes.number,
    bodyTime: PropTypes.number,
};

WeekOverviewGoal.defaultProps = {
    time: 0,
    goal: 0,
    mindTime: 0,
    bodyTime: 0,
};

export default WeekOverviewGoal;

const goalStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
