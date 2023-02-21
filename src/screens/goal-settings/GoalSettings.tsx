import React from 'react';
import {GoalSettingsMain} from '@traineffective/te-component-library';
import GoalSettingsHOC from './GoalSettingsHOC';

const GoalSettings = props => <GoalSettingsMain {...props} />;

export default GoalSettingsHOC(GoalSettings);
