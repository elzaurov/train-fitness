/**
 * Store repetitive properties inside @param ICommon
 */
export interface ICommon {}

export interface ISchedule {
    [key: string]: IScheduleItem;
}

export interface IScheduleItem {
    description: string;
    category: string;
    id: string;
    uid: string;
    isPremium: boolean;
    url: string;
    completed: boolean;
    type: string;
    key: string;
    code: string;
    date: string;
    thumbnail: string;
    createdAt: number;
    name: string;
}

export interface IOnBoarding {
    position: string;
}

export interface IProfile {
    displayName: string;
    fcmToken: string;
    emailSubscription: string;
    newUser: boolean;
    isAdmin: boolean;
    level: number;
    email: string;
    createdAt: string;
    photoURL: string;
    nameInitials: string;
    firstName: string;
    uid: string;
}
