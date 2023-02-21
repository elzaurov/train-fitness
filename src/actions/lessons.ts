import {handleError} from './error';
import {database} from '../config';
import {rtdb} from '../db';
import {ILesson} from './types';
import {USER_ROLE_FREE} from '../constants';
import {loadCategories} from '.';

const videosPath = rtdb.authentication.allMembers.videos;

export const LOAD_CLASSROOMS = 'LOAD_CLASSROOMS';
export const LOAD_GAMEBRAINS = 'LOAD_GAMEBRAINS';

export const loadLessons =
    (lessonType: 'classroom' | 'gamebrain') => async (dispatch, getState) => {
        const userMembership = getState().userRole;

        try {
            const lessonRef = database.ref(videosPath[lessonType]);
            const categoryPath =
                lessonType === 'gamebrain' ? 'game-brain' : 'classroom';

            if (!getState()?.categories[categoryPath]) {
                await dispatch(loadCategories(categoryPath));
            }
            const categoryObject = getState()?.categories[categoryPath].reduce(
                (obj, item) => {
                    return {
                        ...obj,
                        [item['key']]: item,
                    };
                },
            );

            // checking the cache
            const classroomsCache = getState().lessons[lessonType];
            if (classroomsCache?.length > 0) return classroomsCache;

            lessonRef.on('value', (snap: {val: () => ILesson[]}) => {
                const data = snap.val() || [];

                const lessons = Object.entries(data).map(([key, lesson]) => {
                    const skill = categoryObject[lesson?.category]?.label ?? '';
                    return {
                        key,
                        title: lesson.name,
                        image: lesson.sizedImages || lesson.thumbnail,
                        duration: lesson.duration || 0,
                        level: lesson.level,
                        skills: [skill],
                        isLocked:
                            lesson.isPremium &&
                            userMembership === USER_ROLE_FREE,
                    };
                });

                let type;
                if (lessonType === 'classroom') {
                    type = LOAD_CLASSROOMS;
                } else if (lessonType === 'gamebrain') {
                    type = LOAD_GAMEBRAINS;
                }

                type &&
                    dispatch({
                        type,
                        payload: lessons,
                    });
            });
        } catch (error: any) {
            dispatch(handleError(error));
            return error;
        }
    };
