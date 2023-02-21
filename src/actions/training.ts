import {functions, database} from '../config';
import {rtdb} from '../db';
import {IWorkout} from './types';
import {handleError} from './error';
import {USER_ROLE_FREE, NUMBER_OF_ITEMS} from '../constants';
import {loadCategories, loadProgram} from '.';

export const ACTIVITY_TYPES = {
    TRAINIG_SESSION: 'training_session',
    TECHNICAL_DRILLS: 'technical_drills',
    FITNESS_EXERCISES: 'fitness_exercises',
    TECHNICAL_SESSIONS: 'technical_sessions',
    FITNESS_SESSIONS: 'fitness_sessions',
};

export const LOAD_TRAINING_PLANS = 'LOAD_TRAINING_PLANS';
export const LOAD_ACTIVITY_LIST = 'LOAD_ACTIVITY_LIST';
export const LOAD_TRAINING_SESSIONS = 'LOAD_TRAINING_SESSIONS';
export const LOAD_TRAINING_EXERCISES = 'LOAD_TRAINING_EXERCISES';
export const LOAD_WORKOUT = 'LOAD_WORKOUT';
export const LOAD_MORE_WORKOUT = 'LOAD_MORE_WORKOUT';
export const LOAD_MORE_TRAINING_EXERCISES = 'LOAD_MORE_TRAINING_EXERCISES';

export const watchWorkouts = () => async (dispatch, getState) => {
    const userMembership = getState().userRole;
    // try {
    //     const snap = await database
    //         .ref(rtdb.authentication.allMembers.videos.workouts)
    //         .orderByChild('createdAt')
    //         .limitToLast(NUMBER_OF_ITEMS)
    //         .once('value');

    //         let workouts = Object.entries(snap.val() || []).map(

    //             ([key, workout]) => {
    //                 // temporary max out to 2 categories to not distort view
    //                 if (workout?.categories) {
    //                     workout.categories.length = 2;
    //                 }
    //                 const skills = workout?.categories?.map(
    //                     key => categoryObject[key]?.label ?? '',
    //                 );
    //                 return ({
    //                 key,
    //                 sizedImages: workout.sizedImages,
    //                 duration: workout.duration,
    //                 title: workout.name,
    //                 level: workout.level,
    //                 pillars: workout.pillars,
    //                 skills,
    //                 // these item required to Schedule a workout
    //                 name: workout.name,
    //                 type: 'workout',
    //                 category: 'workout',
    //                 createdAt: workout.createdAt,
    //                 isLocked:
    //                     workout.isPremium && userMembership === USER_ROLE_FREE,
    //                 thumbnail: workout.thumbnail,
    //             })},
    //         );
    //         dispatch({ 
    //             type: LOAD_WORKOUT,
    //             payload: workouts,
    //         });
    //         return workouts;
    // } catch (error: any) {
    //     alert('error');

    //     dispatch(handleError(error));
    // }
    try {
        const workoutsCache = getState().training.trainingSession;
        if (!getState()?.categories?.workouts) {
            await dispatch(loadCategories('exercises'));
        }
        const categoryObject = getState()?.categories?.exercises.reduce(
            (obj, item) => {
                return {
                    ...obj,
                    [item.key]: item,
                };
            },
        );

        const isWorkoutsCacheEmpty = Object.keys(workoutsCache).length === 0;

        if (!isWorkoutsCacheEmpty) {
            return workoutsCache;
        }

        const workoutsRef = database.ref(
            rtdb.authentication.allMembers.videos.workouts,
        );

        // let workouts: any[] = [];

        workoutsRef.on('value', (snap: {val: () => IWorkout[]}) => {
            const data = snap.val() || [];

            const workouts = Object.entries(data).map(([key, workout]) => {
                // temporary max out to 2 categories to not distort view
                if (workout?.categories) {
                    workout.categories.length = 2;
                }
                const skills = workout?.categories?.map(
                    key => categoryObject[key]?.label ?? '',
                );

                return {
                    key,
                    sizedImages: workout.sizedImages,
                    duration: workout.duration,
                    title: workout.name,
                    level: workout.level,
                    pillars: workout.pillars,
                    skills,
                    // these item required to Schedule a workout
                    name: workout.name,
                    type: 'workout',
                    category: 'workout',
                    isLocked:
                        workout.isPremium && userMembership === USER_ROLE_FREE,
                    thumbnail: workout.thumbnail,
                };
            });
            console.log(workouts,"");
            
            dispatch({
                type: LOAD_TRAINING_SESSIONS,
                payload: workouts,
            });
            return workouts;
        });
    } catch (error) {
        alert('error');
        dispatch(handleError(error));
    }
};

