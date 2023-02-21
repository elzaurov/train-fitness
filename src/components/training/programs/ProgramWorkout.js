import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {withNavigation} from '@react-navigation/compat';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RegularText} from '../../layout';
import {Colors, Layout} from '../../../constants';
import ProgramWorkoutHOC from './ProgramWorkoutHOC';

const ProgramWorkout = ({
  currentProgram,
  isScheduled,
  loading,
  navigation,
  schedule,
  workout,
  t,
}) => {
  const {key, exercises = [], name, thumbnail} = workout;
  const {date, uid} = schedule;

  if (loading) {
    return <View style={styles.loading} />;
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Workout', {
          currentProgram,
          date,
          scheduleId: uid,
          id: key,
          showButton: isScheduled,
        })
      }>
      <View style={styles.workoutWrapper}>
        <View style={styles.workout}>
          <FastImage style={styles.thumbnail} source={{uri: thumbnail}} />
          <View>
            <RegularText style={styles.name}>{name}</RegularText>
            <RegularText style={styles.exercises}>
              {exercises.length}{' '}
              {exercises.length > 1 ? t('exercises') : t('exercise')}
            </RegularText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ProgramWorkout.propTypes = {
  currentProgram: PropTypes.objectOf(PropTypes.any),
  isScheduled: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  schedule: PropTypes.objectOf(PropTypes.any),
  workout: PropTypes.objectOf(PropTypes.any).isRequired,
  t: PropTypes.func.isRequired,
};

ProgramWorkout.defaultProps = {
  currentProgram: undefined,
  schedule: {},
  isScheduled: false,
};

const ProgramWithNavigation = withNavigation(ProgramWorkout);
const ProgramWorkoutWrapper = ProgramWorkoutHOC(ProgramWithNavigation);

export default withTranslation('programWorkoutComponent')(
  ProgramWorkoutWrapper,
);

const styles = StyleSheet.create({
  loading: {
    height: 72,
    width: Layout.window.width - Layout.margin * 2,
    backgroundColor: Colors.loadingOverlay,
    marginTop: Layout.margin / 2,
    marginBottom: Layout.margin / 2,
    borderRadius: 2,
    overflow: 'hidden',
  },
  workoutWrapper: {
    marginTop: Layout.margin / 2,
    marginBottom: Layout.margin / 2,
  },
  workout: {
    backgroundColor: Colors.white,
    borderRadius: 2,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  thumbnail: {
    width: 72,
    height: 72,
  },
  name: {
    color: Colors.black,
    padding: Layout.padding / 2,
    paddingBottom: 0,
  },
  exercises: {
    color: Colors.dustyGray,
    paddingLeft: Layout.padding / 2,
    fontSize: 12,
  },
});
