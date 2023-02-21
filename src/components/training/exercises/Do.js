import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {RegularText} from '../../layout';
import {Timer, Time, Action} from '../../common';
import {Colors, Layout} from '../../../constants';

const Do = ({exercise, start, onUpdateSetDuration, onNextState, onNextSet}) => (
  <View style={styles.container}>
    <View style={styles.topContainer}>
      <Timer
        onUpdateSetDuration={onUpdateSetDuration}
        onNextState={onNextState}
      />
    </View>
    <View style={styles.row}>
      <Action text="SET" onPress={onNextSet} />
      <Action isHighlighted text="START" onPress={onNextState} />
    </View>
    {!start && (
      <View style={styles.tutorialTextContainer}>
        <RegularText style={[styles.tutorialText]}>
          Press start to begin
        </RegularText>
      </View>
    )}
    {start &&
      exercise &&
      exercise.setsTime &&
      exercise.setsTime.map((t, i) => (
        <View key={i} style={styles.row}>
          <View style={styles.textContainer}>
            <RegularText style={[styles.resumeText, styles.repText]}>
              {i + 1}
            </RegularText>
          </View>
          <View style={styles.textContainer}>
            <Time time={t} size={40} />
          </View>
        </View>
      ))}
  </View>
);

export default Do;

Do.propTypes = {
  exercise: PropTypes.objectOf(PropTypes.any).isRequired,
  start: PropTypes.bool.isRequired,
  onUpdateSetDuration: PropTypes.func.isRequired,
  onNextState: PropTypes.func.isRequired,
  onNextSet: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: Layout.padding,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  topContainer: {
    height: Layout.window.height * 0.17,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  tutorialTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tutorialText: {
    fontSize: 35,
    fontWeight: '200',
    textAlign: 'center',
    color: Colors.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resumeText: {
    fontSize: 25,
    textAlign: 'center',
  },
});
