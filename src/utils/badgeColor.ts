import {colors} from '@traineffective/te-component-library';

export const getBadgeColor = (level: number): string | string[] => {
    if (level >= 0 && level <= 9) {
        return colors.levels.bronze;
    }
    if (level >= 10 && level <= 29) {
        return colors.levels.silver;
    }
    if (level >= 30 && level <= 49) {
        return colors.levels.gold;
    }
    if (level >= 50 && level <= 74) {
        return colors.levels.rubin;
    }
    if (level >= 75 && level <= 99) {
        return colors.levels.elite;
    }

    return colors.levels.legend;
};
