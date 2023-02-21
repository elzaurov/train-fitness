import React, {Component} from 'react';
import {Animated, Easing} from 'react-native';
import PropTypes from 'prop-types';
import {
  CLOSED,
  STOPPED,
  OPENED,
  ANIMATION_DURATION,
  VIDEO_OVERLAY_MAX_HEIGHT,
  OVERLAY_MAX_HEIGHT,
  OVERLAY_MEDIUM_HEIGHT,
  OVERLAY_MIN_HEIGHT,
  ACTION_CONTAINER_HEIGHT,
  ACTION_CONTAINER_PADDING,
  TITLE_CONTAINER_HEIGHT,
  TIME_CONTAINER_LEFT,
  TIME_TEXT_FONT_SIZE,
  CLOSE_CONTAINER_LEFT,
  CLOSE_ACTION_WIDTH,
  REST_TEXT_CONTAINER_HEIGHT,
} from '../../../constants';

const TimerOverlayAnimationsHOCWrapper = (InnerComponent) => {
  class TimerOverlayAnimationsHOC extends Component {
    constructor(props) {
      super(props);

      this.state = {
        timerState: CLOSED,
        height: new Animated.Value(OVERLAY_MIN_HEIGHT),
        actionContainerHeight: new Animated.Value(ACTION_CONTAINER_HEIGHT),
        actionContainerPadding: new Animated.Value(ACTION_CONTAINER_PADDING),
        titleContainerHeight: new Animated.Value(TITLE_CONTAINER_HEIGHT),
        timeContainerLeft: new Animated.Value(0),
        closeContainerLeft: new Animated.Value(0),
        closeActionWidth: new Animated.Value(0),
        closeActionOpacity: new Animated.Value(0),
        bottomTextContainerHeight: new Animated.Value(0),
        timeTextFontSize: new Animated.Value(TIME_TEXT_FONT_SIZE),
        itemOpacity: new Animated.Value(1),
      };
    }

    handleUpdateLayoutAnimation = (timerState) => {
      const {height} = this.state;

      let newHeight = null;

      switch (timerState) {
        case OPENED:
          newHeight = this.props.videoOverlay ? VIDEO_OVERLAY_MAX_HEIGHT : OVERLAY_MAX_HEIGHT;
          this.animateOpen();
          break;
        case STOPPED:
          newHeight = OVERLAY_MEDIUM_HEIGHT;
          this.animateStop();
          break;
        case CLOSED:
          this.animateClose();
          newHeight = OVERLAY_MIN_HEIGHT;
          break;
        default:
          newHeight = OVERLAY_MIN_HEIGHT;
          break;
      }

      this.animate(
        height,
        newHeight,
        timerState === CLOSED ? 150 : ANIMATION_DURATION,
      ).start();
    };

    animateOpen = () => {
      const {
        actionContainerHeight,
        actionContainerPadding,
        titleContainerHeight,
        timeTextFontSize,
        itemOpacity,
        timeContainerLeft,
        closeContainerLeft,
        closeActionWidth,
        closeActionOpacity,
        bottomTextContainerHeight,
      } = this.state;

      Animated.parallel([
        this.animate(actionContainerHeight, ACTION_CONTAINER_HEIGHT),
        this.animate(actionContainerPadding, ACTION_CONTAINER_PADDING),
        this.animate(itemOpacity, 1),
        this.animate(titleContainerHeight, TITLE_CONTAINER_HEIGHT),
        this.animate(timeTextFontSize, TIME_TEXT_FONT_SIZE),
        this.animate(timeContainerLeft, 0),
        this.animate(closeContainerLeft, 0),
        this.animate(closeActionWidth, 0),
        this.animate(closeActionOpacity, 0),
        this.animate(bottomTextContainerHeight, REST_TEXT_CONTAINER_HEIGHT),
      ]).start();
    };

    animateStop = () => {
      const {
        actionContainerHeight,
        actionContainerPadding,
        itemOpacity,
        titleContainerHeight,
        timeTextFontSize,
        timeContainerLeft,
        closeContainerLeft,
        closeActionWidth,
        closeActionOpacity,
        bottomTextContainerHeight,
      } = this.state;

      Animated.parallel([
        this.animate(actionContainerHeight, 0),
        this.animate(actionContainerPadding, 0),
        this.animate(itemOpacity, 0),
        this.animate(titleContainerHeight, 0),
        this.animate(timeTextFontSize, TIME_TEXT_FONT_SIZE - 30),
        this.animate(timeContainerLeft, TIME_CONTAINER_LEFT),
        this.animate(closeContainerLeft, CLOSE_CONTAINER_LEFT),
        this.animate(closeActionWidth, CLOSE_ACTION_WIDTH),
        this.animate(closeActionOpacity, 1),
        this.animate(bottomTextContainerHeight, 0),
      ]).start();
    };

    animateClose = () => {
      const {closeActionWidth, closeActionOpacity} = this.state;

      Animated.parallel([
        this.animate(closeActionWidth, 0),
        this.animate(closeActionOpacity, 0),
      ]).start();
    };

    animate = (fromValue, toValue, duration?) => {
      return Animated.timing(fromValue, {
        toValue: toValue,
        useNativeDriver: false,
        duration: duration ? duration : ANIMATION_DURATION,
        easing: Easing.linear,
      });
    };

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onUpdateLayoutAnimation={this.handleUpdateLayoutAnimation}
        />
      );
    }
  }

  TimerOverlayAnimationsHOC.propTypes = {
    videoOverlay: PropTypes.bool,
    timerState: PropTypes.string,
    onUpdateLayoutAnimation: PropTypes.func,
  };

  TimerOverlayAnimationsHOC.defaultProps = {
    videoOverlay: false,
    timerState: null,
    onUpdateLayoutAnimation: () => null,
  };

  return TimerOverlayAnimationsHOC;
};

export default TimerOverlayAnimationsHOCWrapper;
