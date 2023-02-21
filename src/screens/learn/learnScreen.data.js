import CoursesBox from '../../assets/images/learn/CoursesBox.png';
import TacticalBox from '../../assets/images/learn/TacticalBox.png';
import MentalityBox from '../../assets/images/learn/MentalityBox.png';

export const COURSES = 'COURSES';
export const TACTICAL_ANALYSES = 'TACTICAL ANALYSES';
export const MENTALITY_LESSONS = 'MENTALITY LESSONS';

export const mainBoxesData = [
    {
        key: 0,
        sourceImage: CoursesBox,
        title: 'COURSES',
        description: 'Deep dive into \ntactics & \nmentality topics',
        buttonText: '15 - 45 min',
        icons: ['tactics', 'mentality'],
    },
    {
        key: 1,
        sourceImage: TacticalBox,
        title: 'TACTICAL ANALYSES',
        description: 'Learn from Premier \nLeague analysts',
        buttonText: '5 - 10 min',
        icons: ['tactics'],
    },
    {
        key: 2,
        sourceImage: MentalityBox,
        title: 'MENTALITY LESSONS',
        description: 'Get inspired, motivated \nand mentally stronger',
        buttonText: '5 - 10 min',
        icons: ['mentality'],
    },
];

export const streaksData = [
    'Complete a train effective training',
    'Complete a Train Effective course',
];
