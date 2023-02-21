/* eslint-disable import/prefer-default-export */
export const sumStats = (total, stats, totalReps = 1) => {
  const totalStats = total;
  for (const key in stats) {
    if (typeof stats[key] === 'number') {
      if (!totalStats[key]) {
        totalStats[key] = 0;
      }

      totalStats[key] += stats[key] * totalReps || 0;
    } else if (typeof stats[key] === 'object') {
      if (!totalStats[key]) {
        totalStats[key] = {};
      }

      sumStats(totalStats[key], stats[key], totalReps);
    }
  }
};
