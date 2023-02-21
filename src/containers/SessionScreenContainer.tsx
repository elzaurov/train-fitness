import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

import {SessionListWrapper} from '@traineffective/te-component-library';
import {
    // loadCoursesWithPagination,
    loadCourses,
    addScheduleItem,
    toggleWatchMonth,
    watchWorkouts,
    loadWorkout,
    watchExercises,
    updateStreak,
    loadExercise,
    loadMoreCourse,
    loadMoreWorkOut,
    watchMoreExercises,
} from '../actions';
import {DATE_FORMAT} from '../constants';
import {LoadingFullScreen} from '../components';
import {sumStats} from '../utils';

export const SessionScreenContainer: FC<any> = ({
    navigation,
    route: {
        params: {by: exploreBy, trainingType},
    },
}) => {
    const [itemsList, setItemsList] = useState([]);
    const [updating, setUpdating] = useState(false);
    const [reachEnd, setReachEnd] = useState(false);

    const courses = useSelector<any, any>(state => state.coursesList);
    const trainingExercises = useSelector<any, any>(
        state => state.training.trainingExercises,
    );
    const trackerScreenInfo = useSelector<any, any>(
        state => state.trackerScreenInfo,
    );
    const trainingSession = useSelector<any, any>(
        state => state.training.trainingSession,
    );

    const state = useSelector<any, any>(state => state);

    const storedExercises = useSelector<any, any>(state => state.exercises);
    const dispatch = useDispatch();

    useEffect(() => {
        if (trainingType === 'course') {
            dispatch(loadCourses());
        } else if (trainingType === 'workout') {
            dispatch(watchWorkouts());
        } else if (trainingType === 'exercise') {
            dispatch(watchExercises());
        }
        return () => {};
    }, [dispatch]);

    useEffect(() => {
        if (courses?.length > 0 && trainingType === 'course') {
            const filtered = courses.filter(
                course => course.pillars === exploreBy,
            );
            setItemsList(filtered);
        } else if (trainingSession?.length > 0 && trainingType === 'workout') {
            const filterType =
                exploreBy === 'technical_sessions' ? 'technique' : 'fitness';
            const filtered = trainingSession.filter(
                workout => workout.pillars[filterType],
            );
            setItemsList(filtered);
        } else if (
            trainingExercises?.length > 0 &&
            trainingType === 'exercise'
        ) {
            const filterType =
                exploreBy === 'technical_drills' ? 'technique' : 'fitness';
            const filtered = trainingExercises.filter(
                exercise =>
                    exercise.pillars === filterType ||
                    exercise.pillars[filterType],
            );           
            setItemsList(filtered);
        }
    }, [courses, exploreBy, trainingSession, trainingExercises]);

    const getArrayItem = () => {
        switch (trainingType) {
            case 'course':
                return courses
            case 'workout':
                return trainingSession
            default:
                return trainingExercises;
        }
    }

    const onLoadMore = () => {
        if (!updating && itemsList.length > 0) {
            if (!reachEnd) {
                setUpdating(true);
            }
            
            const lastIndex = getArrayItem().length - 1;
            const createdAt = getArrayItem()[lastIndex]?.createdAt;

            const request = {
                createdAt,
                exploreBy,
                onSuccess: latest => {
                    if (latest.length <= 9) {
                        setReachEnd(true);
                    }
                    setUpdating(false);
                },
                onFail: err => {
                    setUpdating(false);
                    setReachEnd(true);
                },
            };

            if (trainingType === 'course') {
                dispatch(loadMoreCourse(request));
            } else if (trainingType === 'workout') {
                dispatch(loadMoreWorkOut(request));
            } else if (trainingType === 'exercise') {
                dispatch(watchMoreExercises(request));
            }
        }
    };

    const handlePressBack = () => {
        navigation.goBack();
    };

    const onPressCalendarArrows = (type, month) => {
        dispatch(toggleWatchMonth(type, month));
    };

    const handleCompleteExercise = async ({key, name}, timeSpent) => {
        const exercise = storedExercises[key];
        await dispatch(updateStreak());

        navigation.push('WorkoutEvaluation', {
            duration: timeSpent,
            individually: true,
            onFinishActivity: async duration => {
                const seconds = Math.floor(duration / 1000);
                const minutes = seconds / 60;

                const totalStats = {};
                const {stats} = exercise;
                const totalReps = stats.reps * stats.sets || 0;
                sumStats(totalStats, stats, totalReps);

                if (!totalStats.exp) {
                    totalStats.exp = 0;
                }

                navigation.push('RewardMenu', {
                    data: {
                        stats,
                        metadata: {
                            key,
                            name: exercise.name,
                            thumbnail: exercise.thumbnail,
                            sizedImages: exercise.sizedImages,
                            url: null,
                            navigateAfterDone: () =>
                                navigation.replace('Main', {screen: 'Train'}), //Changed as name change from training to train now
                            category: 'Exercises',
                            time: minutes,
                            experience: totalStats.exp,
                        },
                    },
                });
            },
        });
    };

    const handleItemPress = scheduleItem => {
        const {isLocked} = scheduleItem;
        if (isLocked) {
            navigation.push('Paywall');
        } else {
            const {key} = scheduleItem; // duplicate
            let itemReference;
            if (trainingType === 'course') {
                itemReference = courses;
            } else if (trainingType === 'workout') {
                itemReference = trainingSession;
            } else if (trainingType === 'exercise') {
                itemReference = trainingExercises;
            }

            const item = itemReference?.find(c => c.key === key);

            if (!!item && trainingType === 'course') {
                const params = {
                    id: key,
                    type: 'course',
                    viewMode: 'preview',
                    onAddToCalendarPress: () => {
                        navigation.push('CourseVideos', {
                            id: key,
                            type: 'course',
                            viewMode: 'learning',
                        });
                    },
                };

                navigation.push('Course', params);
            } else if (!!item && trainingType === 'workout') {
                const date = moment().format(DATE_FORMAT);

                dispatch(loadWorkout(key)).then(res => {
                    let scheduleId;
                    if (trackerScreenInfo[date]) {
                        const scheduledObject = trackerScreenInfo[
                            date
                        ]?.trainings?.scheduled.find(
                            obj => obj.key === res.key,
                        );

                        if (scheduledObject?.scheduleId) {
                            scheduleId = scheduledObject.scheduleId;
                        }
                    }

                    if (!scheduleId) {
                        dispatch(
                            addScheduleItem({
                                date,
                                scheduleItem: {
                                    ...res,
                                    type: 'workout',
                                    category: 'workout',
                                    id: item?.key,
                                },
                                callback: ({item}) => {
                                    const params = {
                                        id: key,
                                        scheduleId: item.scheduleId,
                                        date: item.date,
                                        type: 'workout',
                                        viewMode: 'preview',
                                    };

                                    navigation.navigate('Workout', params);
                                },
                            }),
                        );
                    } else {
                        const params = {
                            id: key,
                            scheduleId,
                            date,
                            type: 'workout',
                            viewMode: 'preview',
                        };

                        navigation.navigate('Workout', params);
                    }
                });
            } else if (!!item && trainingType === 'exercise') {
                dispatch(loadExercise(item.key));
                navigation.navigate('Exercise', {
                    id: key,
                    type: 'exercise',
                    canStart: true,
                    disableTimer: true,
                    onCompleteExercise: duration => {
                        handleCompleteExercise(
                            {key, name: item.name},
                            duration,
                        );
                    },
                });
            }
        }
    };

    const scheduleCourse = ({scheduleItem, date}) => {
        dispatch(
            addScheduleItem({
                date,
                scheduleItem,
                callback: navigation.navigate('Progress'),
            }),
        );
    };

    const onCalenderSelected = (day, scheduleItem) => {
        scheduleCourse({
            scheduleItem,
            date: moment(day).format(DATE_FORMAT),
        });
    };

    const getHeaderTitle = exploreBy => {
        switch (exploreBy) {
            case 'tactics':
                return 'Tactical Courses';
            case 'mentality':
                return 'Mentality Courses';
            case 'technical_drills':
                return 'Technical Drills';
            case 'fitness_exercises':
                return 'Fitness Exercises';
            case 'technical_sessions':
                return 'Technique Sessions';
            case 'fitness_sessions':
                return 'Fitness Sessions';
            default:
                return exploreBy;
        }
    };

    const headerTitle = getHeaderTitle(exploreBy);
    if (itemsList && itemsList.length > 0) {
        return (
            <SessionListWrapper
                exercises={itemsList}
                headerTitle={headerTitle}
                handlePressDate={() => {}}
                onItemPress={handleItemPress}
                handlePressBack={handlePressBack}
                trackerScreenInfo={trackerScreenInfo}
                showCalendarButton={trainingType !== 'exercise'}
                onCalenderSelected={onCalenderSelected}
                // onEndReached={onLoadMore} 
                // isUpdating={updating}
                // onEndReachedThreshold={1}
                onPressCalendarArrowsButton={onPressCalendarArrows}
            />
        );
    }
    return <LoadingFullScreen hideImage />;
};
