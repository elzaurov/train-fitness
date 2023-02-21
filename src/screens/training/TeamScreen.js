import React from 'react';
import {CrossTraining} from '../../components';
import {TEAM_TEASERS} from '../../constants';
import TeamScreenHOC from './TeamScreenHOC';

const TeamScreen = (props) => <CrossTraining {...props} type={TEAM_TEASERS} />;

export default TeamScreenHOC(TeamScreen);
