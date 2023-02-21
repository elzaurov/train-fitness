/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import PropTypes from 'prop-types';
import {CheckPlanWrapper} from '../../layout';
import {
    ActivityDetails,
    IntendedResults,
    FeaturedPeople,
    CollapsibleTextView,
    CourseVideos,
    RequirementSections,
} from '../../components';
import {Colors} from '../../constants';

const CourseScreen = ({
    navigation,
    selectTitle,
    currentCourse,
    scheduling,
    handleAddToCalendarPress,
}) => {
    const {
        description,
        intendedResults,
        designedBy,
        requirements,
        videos,
        isPremium,
        screen,
    } = currentCourse;

    return (
        <CheckPlanWrapper navigation={navigation}>
            <ActivityDetails
                activity={currentCourse}
                selectTitle={selectTitle}
                navigation={navigation}
                scheduling={scheduling}
                onAddToCalendarPress={handleAddToCalendarPress}>
                <CollapsibleTextView
                    text={description || ''}
                    initialCollapsed={true}
                    numberOfLines={5}
                    textStyle={{fontSize: 15, color: Colors.text}}
                />
                <IntendedResults intendedResults={intendedResults} />
                <RequirementSections requirements={requirements} />
                {designedBy && <FeaturedPeople people={[designedBy]} />}
                <CourseVideos
                    videos={videos}
                    isPremium={isPremium}
                    navigation={navigation}
                    type={screen}
                />
                {/* <Earnings earnings={earnings} /> */}
            </ActivityDetails>
        </CheckPlanWrapper>
    );
};

CourseScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

CourseScreen.defaultProps = {};

CourseScreen.navigationOptions = {
    header: () => null,
};

export default CourseScreen;
