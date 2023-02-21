import moment from 'moment';
import {auth, database} from '../config';
import {handleError} from './error';
import {ICourse, ICurrentCourse, ISchedule} from './types';
import {UPDATE_SCHEDULE_DAY} from './schedule';
import {rtdb} from '../db';
import {USER_ROLE_FREE, NUMBER_OF_ITEMS} from '../constants';

export const LOAD_COURSES_LIST = 'LOAD_COURSES';
export const LOAD_MORE_COURSES_LIST = 'LOAD_MORE_COURSES_LIST';
export const LOAD_COURSE = 'LOAD_COURSE';

export const loadCourse = (key: string) => async dispatch => {
    try {
        const url = `/authentication/allMembers/videos/courses/${key}`;
        const snap = await database.ref(url).once('value');
        const course = snap.val() ?? {};
        dispatch({
            type: LOAD_COURSE,
            payload: {
                ...course,
                key,
            },
        });
        return course;
    } catch (error: any) {
        dispatch(handleError(error));
        return error;
    }
};

export const loadCourses = () => (dispatch, getState) => {
    const userMembership = getState().userRole;
    try {
        const coursesRef = database.ref(
            rtdb.authentication.allMembers.videos.courses,
        );

        const coursesCache = getState().coursesList;
        if (coursesCache && coursesCache.length > 0) {
            return coursesCache;
        }

        let courses: any[] = [];
        coursesRef.on('value', (snap: {val: () => ICourse[]}) => {
            const data = snap.val() || [];
            courses = Object.entries(data).map(([key, course]) => ({
                key,
                image: course.sizedImages,
                duration: course.duration,
                title: course.name,
                level: course.level,
                skills: course.topics,
                pillars: course.pillars,
                videos: course.videos,
                screen: course.screen,
                // this items are required to schedule a course
                name: course.name,
                type: 'course',
                category: 'course',
                sizedImages: course.sizedImages,
                thumbnail: course.thumbnail,
                isLocked: course.isPremium && userMembership === USER_ROLE_FREE,
            }));

            dispatch({
                type: LOAD_COURSES_LIST,
                payload: courses,
            });
        });
    } catch (error: any) {
        dispatch(handleError(error));
        return error;
    }
};

export const loadCoursesWithPagination = () => async (dispatch, getState) => {
    const userMembership = getState().userRole;
    try {
        
        const snap = await database
            .ref(rtdb.authentication.allMembers.videos.courses)
            .orderByChild('createdAt')
            .limitToLast(NUMBER_OF_ITEMS)
            .once('value');
        
        let courses = Object.entries(snap.val() || []).map(
            ([key, value]) => ({
                key,
                image: value.sizedImages,
                duration: value.duration,
                title: value.name,
                level: value.level,
                skills: value.topics,
                pillars: value.pillars,
                videos: value.videos,
                screen: value.screen,
                // this items are required to schedule a course
                name: value.name,
                type: 'course',
                category: 'course',
                sizedImages: value.sizedImages,
                thumbnail: value.thumbnail,
                createdAt: value.createdAt,
                isLocked: value.isPremium && userMembership === USER_ROLE_FREE,
            }),
        );
            dispatch({
                type: LOAD_COURSES_LIST,
                payload: courses
            });
    } catch (error: any) {
        dispatch(handleError(error));
        return error;
    }
};

