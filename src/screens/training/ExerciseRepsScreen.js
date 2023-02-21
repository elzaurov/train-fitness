import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ExerciseRepsScreenHOC from './ExerciseRepsScreenHOC';
import {LoadingFullScreen, QuestionScreenTemplate} from '../../components';
import {Colors} from '../../constants';

const ExerciseRepsScreen = ({
  navigation,
  loading,
  reps,
  onDecrementRep,
  onIncrementRep,
  onNext,
}) => {
  if (loading) {
    return <LoadingFullScreen secondary hideImage />;
  }

  return (
    <QuestionScreenTemplate
      navigation={navigation}
      question="How many REPS you will do?"
      onNext={onNext}
      nextDisabled={reps === 0}
      buttonText="START">
      <View style={styles.numberPickerContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => onDecrementRep()}>
          <MaterialCommunityIcons name="minus" color={Colors.white} size={35} />
        </TouchableOpacity>
        <Text style={styles.number}>{reps}</Text>
        <TouchableOpacity
          style={styles.option}
          onPress={() => onIncrementRep()}>
          <MaterialCommunityIcons name="plus" color={Colors.white} size={35} />
        </TouchableOpacity>
      </View>
    </QuestionScreenTemplate>
  );
};

ExerciseRepsScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
  loading: PropTypes.bool.isRequired,
  reps: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onIncrementRep: PropTypes.func.isRequired,
  onDecrementRep: PropTypes.func.isRequired,
};

export default ExerciseRepsScreenHOC(ExerciseRepsScreen);

const styles = StyleSheet.create({
  number: {
    textAlign: 'center',
    fontSize: 100,
    fontWeight: '200',
    color: Colors.white,
    width: 165,
    fontFamily: 'TitilliumWeb-Regular',
  },
  numberPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
    backgroundColor: Colors.gray3,
    borderRadius: 50,
  },
});
