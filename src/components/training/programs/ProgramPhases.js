import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, View} from 'react-native';
import {RegularText, SimpleCollapsibleView} from '../../layout';
import {Colors, Layout} from '../../../constants';
import ProgramWorkout from './ProgramWorkout';

const ProgramPhases = ({phases}) => {
  const phaseComponents =
    phases &&
    phases.map(({name, description, workouts}) => (
      <View key={name} style={styles.phase}>
        <SimpleCollapsibleView title={name} initialCollapsed={true}>
          <RegularText style={styles.description}>{description}</RegularText>
        </SimpleCollapsibleView>
        {workouts.map((workoutId) => (
          <ProgramWorkout
            key={workoutId}
            workoutId={workoutId}
            isScheduled={false}
          />
        ))}
      </View>
    ));

  return (
    <View style={styles.container}>{phaseComponents}</View>
  );
};

ProgramPhases.propTypes = {
  phases: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProgramPhases;

const styles = StyleSheet.create({
  container: {
    padding: Layout.padding,
  },
  name: {
    color: Colors.dustyGray,
    marginTop: Layout.margin / 2,
    marginBottom: Layout.margin / 2,
  },
  description: {
    color: Colors.dustyGray,
    fontSize: 12,
  },
});
