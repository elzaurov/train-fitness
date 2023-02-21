import React, {Component, Fragment} from 'react';
import {AppState, Alert} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import KeepAwake from 'react-native-keep-awake';
import PropTypes from 'prop-types';
import {CLOSED, Colors, OPENED, STOPPED} from '../../../constants';
import CountdownVoice from '../../../assets/sounds/counter.mp3';
import WellDoneVoice from '../../../assets/sounds/well-done.mp3';
import Whistle from '../../../assets/sounds/Referee_Whistle.mp3';

const TimerOverlayHOCWrapper = (InnerComponent) => {
  class TimerOverlayHOC extends Component {
    constructor(props) {
      super(props);
      this.goingToBack = false;
      this.timer = React.createRef();

      const exerciseSteps = this.generateExerciseSteps(props);

      this.state = {
        appState: AppState.currentState,
        exerciseStepIndex: 0,
        exerciseSteps,
        completedSets: [],
        timerState: CLOSED,
        buttonText: 'START',
        buttonAction: this.handleStartTimer,
        buttonDisable: false,
        isExerciseCompleted: false,
        playAudio: false,
        submitting: false,
        audioUrl: Whistle,
        hidePlayer: true,
      };
    }

    componentDidMount = () => {
      // AppState.addEventListener('change', this.stopTimer);
      this.timer.enableTimer();
      this.beforeRemoveSubscription = this.props.navigation.addListener(
        'beforeRemove',
        this.handleBack,
      );
      this.blurSubscription = this.props.navigation.addListener('blur', () => {
        this.beforeRemoveSubscription();
        this.blurSubscription();
      });
    };

    componentDidUpdate(prevProps, prevState) {
      if (prevState.timerState !== this.state.timerState) {
        this.props.onChangeState(this.state.timerState === OPENED);
      }
    }

    componentWillUnmount() {
      // AppState.removeEventListener('change', this.stopTimer);
      this.beforeRemoveSubscription();
      this.blurSubscription();
    }

    handleBack = (event) => {
      if (this.goingToBack) {
        return;
      }
      event.preventDefault();
      this.goingToBack = true;

      const title = 'Warning';
      const message = 'Do you really want to stop your training?';
      const options = {
        cancelable: true,
        onDismiss: () => {
          this.goingToBack = false;
        },
      };
      const buttons = [
        {
          text: "No, I'll keep going",
          onPress: () => {
            this.goingToBack = false;
          },
        },
        {
          text: 'Yes',
          onPress: () => {
            this.props.navigation.popToTop();
          },
        },
      ];
      Alert.alert(title, message, buttons, options);
    };

    handleFinishExerciseStep = (timeSpent) => {
      this.finishExerciseStep(timeSpent);
    };

    handleResetTimer = () => {
      this.timer.resetTimer();
    };

    handleStartTimer = () => {
      const {onUpdateLayoutAnimation, onPauseVideo} = this.props;
      const {exerciseSteps, exerciseStepIndex} = this.state;
      this.setState({timerState: OPENED}, () => {
        this.timer.initTimer(exerciseSteps[exerciseStepIndex]);
        onUpdateLayoutAnimation(OPENED);
        this.handlePlaySound(true);
        onPauseVideo(true);
        setTimeout(() => {
          this.timer?.startTimer();
        }, 1000);
      });
    };

    handleResumeTimer = () => {
      const {onUpdateLayoutAnimation} = this.props;
      this.setState({timerState: OPENED}, () => {
        onUpdateLayoutAnimation(OPENED);
        this.timer?.startTimer();
      });
    };

    handleStopTimer = () => {
      this.stopTimer();
    };

    handleCloseTimer = () => {
      const {onUpdateLayoutAnimation} = this.props;
      this.setState({timerState: CLOSED, exerciseStepIndex: 0}, () => {
        onUpdateLayoutAnimation(CLOSED);
      });
    };

    handlePlaySound = (countdown) => {
      this.setState({
        playAudio: true,
        audioUrl: countdown ? CountdownVoice : Whistle,
      });
    };

    handleEndSound = () => {
      this.setState({
        playAudio: false,
      });
    };

    stopTimer = () => {
      const {onUpdateLayoutAnimation} = this.props;
      const {exerciseStepIndex} = this.state;

      if (exerciseStepIndex !== 0 && this.timer) {
        this.setState({timerState: STOPPED}, () => {
          onUpdateLayoutAnimation(STOPPED);
          this.timer.stopTimer();
        });
      }
    };

    finishCrossTraining = () => {
      let {completedSets} = this.state;
      completedSets.push(this.timer.getCurrentTimeSpent());

      this.setState({completedSets}, () => {
        this.finishExercise();
      });
    };

    finishExercise = () => {
      this.setState(
        {
          submitting: true,
        },
        () => {
          const {onCompleteExercise} = this.props;
          const {completedSets} = this.state;

          const timeSpent = completedSets.reduce((a, b) => a + b, 0);
          this.timer ? this.timer.disableTimer() : null;
          onCompleteExercise(timeSpent);
        },
      );
    };

    finishExerciseStep = () => {
      const {exerciseSteps, exerciseStepIndex} = this.state;
      let {completedSets} = this.state;
      const exerciseDuration = exerciseSteps[exerciseStepIndex].duration * 1000;
      const timeSpent = this.timer.getCurrentTimeSpent();

      completedSets.push(
        exerciseDuration ? exerciseDuration - timeSpent : timeSpent,
      );

      const nextIndex =
        exerciseStepIndex + 1 >= exerciseSteps.length
          ? exerciseStepIndex
          : exerciseStepIndex + 1;

      this.setState(
        {
          exerciseStepIndex: nextIndex,
          completedSets,
          isExerciseCompleted: exerciseSteps[exerciseStepIndex].isLastSetRest,
        },
        () => {
          if (this.state.isExerciseCompleted) {
            this.setState({
              playAudio: true,
              audioUrl: WellDoneVoice,
            });
          } else {
            this.timer.initTimer(exerciseSteps[nextIndex]);
          }
        },
      );
    };

    generateExerciseSteps = ({
      currentExerciseIndex,
      lastExerciseIndex,
      exercise,
    }) => {
      const {category, type, stats, name, restDuration, duration} = exercise;
      const firstStep = {
        index: 0,
        rest: false,
        duration: 5,
        buttonAction: () => {},
        buttonText: 'NEXT SET',
        buttonDisabled: true,
        reloadDisabled: true,
        pauseDisabled: true,
        title: '',
      };

      let exerciseSteps = [firstStep];

      if (
        category === 'cross-training' ||
        type === 'cross-training' ||
        category === 'team' ||
        type === 'team'
      ) {
        exerciseSteps.push({
          index: 1,
          rest: false,
          name: name.toUpperCase(),
          buttonAction: this.finishCrossTraining,
          buttonText: 'DONE',
          buttonDisabled: false,
          reloadDisabled: false,
          pauseDisabled: false,
          title: '',
        });
      } else {
        const isCoolDown =
          name.toUpperCase().split(' ').join('_') === 'COOL_DOWN';
        if (isCoolDown) {
          exerciseSteps.push({
            index: 1,
            duration,
            rest: false,
            isLastSetRest: false,
            title: name.toUpperCase(),
            buttonText: 'FINISH',
            buttonAction: this.finishExercise,
            buttonDisabled: false,
            reloadDisabled: false,
            pauseDisabled: false,
          });
        } else {
          for (let i = 1; i <= stats.sets * 2; i++) {
            const isRest = i % 2 === 0;
            const isLastSet = i === stats.sets * 2;
            const buttonText = isLastSet
              ? currentExerciseIndex === lastExerciseIndex
                ? 'FINISH'
                : 'NEXT EXERCISE'
              : isRest
              ? 'NEXT SET'
              : 'DONE';

            exerciseSteps.push({
              index: i,
              name:
                isRest && !(isLastSet && isRest)
                  ? 'REST FOR'
                  : name.toUpperCase(),
              rest: isRest,
              duration: isRest ? restDuration || 30 : duration,
              isLastSetRest: isLastSet && isRest,
              buttonAction: isLastSet
                ? this.finishExercise
                : this.finishExerciseStep,
              buttonText: buttonText,
              buttonDisabled: false,
              reloadDisabled: isRest,
              pauseDisabled: false,
              title: `SET ${Math.floor((i + 1) / 2)}/${stats.sets}`,
            });
          }
        }
      }
      return exerciseSteps;
    };

    getButtonTextColorAndAction = () => {
      const {timerState, exerciseSteps, exerciseStepIndex} = this.state;
      const exerciseStep = exerciseSteps[exerciseStepIndex];
      let buttonText;
      let buttonAction;
      let buttonColor;
      let buttonTextColor;

      switch (timerState) {
        case CLOSED:
          buttonText = 'START';
          buttonAction = this.handleStartTimer;
          buttonColor = Colors.secondary2;
          buttonTextColor = Colors.white;
          break;
        case STOPPED:
          buttonText = 'RESUME';
          buttonAction = this.handleResumeTimer;
          buttonColor = Colors.secondary2;
          buttonTextColor = Colors.white;
          break;
        default:
          buttonText = exerciseStep.buttonText;
          buttonAction = exerciseStep.buttonAction;
          buttonColor = exerciseStep.buttonDisabled
            ? Colors.background2
            : Colors.secondary2;
          buttonTextColor = exerciseStep.buttonDisabled
            ? Colors.dustyGray
            : Colors.white;
          break;
      }

      return {buttonText, buttonAction, buttonColor, buttonTextColor};
    };

    render() {
      const {exerciseSteps, exerciseStepIndex} = this.state;
      const {
        buttonText,
        buttonAction,
        buttonColor,
        buttonTextColor,
      } = this.getButtonTextColorAndAction();

      return (
        <Fragment>
          <KeepAwake />
          <InnerComponent
            {...this.state}
            {...this.props}
            onRef={(ref) => (this.timer = ref)}
            exerciseStep={exerciseSteps[exerciseStepIndex]}
            buttonText={buttonText}
            buttonAction={buttonAction}
            buttonColor={buttonColor}
            buttonTextColor={buttonTextColor}
            onPlaySound={this.handlePlaySound}
            onEndSound={this.handleEndSound}
            onStartTimer={this.handleStartTimer}
            onResumeTimer={this.handleResumeTimer}
            onStopTimer={this.handleStopTimer}
            onCloseTimer={this.handleCloseTimer}
            onResetTimer={this.handleResetTimer}
            onFinishExerciseStep={this.handleFinishExerciseStep}
          />
        </Fragment>
      );
    }
  }

  TimerOverlayHOC.propTypes = {
    lastExerciseIndex: PropTypes.any.isRequired,
    currentExerciseIndex: PropTypes.any.isRequired,
    exercise: PropTypes.any.isRequired,
    navigation: PropTypes.object.isRequired,
    onChangeState: PropTypes.func,
    onUpdateLayoutAnimation: PropTypes.func,
    onCompleteExercise: PropTypes.func,
    onPauseVideo: PropTypes.func,
  };

  TimerOverlayHOC.defaultProps = {
    onPauseVideo: (isPaused = false) => null,
    onCompleteExercise: null,
    onChangeState: () => null,
    onUpdateLayoutAnimation: () => null,
  };

  return withNavigation(TimerOverlayHOC);
};

export default TimerOverlayHOCWrapper;
