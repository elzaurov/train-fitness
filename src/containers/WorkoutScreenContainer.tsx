/* eslint-disable no-extra-boolean-cast */
import moment from 'moment';
import React, {FC, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addScheduleItem, loadCourses, loadScheduleItem} from '../actions';
import {ICourse} from '../actions/types';
import {LoadingFullScreen} from '../components';
import {CourseScreen as CourseScreenLearning} from '../screens/learning';
import {NewCourseScreen as CourseScreenActivity} from '../screens/activity';
import {Header} from '../layout';
import {analytics} from '../config';
import {
    ANALYTICS_ADD_TO_CALENDAR_SELECTED,
    ANALYTICS_COURSE_OPENED,
    COURSE_VIEW_EVENT,
    DATE_FORMAT,
} from '../constants';
import {logEvent} from '../utils';

export const Container: FC<any> = ({
    navigation,
    route: {
        params: {
            id: courseId,
            date,
            scheduleId,
            onAddToCalendarPress,
            // scheduling OR learning
            viewMode,
        },
    },
}) => {
    const [scheduling, toggleScheduling] = useState(false);
    const [currentCourse, setCurrentCourse] = useState<ICourse | null>(null);

    const dispatch = useDispatch();

    const courses = useSelector<any, any>(state => state.coursesList);
    const remoteConfigs = useSelector<any, any>(state => state.remoteConfigs);
    const fullSchedule = useSelector<any, any>(state => state.fullSchedule);
    const schedule = useSelector<any, any>(state => state.scheduleItem);

    useEffect(() => {
        logEvent(ANALYTICS_COURSE_OPENED);
        dispatch(loadCourses());

        return () => {
            setCurrentCourse(null);
        };
    }, [dispatch]);

    useEffect(() => {
        const course = courses.find(c => c.key === courseId);
        if (!!course) {
            setCurrentCourse(course);
        }
    }, [courses, courseId]);

    useEffect(() => {
        if (!!currentCourse) {
            const eventParams: any = {
                id: currentCourse.key,
                name: currentCourse.name,
            };

            if (date && scheduleId) {
                dispatch(loadScheduleItem({date, scheduleId}));

                eventParams.date = date;
                eventParams.schedule_id = scheduleId;
            }

            analytics.logEvent(COURSE_VIEW_EVENT, eventParams);
        }
        return () => {};
    }, [dispatch, currentCourse, date, scheduleId]);

    const addToToday = async () => {
        const date = moment().format(DATE_FORMAT);

        const numberActitivitesPerDay =
            remoteConfigs.number_of_activities_per_day;

        if (
            fullSchedule[date] &&
            fullSchedule[date].length >= numberActitivitesPerDay
        ) {
            Alert.alert(
                "Today's Limit Reached",
                `You can't schedule more than ${numberActitivitesPerDay} activities for today`,
            );
        } else {
            dispatch(
                addScheduleItem({
                    date,
                    scheduleItem: {
                        ...currentCourse,
                        type: 'course',
                        id: currentCourse?.key,
                    },
                    callback: ({id, uid}) => {
                        navigation.push('Performing', {
                            screen: 'Course',
                            params: {id, scheduleId: uid, date},
                        });
                    },
                }),
            );
        }
    };

    const handleAddToCalendarPress = async () => {
        logEvent(ANALYTICS_ADD_TO_CALENDAR_SELECTED);

        try {
            toggleScheduling(true);

            if (onAddToCalendarPress) {
                // await onAddToCalendarPress();
                onAddToCalendarPress();
            } else {
                await addToToday();
            }
        } finally {
            toggleScheduling(false);
        }
    };

    let loading = !currentCourse;
    if (viewMode === 'learning') {
        loading = !currentCourse || !schedule;
    }

    if (loading) {
        return (
            <LoadingFullScreen
                // secondary={true}
                hideImage={viewMode === 'learning'}
            />
        );
    }

    const selectTitle = onAddToCalendarPress
        ? 'Watch This Course'
        : 'Add to Calendar';

    // TODO >> Bring all these conditions
    if (viewMode === 'learning') {
        return (
            <>
                <CourseScreenLearning
                    navigation={navigation}
                    handleAddToCalendarPress={handleAddToCalendarPress}
                    currentCourse={currentCourse}
                    schedule={schedule}
                    // courseId={courseId}
                    // date={date}
                    // scheduleId={scheduleId}
                    // courses={courses}
                />
            </>
        );
    }
    if (viewMode === 'preview') {
        return (
            <CourseScreenActivity
                navigation={navigation}
                selectTitle={selectTitle}
                currentCourse={currentCourse}
                scheduling={scheduling}
                handleAddToCalendarPress={handleAddToCalendarPress}
            />
        );
    }

    return (
        <LoadingFullScreen
            // secondary={true}
            hideImage={viewMode === 'learning'}
        />
    );
};

const navigationOptions = {
    title: 'COURSE',
    header: ({navigation}) => (
        <Header
            isDarkMode
            navigation={navigation}
            mode="back"
            hideLeaderBoard
        />
    ),
};

export const WorkoutScreenContainer = Object.assign(Container, {
    navigationOptions,
});
