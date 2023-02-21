import React from 'react';
import {LearningVideos} from '../../components';
import {GAMEBRAIN_CATEGORIES, GAMEBRAIN_VIDEOS} from '../../constants';

const GameBrainTeasersScreen = (props) => (
  <LearningVideos
    {...props}
    learningVideosCategoriesPath={GAMEBRAIN_CATEGORIES}
    learningVideosPath={GAMEBRAIN_VIDEOS}
  />
);

export default GameBrainTeasersScreen;
