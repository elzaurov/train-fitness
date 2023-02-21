import React from 'react';
import {Teasers} from '../../components';
import {WORKOUT_TEASERS} from '../../constants';

const WorkoutsScreen = (props) => (
  <Teasers
    {...props}
    teaserPath={WORKOUT_TEASERS}
    pushUrl="Workout"
    pushKey="id"
  />
);

export default WorkoutsScreen;