export const loadMoreWorkOut =  (request) => async (dispatch, getState) => {
    const userMembership = getState().userRole;
    if (!getState()?.categories?.exercises) {
        await dispatch(loadCategories('exercises'));
    }
    const categoryObject = getState()?.categories?.exercises.reduce(
        (obj, item) => {
            return {
                ...obj,
                [item.key]: item,
            };
        },
    );
    try {
        const snap = await database
            .ref(rtdb.authentication.allMembers.videos.workouts)
            .orderByChild('createdAt')
            .endAt(request.createdAt - 1)
            .limitToLast(NUMBER_OF_ITEMS)
            .once('value');
            
        let workouts = Object.entries(snap.val() || []).map(
            ([key, workout]) => {
                // temporary max out to 2 categories to not distort view
                if (workout?.categories) {
                    workout.categories.length = 2;
                }
                const skills = workout?.categories?.map(
                    key => categoryObject[key]?.label ?? '',
                );
                
                return ({
                    key,
                    sizedImages: workout.sizedImages,
                    duration: workout.duration,
                    title: workout.name,
                    level: workout.level,
                    pillars: workout.pillars,
                    skills,
                    createdAt: workout.createdAt,
                    // these item required to Schedule a workout
                    name: workout.name,
                    type: 'workout',
                    category: 'workout',
                    isLocked:
                        workout.isPremium && userMembership === USER_ROLE_FREE,
                    thumbnail: workout.thumbnail,
                })
            },
        );
        dispatch({
            type: LOAD_MORE_WORKOUT,
            payload: workouts
        });
        request?.onSuccess(workouts);
    } catch (error: any) {
        
        dispatch(handleError(error));
    }
};

export const watchExercises = () => async (dispatch, getState) => {
    const userMembership = getState().userRole;
    // if (!getState()?.categories?.exercises) {
    //     await dispatch(loadCategories('exercises'));
    // }
    // const categoryObject = getState()?.categories?.exercises.reduce(
    //     (obj, item) => {
    //         return {
    //             ...obj,
    //             [item.key]: item,
    //         };
    //     },
    // );
    // try {
    //     const snap = await database
    //         .ref(rtdb.authentication.allMembers.videos.exercises)
    //         .orderByChild('createdAt')
    //         .limitToLast(NUMBER_OF_ITEMS)
    //         .once('value');
    //         let trainingExercises = Object.entries(snap.val() || []).map(
    //             ([key, exercise]) => {
    //                 if (exercise?.categories) {
    //                     exercise.categories.length = 2;
    //                 }
    //                 const skills = exercise?.categories?.map(
    //                     key => categoryObject[key]?.label ?? '',
    //                 );
    //                 return ({
    //                     key,
    //                     sizedImages: exercise.sizedImages,
    //                     duration: exercise.duration,
    //                     title: exercise.name,
    //                     level: exercise.level,
    //                     pillars: exercise.pillars,
    //                     skills,
    //                     createdAt: exercise.createdAt,
    //                     // these item required to Schedule a workout
    //                     name: exercise.name,
    //                     type: 'workout',
    //                     category: 'workout',
    //                     isLocked:
    //                         exercise.isPremium && userMembership === USER_ROLE_FREE,
    //                     thumbnail: exercise.thumbnail,
    //                 })
    //             },
    //         );

    //         dispatch({
    //             type: LOAD_TRAINING_EXERCISES,
    //             payload: trainingExercises,
    //         });
    //         return trainingExercises;
    // } catch (error: any) {
    //     dispatch(handleError(error));
    // }
    try {
        const exercisesCache = getState().exercises;

        if (!getState()?.categories?.exercises) {
            await dispatch(loadCategories('exercises'));
        }
        const categoryObject = getState()?.categories?.exercises.reduce(
            (obj, item) => {
                return {
                    ...obj,
                    [item.key]: item,
                };
            },
        );

        const isExercisesCacheEmpty = Object.keys(exercisesCache).length === 0;

        if (!isExercisesCacheEmpty) {
            return exercisesCache;
        }

        const exercisesRef = database.ref(
            rtdb.authentication.allMembers.videos.exercises,
        );

        // let workouts: any[] = [];

        exercisesRef.on('value', (snap: {val: () => IWorkout[]}) => {
            const data = snap.val() || [];

            const exercises = Object.entries(data).map(([key, exercise]) => {
                // temporary max out to 2 categories to not distort view
                if (exercise?.categories) {
                    exercise.categories.length = 2;
                }
                const skills = exercise?.categories?.map(
                    key => categoryObject[key]?.label ?? '',
                );
                return {
                    key,
                    sizedImages: exercise.sizedImages,
                    duration: exercise.duration,
                    title: exercise.name,
                    level: exercise.level,
                    pillars: exercise.pillars,
                    skills,
                    // these item required to Schedule a workout
                    name: exercise.name,
                    type: 'workout',
                    category: 'workout',
                    isLocked:
                        exercise.isPremium && userMembership === USER_ROLE_FREE,
                    thumbnail: exercise.thumbnail,
                };
            });

            dispatch({
                type: LOAD_TRAINING_EXERCISES,
                payload: exercises,
            });
            return exercises;
        });
    } catch (error: any) {
        alert('error');
        dispatch(handleError(error));
    }
};

