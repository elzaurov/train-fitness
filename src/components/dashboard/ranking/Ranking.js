import React from 'react';
import PropTypes from 'prop-types';
import WeeklyRanking from './WeeklyRanking';
import AllTimeRanking from './AllTimeRanking';

const Ranking = ({selectedTab}) => {
  if (selectedTab === 'general') {
    return <AllTimeRanking />;
  }

  return <WeeklyRanking />;
};

Ranking.propTypes = {
  selectedTab: PropTypes.string,
};

Ranking.defaultProps = {
  selectedTab: undefined,
};

export default Ranking;
