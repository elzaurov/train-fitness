import React, {Component} from 'react';
import {Animated} from 'react-native';

export class Fade extends Component {
  componentDidMount() {
    this._visibility = new Animated.Value(this.props.visible ? 1 : 0);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.visible !== prevState.visible) {
      Animated.timing(this._visibility, {
        toValue: nextProps.visible ? 1 : 0,
        duration: 300,
      });

      return {visible: nextProps.visible};
    } else {
      return null;
    } // Triggers no change in the state
  }

  render() {
    const {visible, style, children, ...rest} = this.props;

    const containerStyle = {
      opacity: this._visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          scale: this._visibility.interpolate({
            inputRange: [0, 1],
            outputRange: [1.1, 1],
          }),
        },
      ],
    };

    const combinedStyle = [containerStyle, style];
    return (
      <Animated.View style={combinedStyle} {...rest}>
        {children}
      </Animated.View>
    );
  }
}