export const watchMoreExercises = (request) => async (dispatch, getState) => {
    const userMembership = getState().userRole;
    if (!getState()?.categories?.exercises) {
        await dispatch(loadCategories('exercises'));
    }
    const categoryObject = getState()?.categories?.exercises.reduce(
        (obj, item) => {
            return {
                ...obj,
                [item.key]: item,
            };
        },
    );

    try {
        const snap = await database
            .ref(rtdb.authentication.allMembers.videos.exercises)
            .orderByChild('createdAt')
            .endAt(request.createdAt - 1)
            .limitToLast(NUMBER_OF_ITEMS)
            .once('value');
            let trainingExercises = Object.entries(snap.val() || []).map(   
                ([key, exercise]) => {
                    if (exercise?.categories) {
                        exercise.categories.length = 2;
                    }
                    const skills = exercise?.categories?.map(
                        key => categoryObject[key]?.label ?? '',
                    );
                    return ({
                        key,
                        sizedImages: exercise.sizedImages,
                        duration: exercise.duration,
                        title: exercise.name,
                        level: exercise.level,
                        pillars: exercise.pillars,
                        skills,
                        // these item required to Schedule a workout
                        name: exercise.name,
                        type: 'workout',
                        category: 'workout',
                        createdAt: exercise.createdAt,
                        isLocked:
                            exercise.isPremium && userMembership === USER_ROLE_FREE,
                        thumbnail: exercise.thumbnail,
                    })
                },
            );
            dispatch({
                type: LOAD_MORE_TRAINING_EXERCISES,
                payload: trainingExercises,
            });
            request?.onSuccess(trainingExercises);
            return trainingExercises;
    } catch (error) {
        
    }
}

export const loadTrainingPlans = () => async dispatch => {
    try {
        // Temporary implementation of training plan using a temporary rtdb trainingPlan node
        const url = `/authentication/allMembers/trainingPlan`;

        const snap = await database.ref(url).once('value');
        const trainingPlanIds = snap.val();
        const trainingPlans: any[][] = [];

        for (
            let elementNo = 0;
            elementNo < trainingPlanIds.length;
            elementNo++
        ) {
            const element = trainingPlanIds[elementNo];
            const obj: any = {};
            obj.title = element.title;

            const promises = element.data.map((value: any) => {
                return dispatch(loadProgram(value));
            });

            const result = await Promise.all(promises);

            obj.data = result.map((value: any) => ({
                title: value.name,
                thumbnailUrl: value.thumbnail,
                ...value,
            }));
            trainingPlans.push(obj);
        }

        dispatch({
            type: LOAD_TRAINING_PLANS,
            payload: trainingPlans,
        });
        return trainingPlans;
    } catch (error) {}
};

// export const loadTrainingSessions = () => async (dispatch, getState) => {
//     const getTrainingSession = functions.httpsCallable('getTrainingSession');
//     const {data} = await getTrainingSession();
//     dispatch({
//         type: LOAD_TRAINING_SESSIONS,
//         payload: data,
//     });
//     return data;
// };

// refer to activity types for values
export const loadActivitiesList =
    (activityType: string) => async (dispatch, getState) => {
        const getActivitiesList = functions.httpsCallable('getActivitiesList');
        const {data} = await getActivitiesList(activityType);
        dispatch({
            type: LOAD_ACTIVITY_LIST,
            payload: data,
        });
        return data;
    };
