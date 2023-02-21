import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Button, Input, RegularText, ScreenScrollView} from '../../components';
import FinishWorkoutScreenHOC from './FinishWorkoutScreenHOC';
import {Colors, Layout} from '../../constants';

const FinishWorkoutScreen = ({
  completing,
  hours,
  minutes,
  seconds,
  onChangeDuration,
  onCompleteClick,
  canComplete,
  t,
}) => {
  const durations = [
    {
      state: 'hours',
      value: hours,
      max: 4,
      maxLength: 1,
    },
    {
      state: 'minutes',
      value: minutes,
      max: 59,
      maxLength: 2,
    },
    {
      state: 'seconds',
      value: seconds,
      max: 59,
      maxLength: 2,
    },
  ];

  return (
    <ScreenScrollView>
      <View style={styles.durationWrapper}>
        <RegularText style={styles.durationText}>{t('duration')}</RegularText>
        <View style={styles.duration}>
          {durations.map(({state, value, max, maxLength}) => (
            <View key={state} style={styles.timeItem}>
              <Input
                maxLength={maxLength}
                style={styles.durationInput}
                value={value}
                keyboardType="numeric"
                onChangeText={(text) => onChangeDuration({state, text, max})}
              />
              <RegularText style={styles.timeText}>{t(state)}</RegularText>
            </View>
          ))}
        </View>
      </View>
      <Button
        style={styles.complete}
        onPress={onCompleteClick}
        disabled={!canComplete || completing}>
        {completing ? t('completing') : t('complete')}
      </Button>
    </ScreenScrollView>
  );
};

FinishWorkoutScreen.propTypes = {
  completing: PropTypes.bool.isRequired,
  hours: PropTypes.string.isRequired,
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
  onChangeDuration: PropTypes.func.isRequired,
  onCompleteClick: PropTypes.func.isRequired,
  canComplete: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default FinishWorkoutScreenHOC(
  withTranslation('finishWorkoutScreen')(FinishWorkoutScreen),
);

const styles = StyleSheet.create({
  timeItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationInput: {
    textAlign: 'center',
    marginRight: Layout.halfMargin / 2,
    width: 56,
  },
  timeText: {
    color: Colors.dustyGray,
    marginTop: Layout.halfMargin / 4,
    fontSize: 12,
  },
  durationWrapper: {
    alignItems: 'center',
  },
  duration: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationText: {
    fontSize: 16,
    marginBottom: Layout.halfMargin,
  },
  complete: {
    marginTop: Layout.margin * 2,
  },
});
