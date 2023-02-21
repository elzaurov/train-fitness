import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DoingWorkoutScreenHOC from './DoingWorkoutScreenHOC';
import {
    ActivityLoading,
    ScrollViewHeaderScreenTemplate,
    DoingList,
    IntendedResults,
    CollapsibleTextView,
    Section,
    BottomBarTemplate,
    Button,
    RequirementSections,
} from '../../components';
import {Colors} from '../../constants';

const DoingWorkoutScreen = ({
    canStart,
    scheduledDate,
    loading,
    navigation,
    workout,
    exercises,
    submitting,
    exerciseIndex,
    lastExerciseIndex,
    onNextExercise,
    onSubmitWorkout,
    onGoBackToTracker,
}) => {
    if (loading === true) {
        return <ActivityLoading />;
    }

    let bottomButton = '';
    if (!canStart) {
        const buttonText =
            !scheduledDate || moment().isAfter(scheduledDate)
                ? 'Not Available'
                : `Available on ${scheduledDate.format('MMMM Do')}`;

        bottomButton = (
            <Button disabled onPress={() => {}}>
                {buttonText}
            </Button>
        );
    } else if (exerciseIndex > lastExerciseIndex) {
        bottomButton = (
            <Button disabled={submitting} onPress={onSubmitWorkout}>
                Submit
            </Button>
        );
    } else if (exerciseIndex === 0) {
        bottomButton = (
            <Button
                disabled={submitting}
                onPress={() => onNextExercise(exerciseIndex)}>
                Start
            </Button>
        );
    } else {
        bottomButton = (
            <Button
                disabled={submitting}
                onPress={() => onNextExercise(exerciseIndex)}>
                Next Exercise
            </Button>
        );
    }

    return (
        <BottomBarTemplate bottomBar={bottomButton}>
            <ScrollViewHeaderScreenTemplate
                navigation={navigation}
                title={workout.name}
                uri={workout.thumbnail}
                {...(canStart ? {onRightAction: onSubmitWorkout} : {})}
                onLeftAction={() => navigation.goBack()}>
                <CollapsibleTextView
                    text={workout.description || ''}
                    initialCollapsed
                    numberOfLines={2}
                    textStyle={{fontSize: 15, color: Colors.text}}
                />
                {workout.requirements && (
                    <RequirementSections requirements={workout.requirements} />
                )}
                <IntendedResults intendedResults={workout.intendedResults} />
                <Section title="EXERCISES">
                    <DoingList
                        items={exercises}
                        selectedIndex={exerciseIndex}
                        onPress={(item, index) => onNextExercise(index)}
                    />
                </Section>
            </ScrollViewHeaderScreenTemplate>
        </BottomBarTemplate>
    );
};

DoingWorkoutScreen.propTypes = {
    loading: PropTypes.bool.isRequired,
    navigation: PropTypes.any.isRequired,
    workout: PropTypes.any.isRequired,
    submitting: PropTypes.bool.isRequired,
    exerciseIndex: PropTypes.number.isRequired,
    lastExerciseIndex: PropTypes.number.isRequired,
    exercises: PropTypes.arrayOf(PropTypes.any).isRequired,
    onNextExercise: PropTypes.func.isRequired,
    onSubmitWorkout: PropTypes.func.isRequired,
    onGoBackToTracker: PropTypes.func.isRequired,
    canStart: PropTypes.bool.isRequired,
    scheduledDate: PropTypes.any,
};

DoingWorkoutScreen.defaultProps = {
    scheduledDate: null,
};

export default DoingWorkoutScreenHOC(DoingWorkoutScreen);
