import React from 'react';
import {LoadingFullScreen, Course} from '../../components';

const CourseScreen = ({
    navigation,
    handleAddToCalendarPress,
    currentCourse,
    schedule,
}) => {
    if (!currentCourse || !schedule) {
        return <LoadingFullScreen secondary hideImage />;
    }

    return (
        <Course
            navigation={navigation}
            course={currentCourse}
            schedule={schedule}
            onAddToCalendarPress={handleAddToCalendarPress}
        />
    );
};

export default CourseScreen;
