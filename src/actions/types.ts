export interface ICommon {
    id?: string;
    key?: string;
    code?: string;
    date?: string;
    completedAt?: number;
    createdAt?: number;
    createdBy?: string;
    description?: string;
}

export interface ICourse extends ICommon {
    badge: string;
    name: string;
    screen: string;
    thumbnail: string;
    videos: string[];
    earnings: IEarning;
    sizedImages: any;
    pillars: 'tactics' | 'mentality';
    category: string;
    type: string;
    isPremium: boolean;
    duration: number;
    level: TrainingLevel;
    topics: string[];
}
export interface ICurrentCourse {
    completed: boolean;
    lastCompleteAt: number;
    nextVideo: number;
}

export interface ILesson {
    key?: string | number;
    name: string;
    category: string;
    description: string;
    duration: number;
    exp: number;
    level: TrainingLevel;
    isPremium: boolean;
    pillars: 'mentality' | '';
    skills: TrainingSkill[];
    sizedImages: any;
    thumbnail: '';
    videoEmbedUrl: string;
    limelightVideoId: string;
    vimeoVideoId: string;
}

export type TrainingLevel = 'Fundamentals' | 'Advanced' | 'Expert' | '';
export type TrainingSkill =
    | 'Dribbling'
    | 'Passing'
    | 'Coordination'
    | 'Strength';

export interface IBadge extends ICommon {
    badge: string;
    title: string;
}

export interface IStat {
    maxValue: number;
    title: string;
    value: number;
}

export interface IEarning {
    badges: IBadge[];
    experience: number;
    stats: IStat[];
}

export interface ISchedule extends ICommon {
    badge: string;
    completed: boolean;
    designedBy: string;
    earnings: IEarning;
    experience: number;
    isFeatured: boolean;
    isPremium: boolean;
    key: string;
    name: string;
    percentageSeen: string;
    screen: string;
    stats: {
        courses: number;
    };
    thumbnail: string;
    time: 216;
    type: string;
    uid: string;
    videos: string[];
}

export interface IPhase {
    description: string;
    name: string;
    workouts: string[];
}

export interface IRequirement {
    equipments: string[];
}

export interface IProgram extends ICommon {
    createdBy: string;
    designedBy: string;
    earnings: IEarning;
    equipments: string[];
    intendedResults: string[];
    isFeatured: boolean;
    isPremium: boolean;
    name: string;
    phases: IPhase[];
    requirements: IRequirement;
    thumbnail: string;
    tips: string[];
}

export interface ICurrentProgram {
    key?: string;
    lastCompleteAt: number;
    nextWorkout: number;
}

export interface IWorkout extends ICommon {
    categories: string[];
    duration: number;
    earnings: IEarning[];
    equipments: string[];
    exercises: string[];
    intendedResults: string[];
    isPremium: boolean;
    name: string;
    level: string;
    requirements: IRequirement;
    thumbnail: string;
    sizedImages: any;
    pillars: string[];
    skills: string[];
}
