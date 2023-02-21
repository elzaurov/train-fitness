import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import {Colors, Layout} from '../../constants';

const ProgressBarComponent = ({progress, width, style, ...rest}) => {
    return (
        <ProgressBar
            progress={progress}
            width={width}
            color={Colors.primary}
            unfilledColor={Colors.dustyGray}
            borderRadius={0}
            borderWidth={0.5}
            style={style}
            {...rest}
        />
    );
};

export default ProgressBarComponent;