export const loadMoreCourse = request => async (dispatch, getState) => {
    const userMembership = getState().userRole;
    try {
        const snap = await database
            .ref(rtdb.authentication.allMembers.videos.courses)
            .orderByChild('createdAt')
            .endAt(request.createdAt - 1)
            .limitToLast(NUMBER_OF_ITEMS)
            .once('value');
        let courses = Object.entries(snap.val() || []).map(
            ([key, value]) => ({
                key,
                image: value.sizedImages,
                duration: value.duration,
                title: value.name,
                level: value.level,
                skills: value.topics,
                pillars: value.pillars,
                videos: value.videos,
                screen: value.screen,
                // this items are required to schedule a course
                name: value.name,
                type: 'course',
                category: 'course',
                sizedImages: value.sizedImages,
                thumbnail: value.thumbnail,
                createdAt: value.createdAt,
                isLocked: value.isPremium && userMembership === USER_ROLE_FREE,
            }),
        );
        dispatch({
            type: LOAD_MORE_COURSES_LIST,
            payload: courses
        });
        request?.onSuccess(courses);

    } catch (error) {
        dispatch(handleError(error));
    }
};

export const completeCourse =
    ({schedule, experience, percentageSeen, timeSpent, stats}) =>
    async dispatch => {
        try {
            const userId = auth?.currentUser?.uid;
            const {date} = schedule as ISchedule;
            const completedSchedule: ISchedule = {
                ...schedule,
                experience,
                percentageSeen,
                time: timeSpent,
                completed: true,
                completedAt: moment().valueOf(),
            };
            if (stats) {
                completedSchedule.stats = stats;
            }
            const url = `/authentication/userOwned/schedules/${userId}/${date}`;
            const snapShot: ISchedule[] =
                (await (await database.ref(url).once('value')).val()) || [];
            const schedules: ISchedule[] = Object.entries(snapShot).map(
                ([key, value]: [string, ISchedule]) => ({
                    ...value,
                    key,
                }),
            );
            const scheduleIndex = schedules
                .map(({uid}) => uid)
                .indexOf(completedSchedule.uid);
            schedules[scheduleIndex] = completedSchedule;
            await database.ref(url).set(schedules);
            dispatch({
                type: UPDATE_SCHEDULE_DAY,
                payload: {[date!]: schedules},
            });
        } catch (error: any) {
            dispatch(handleError(error));
        }
    };
export const removeCurrentCourseProgress = course => async dispatch => {
    try {
        const uid = auth?.currentUser?.uid;
        const url = `/authentication/userOwned/currentCourses/${uid}/${course.key}`;
        await database.ref(url).set({nextVideo: 0, key: course.key});
    } catch (error: any) {
        dispatch(handleError(error));
    }
};
export const loadCurrentCourses = () => async dispatch => {
    try {
        const uid = auth?.currentUser?.uid;
        const url = `/authentication/userOwned/currentCourses/${uid}`;
        const snapshot: ICurrentCourse[] =
            (await (await database.ref(url).once('value')).val()) || [];
        const currentCourses = Object.entries(snapshot).map(
            ([key, value]: [string, ICurrentCourse]) => ({key, ...value}),
        );
        return currentCourses;
    } catch (error: any) {
        dispatch(handleError(error));
        return error;
    }
};
export const loadCurrentCourse = id => async dispatch => {
    try {
        const {uid} = auth?.currentUser!;
        const url = `/authentication/userOwned/currentCourses/${uid}/${id}`;
        const snap = await database.ref(url).once('value');
        const currentCourse: ICurrentCourse = snap.val() ?? {};
        if (!currentCourse || Object.keys(currentCourse).length === 0) {
            return {nextVideo: 0, key: id};
        }
        return {...currentCourse, key: id};
    } catch (error: any) {
        dispatch(handleError(error));
        return error;
    }
};
export const updateCurrentCourse =
    (currentCourse, course) => async dispatch => {
        try {
            const {uid} = auth?.currentUser!;
            const url = `/authentication/userOwned/currentCourses/${uid}/${currentCourse.key}`;
            let data: ICurrentCourse = currentCourse;
            data = {
                nextVideo: data.nextVideo + 1,
                lastCompleteAt: moment().valueOf(),
                completed: course.videos.length === currentCourse.nextVideo + 1,
            };
            await database.ref(url).set(data);
            return {...data, key: currentCourse.key};
        } catch (error: any) {
            dispatch(handleError(error));
            return error;
        }
    };
