export const getPillarModalText = (type: string) => {
    switch (type) {
        case 'mentality':
            return 'Involves video content to cultivate a positive, empowering, and bulletproof mindset which will aid in success on and off the pitch.';
        case 'technique':
            return 'Involves technical aspects of your training via exercises, workouts, and programs, all designed to achieve ball mastery. Also overarches team training and matches where individual training is being utilized.';
        case 'fitness':
            return 'Includes aspects of building, improving, and maintaining fitness levels for peak performance through countless varieties of fitness exercises and workouts.';
        case 'tactics':
            return 'Encompasses becoming a smarter player through tactical analysis through videos, lessons, and programs designed to increase football intelligence, awareness, and general understanding of fundamentals.';
        default:
            return '';
    }
};
