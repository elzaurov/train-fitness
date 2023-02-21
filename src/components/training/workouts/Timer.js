import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Button, FlatButton, RegularText} from '../../layout';
import {Colors, Layout} from '../../../constants';
import TimerHOC from './TimerHOC';

const Timer = ({
  hasCheckedItems,
  timer,
  onPauseTimer,
  onStartTimer,
  onStopTimerInterval,
  t,
}) => {
  const {end, formatted, start, paused} = timer;

  return (
    <View
      style={[
        styles.timer,
        start && !paused
          ? {
              backgroundColor: Colors.secondary,
              borderTopWidth: 1,
              borderColor: Colors.secondary,
            }
          : {
              backgroundColor: Colors.mineShaft,
              borderTopWidth: 1,
              borderColor: Colors.background,
            },
        // Layout.isIphoneX ? {
        //   paddingBottom: (Layout.padding / 2) + 64,
        //   height: 124,
        // } : {},
      ]}>
      <RegularText style={styles.time}>{formatted}</RegularText>
      {start ? (
        <View style={styles.row}>
          <FlatButton
            style={styles.pause}
            onPress={paused ? onStartTimer : onPauseTimer}
            disabled={!!end}
            icon={paused ? 'play' : 'pause'}
            iconColor={paused ? Colors.secondary : Colors.white}
            iconSize={22}
          />
          <FlatButton
            style={styles.finish}
            textStyle={styles.finishText}
            onPress={onStopTimerInterval}
            disabled={!!end || !hasCheckedItems}>
            {end ? t('completed') : t('finish')}
          </FlatButton>
        </View>
      ) : (
        <Button style={styles.startButton} onPress={onStartTimer} primary>
          {t('start')}
        </Button>
      )}
    </View>
  );
};

Timer.propTypes = {
  hasCheckedItems: PropTypes.bool.isRequired,
  timer: PropTypes.objectOf(PropTypes.any).isRequired,
  onPauseTimer: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func.isRequired,
  onStopTimerInterval: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default TimerHOC(withTranslation('timerComponent')(Timer));

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: Layout.padding,
    paddingRight: Layout.padding,
    paddingBottom: Layout.padding / 2,
    paddingTop: Layout.padding / 2,
  },
  time: {
    fontSize: 16,
  },
  pause: {
    marginRight: Layout.halfMargin,
    padding: 6,
  },
  finish: {
    padding: 6,
  },
  finishText: {
    fontSize: 16,
  },
  startButton: {
    width: 'auto',
    paddingLeft: Layout.padding,
    paddingRight: Layout.padding,
  },
});
