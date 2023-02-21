import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {Alert} from 'react-native';
import {
  loadTimer,
  pauseTimer,
  startTimer,
  stopTimer,
  stopTimerInterval,
} from '../../../actions';

const TimerHOCWrapper = (InnerComponent) => {
  class TimerHOC extends Component {
    state = {
      dialogOpened: false,
    };

    componentDidMount() {
      const {scheduleId} = this.props;

      this.props.loadTimer(scheduleId).then((timer) => {
        if (timer.start) {
          this.props.startTimer(scheduleId);
        }
      });
    }

    componentWillUnmount() {
      this.props.stopTimerInterval();
    }

    handleStartTimer = () => {
      const {scheduleId} = this.props;

      this.props.startTimer(scheduleId);
    };

    handlePauseTimer = () => {
      this.props.pauseTimer();
    };

    handleStopTimerInterval = () => {
      const {hasUncheckedItems, t} = this.props;

      if (hasUncheckedItems) {
        Alert.alert(
          t('uncheckedAlert.title'),
          t('uncheckedAlert.message'),
          [
            {text: t('uncheckedAlert.buttons.cancel'), onPress: () => {}},
            {
              text: t('uncheckedAlert.buttons.ok'),
              onPress: () => this.handleConfirmStopTimerInterval(),
            },
          ],
          {cancelable: true},
        );
      } else {
        this.handleConfirmStopTimerInterval();
      }
    };

    handleConfirmStopTimerInterval = () => {
      this.props.onFinish();
    };

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onPauseTimer={this.handlePauseTimer}
          onStartTimer={this.handleStartTimer}
          onStopTimerInterval={this.handleStopTimerInterval}
        />
      );
    }
  }

  TimerHOC.propTypes = {
    hasUncheckedItems: PropTypes.bool.isRequired,
    scheduleId: PropTypes.string.isRequired,
    loadTimer: PropTypes.func.isRequired,
    onFinish: PropTypes.func.isRequired,
    pauseTimer: PropTypes.func.isRequired,
    startTimer: PropTypes.func.isRequired,
    stopTimer: PropTypes.func.isRequired,
    stopTimerInterval: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  const translatedTimer = TimerHOC;

  function mapStateToProps({timer}) {
    return {timer};
  }

  return connect(mapStateToProps, {
    loadTimer,
    pauseTimer,
    startTimer,
    stopTimer,
    stopTimerInterval,
  })(translatedTimer);
};

export default TimerHOCWrapper;
