import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import BackgroundTimer from 'react-native-background-timer';

const TIMER_DURATION_INTERVAL = 1000;

const TimerHOCWrapper = (InnerComponent) => {
  class TimerHOC extends Component {
    state = {
      start: new Date().getTime(),
      now: new Date().getTime(),
      timer: new Date().getTime(),
      rest: false,
      running: false,
      isInitOfExercise: true,
      countdown: false,
    };

    componentDidMount = async () => {
      this.props.onRef(this);
    };

    componentWillUnmount() {
      this.props.onRef(undefined);
      this.disableTimer();
    }

    disableTimer = () => {
      BackgroundTimer.stopBackgroundTimer();
    };

    resetTimer = () => {
      const {exerciseStep} = this.state;
      this.initTimer(exerciseStep);
    };

    startTimer = () => {
      this.setState({running: true});
    };

    stopTimer = () => {
      this.setState({running: false});
    };

    getCurrentTimeSpent = () => {
      const {timer, start} = this.state;

      return timer - start;
    };

    enableTimer = () => {
      BackgroundTimer.runBackgroundTimer(() => {
        const {onFinishExerciseStep, onPlaySound} = this.props;
        const {start, now, timer, running, countdown} = this.state;

        this.setState(
          {
            now: new Date().getTime(),
          },
          () => {
            let interval = 0;

            if (!countdown) {
              interval = new Date().getTime() - now;
            } else {
              // Commented for now
              // Play sound on handleStartTime instead here
              // Issue showing of timer is not consistent
              // const seconds = moment.duration(timer - start).seconds();
              // const minutes = moment.duration(timer - start).minutes();
              interval = now - new Date().getTime();
              // if (minutes === 0 && seconds === limit) {
              //   onPlaySound(true);
              // }

              // Before gets negative
              if (timer - start < -2 * interval) {
                onPlaySound();
                onFinishExerciseStep();
              }
            }

            if (running) {
              this.setState({
                timer: timer + interval,
              });
            }
          },
        );
      }, TIMER_DURATION_INTERVAL);
    };

    initTimer = (exerciseStep) => {
      const {onPlaySound} = this.props;
      const {now} = this.state;
      const {index, rest, duration} = exerciseStep;

      let contudownTime = null;

      if (duration) {
        contudownTime = moment(now)
          .subtract(duration + 0.99 || 30, 'seconds')
          .valueOf();
      }

      this.setState(
        {
          start: contudownTime ? contudownTime : now,
          now,
          timer: now,
          countdown: !!duration,
          rest,
          isInitOfExercise: index === 0,
          exerciseStep,
        },
        () => {
          if (index !== 0) {
            onPlaySound();
          }
        },
      );
    };

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  TimerHOC.propTypes = {
    onRef: PropTypes.any.isRequired,
    onPlaySound: PropTypes.func.isRequired,
    onFinishExerciseStep: PropTypes.func.isRequired,
  };

  return TimerHOC;
};

export default TimerHOCWrapper;
