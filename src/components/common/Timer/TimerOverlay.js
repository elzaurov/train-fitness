import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {Animated, StyleSheet, View} from 'react-native';
import RequirementIcon from '../../activity/requirements/RequirementIcon';
import {BottomBarTemplate, RegularText, Button} from '../../layout';
import SoundPlayer from './SoundPlayer';
import NativeSoundPlayer from '../../bridges/NativeSoundPlayer';
import Timer from './Timer';
import Action from './Action';
import {
  Layout,
  Colors,
  DISABLED,
  NEUTRAL,
  BLUE,
  DANGER,
} from '../../../constants';
import TimerOverlayHOC from './TimerOverlayHOC';
import TimerOverlayAnimationsHOC from './TimerOverlayAnimationsHOC';

const TimerOverlay = ({
  children,
  exerciseStep,
  buttonText,
  buttonAction,
  buttonColor,
  buttonTextColor,
  isExerciseCompleted,
  submitting,
  playAudio,
  audioUrl,
  canStart,
  bottomButton,
  onPlaySound,
  onEndSound,
  onFinishExerciseStep,
  onStopTimer,
  onCloseTimer,
  onResetTimer,
  onRef,
  // ANIMATION
  height,
  titleContainerHeight,
  itemOpacity,
  actionContainerHeight,
  actionContainerPadding,
  timeContainerLeft,
  bottomTextContainerHeight,
  closeContainerLeft,
  closeActionWidth,
  closeActionOpacity,
}) => {
  const fullscreen = useSelector((state) => state.android_player.fullscreen);

  let button;
  if (bottomButton) {
    button = bottomButton;
  } else if (canStart) {
    button = (
      <Button disabled={submitting} onPress={() => buttonAction()}>
        {buttonText}
      </Button>
    );
  }

  return (
    <BottomBarTemplate bottomBar={button}>
      <View style={styles.container}>
        <View style={[styles.childrenContainer]}>{children}</View>
        <Animated.View
          style={[
            styles.timerBoxContainer,
            fullscreen ? styles.hideTimerBoxContainer : {},
            {
              height,
            },
          ]}>
          <Animated.View
            style={[
              styles.actionsContainer,
              {
                opacity: itemOpacity,
                height: actionContainerHeight,
                paddingTop: actionContainerPadding,
              },
            ]}>
            <Action
              type={exerciseStep.reloadDisabled ? DISABLED : NEUTRAL}
              icon="reload"
              onPress={exerciseStep.reloadDisabled ? () => {} : onResetTimer}
            />
            <View style={styles.setsTextContainer}>
              <RegularText style={styles.setsText}>
                {exerciseStep.title}
              </RegularText>
            </View>
            <Action
              type={exerciseStep.pauseDisabled ? DISABLED : BLUE}
              icon="pause"
              onPress={exerciseStep.pauseDisabled ? () => {} : onStopTimer}
            />
          </Animated.View>
          <View style={styles.timerContainer}>
            <Animated.View
              style={[
                styles.columnContainer,
                {
                  height: titleContainerHeight,
                  opacity: itemOpacity,
                },
              ]}>
              <RegularText style={[styles.text]}>
                {exerciseStep.name}
              </RegularText>
            </Animated.View>
            {!isExerciseCompleted && (
              <View style={[styles.timeContainer]}>
                <Animated.View style={{left: timeContainerLeft}}>
                  <Timer
                    onRef={onRef}
                    onPlaySound={onPlaySound}
                    onFinishExerciseStep={onFinishExerciseStep}
                  />
                </Animated.View>
                <Animated.View
                  style={{
                    left: closeContainerLeft,
                    width: closeActionWidth,
                    opacity: closeActionOpacity,
                  }}>
                  <Action type={DANGER} icon="close" onPress={onCloseTimer} />
                </Animated.View>
              </View>
            )}
            <Animated.View
              style={[
                styles.columnContainer,
                {
                  opacity: itemOpacity,
                  height: bottomTextContainerHeight,
                },
              ]}>
              {isExerciseCompleted && (
                <Fragment>
                  <RequirementIcon style={styles.tickIcon} name="Tick" />
                  <RegularText style={[styles.text, styles.completed]}>
                    COMPLETED
                  </RegularText>
                </Fragment>
              )}
              {exerciseStep.rest && !isExerciseCompleted && (
                <Fragment>
                  <RegularText style={styles.restText}>
                    Take a deep breath and get ready
                  </RegularText>
                  <RegularText style={styles.restText}>
                    for the next set
                  </RegularText>
                </Fragment>
              )}
            </Animated.View>
          </View>
        </Animated.View>
        {Layout.isIOS ? (
          <NativeSoundPlayer
            key={audioUrl}
            playAudio={playAudio}
            audioUrl={audioUrl}
            onEndSound={onEndSound}
          />
        ) : (
          <SoundPlayer
            key={audioUrl}
            playAudio={playAudio}
            audioUrl={audioUrl}
            onEndSound={onEndSound}
          />
        )}
      </View>
    </BottomBarTemplate>
  );
};

TimerOverlay.propTypes = {
  exerciseStep: PropTypes.any.isRequired,
  onFinishExerciseStep: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  submitting: PropTypes.bool.isRequired,
  playAudio: PropTypes.bool.isRequired,
  audioUrl: PropTypes.any.isRequired,
  isExerciseCompleted: PropTypes.bool,
  onPlaySound: PropTypes.func.isRequired,
  onEndSound: PropTypes.func.isRequired,
  onStopTimer: PropTypes.func.isRequired,
  onCloseTimer: PropTypes.func.isRequired,
  onResetTimer: PropTypes.func.isRequired,
  onRef: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonAction: PropTypes.func.isRequired,
  buttonColor: PropTypes.string.isRequired,
  buttonTextColor: PropTypes.string.isRequired,
  height: PropTypes.any.isRequired,
  titleContainerHeight: PropTypes.any.isRequired,
  itemOpacity: PropTypes.any.isRequired,
  actionContainerHeight: PropTypes.any.isRequired,
  actionContainerPadding: PropTypes.any.isRequired,
  timeContainerLeft: PropTypes.any.isRequired,
  bottomTextContainerHeight: PropTypes.any.isRequired,
  closeContainerLeft: PropTypes.any.isRequired,
  closeActionWidth: PropTypes.any.isRequired,
  closeActionOpacity: PropTypes.any.isRequired,
  canStart: PropTypes.bool,
  bottomButton: PropTypes.any,
};

TimerOverlay.defaultProps = {
  isExerciseCompleted: false,
  canStart: false,
  bottomButton: null,
};

export default TimerOverlayAnimationsHOC(TimerOverlayHOC(TimerOverlay));

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  childrenContainer: {
    flex: 1,
  },
  timerBoxContainer: {
    position: 'absolute',
    bottom: 0,
    width: Layout.window.width,
    backgroundColor: Colors.gray3,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: Layout.padding,
    paddingRight: Layout.padding,
    overflow: 'hidden',
  },
  hideTimerBoxContainer: {
    position: 'relative',
    display: 'none',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  setsTextContainer: {
    marginTop: 7,
  },
  setsText: {
    color: Colors.silver,
    fontSize: 24,
    textAlign: 'center',
  },
  timerContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  restText: {
    color: Colors.silver,
    fontSize: 18,
    textAlign: 'center',
  },
  text: {
    color: Colors.silver,
    fontSize: 24,
    textAlign: 'center',
  },
  completed: {
    color: Colors.green,
  },
  tickIcon: {
    marginTop: 64,
    width: 64,
    height: 64,
  },
});
