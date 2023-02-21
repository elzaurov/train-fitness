import React from 'react';
import {StatsGraph} from '../../components';
import StatsGraphScreenHOC from './StatsGraphScreenHOC';

const StatsGraphScreen = (props) => <StatsGraph {...props} />;

export default StatsGraphScreenHOC(StatsGraphScreen);
