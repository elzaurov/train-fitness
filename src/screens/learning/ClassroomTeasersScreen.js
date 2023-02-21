import React from 'react';
import {LearningVideos} from '../../components';
import {CLASSROOM_CATEGORIES, CLASSROOM_VIDEOS} from '../../constants';

const ClassroomTeasersScreen = (props) => (
  <LearningVideos
    {...props}
    learningVideosCategoriesPath={CLASSROOM_CATEGORIES}
    learningVideosPath={CLASSROOM_VIDEOS}
  />
);

export default ClassroomTeasersScreen;
