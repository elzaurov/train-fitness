import React from 'react';
import {Teasers} from '../../components';
import {PROGRAM_TEASERS} from '../../constants';

const ProgramsScreen = (props) => (
  <Teasers
    {...props}
    teaserPath={PROGRAM_TEASERS}
    hideName
    hideSearch
    hideListOptions
    pushUrl="ViewProgram"
    pushKey="id"
  />
);

export default ProgramsScreen;
