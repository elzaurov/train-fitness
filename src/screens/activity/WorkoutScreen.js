import React from 'react';
import PropTypes from 'prop-types';
import WorkoutScreenHOC from '../training/WorkoutScreenHOC';
import {
    ActivityDetails,
    IntendedResults,
    WorkoutExercises,
    ActivityLoading,
    CollapsibleTextView,
    RequirementSections,
} from '../../components';
import {CheckPlanWrapper} from '../../layout';
import {Colors} from '../../constants';

const WorkoutScreen = ({
    navigation,
    workout,
    loading,
    showButton,
    scheduling,
    onAddToCalendarPress,
}) => {
    console.log('🚀 ~ file: WorkoutScreen.js ~ line 23 ~ workout', workout);
    if (loading === true) {
        return <ActivityLoading />;
    }

    const selectTitle = onAddToCalendarPress
        ? 'Select This Workout'
        : 'Add to Calendar';

    return (
        <CheckPlanWrapper navigation={navigation}>
            <ActivityDetails
                activity={workout}
                navigation={navigation}
                selectTitle={selectTitle}
                onAddToCalendarPress={onAddToCalendarPress}
                showButton={showButton}
                scheduling={scheduling}>
                <CollapsibleTextView
                    text={workout.description || ''}
                    initialCollapsed={true}
                    numberOfLines={5}
                    textStyle={{fontSize: 15, color: Colors.text}}
                />
                <RequirementSections requirements={workout.requirements} />
                <IntendedResults intendedResults={workout.intendedResults} />
                <WorkoutExercises
                    exercises={workout.exercises}
                    isPremium={workout.isPremium}
                    navigation={navigation}
                />
            </ActivityDetails>
        </CheckPlanWrapper>
    );
};

WorkoutScreen.propTypes = {
    onAddToCalendarPress: PropTypes.func,
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    workout: PropTypes.objectOf(PropTypes.any),
    loading: PropTypes.bool.isRequired,
    showButton: PropTypes.bool,
    scheduling: PropTypes.bool,
};

WorkoutScreen.defaultProps = {
    onAddToCalendarPress: () => null,
    workout: null,
    showButton: true,
    scheduling: false,
};

const wrappedWorkoutScreen = WorkoutScreenHOC(WorkoutScreen);
wrappedWorkoutScreen.navigationOptions = {
    header: () => null,
};

export default wrappedWorkoutScreen;
