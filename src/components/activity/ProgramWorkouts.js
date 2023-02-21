import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {RegularText, SimpleCollapsibleView} from '../layout';
import {Section} from '../common';
import {PremiumWrapper} from '../premium';
import WorkoutsHOC from './ProgramWorkoutsHOC';
import Workout from './Workout';
import {Colors} from '../../constants';
import SubItemsPlaceholder from './SubItemsPlaceholder';

const ProgramWorkout = ({phases, isPremium, loading, onWorkoutSelect, disabledPhases = false}) => {
  if (loading === true) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <Section title="Phases">
      <PremiumWrapper
        isPremium={isPremium}
        placeholder={<SubItemsPlaceholder />}
        overlay>
        {phases.map((phase) => (
          <View style={styles.phase} key={phase.name} /* TODO: change key here to avoid repetitive keys */>
            <SimpleCollapsibleView
              title={phase.name}
              titleStyle={styles.phaseTitle}
              initialCollapsed={true}>
              <RegularText style={styles.phaseDescription}>
                {phase.description}
              </RegularText>
            </SimpleCollapsibleView>
            {phase.workouts.map(({key, ...rest}) => (
              <TouchableOpacity
                style={styles.workout}
                key={key}
                disabled={disabledPhases}
                onPress={() => onWorkoutSelect(key)}>
                <Workout {...rest} categories={null} /* temporary */ />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </PremiumWrapper>
    </Section>
  );
};

ProgramWorkout.propTypes = {
  phases: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onWorkoutSelect: PropTypes.func.isRequired,
  isPremium: PropTypes.bool,
  disabledPhases: PropTypes.bool,
};

ProgramWorkout.defaultProps = {
  isPremium: false,
  disabledPhases: false,
};

export default WorkoutsHOC(ProgramWorkout);

const styles = StyleSheet.create({
  phase: {
    flex: 1,
    marginTop: 8,
    marginBottom: 24,
  },
  phaseTitle: {
    fontSize: 18,
    marginBottom: 7,
    color: Colors.text,
  },
  phaseDescription: {
    fontSize: 18,
    paddingBottom: 17,
    color: Colors.text,
  },
  workout: {
    marginBottom: 14,
  },
});
