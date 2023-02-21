import {BADGES} from '../constants';

const generateBadges = (stats) => {
  const badges = BADGES.map(({title, description, attrs, data}) => {
    let statsValue = 0;

    for (let i = 0, len = attrs.length; i < len; i += 1) {
      const keys = attrs[i].split('.');
      let statsVl = stats[keys[0]];

      for (let j = 1, jlen = keys.length; j < jlen; j += 1) {
        statsVl = statsVl[keys[j]];
      }

      statsValue += statsVl || 0;
    }

    const filteredBadges = data
      .map((dt) => ({...dt, name: `${title} - ${dt.level}`}))
      .filter(({value}) => value <= statsValue);

    const upcomingBadges = data
      .map((dt) => ({
        ...dt,
        name: `${title} - ${dt.level}`,
        upcoming: true,
        currentValue: statsValue,
      }))
      .filter(({value}) => value > statsValue);

    return {title, description, badges: [...filteredBadges, ...upcomingBadges]};
  });

  return badges;
};

const generateBadgesCount = (stats) => {
  const badgeElements = generateBadges(stats);
  return badgeElements
    .map(({badges}) => badges.filter(({upcoming}) => !upcoming))
    .reduce((a, b) => [...a, ...b], []).length;
};

export {generateBadges, generateBadgesCount};
