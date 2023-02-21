import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Animated, Easing, Dimensions, StyleSheet} from 'react-native';

class SlidingAnimation extends Component {
  state = {
    isAnimating: false,
    slideOffset: 0,
    newChildren: null,
    oldChildren: null,
  };

  UNSAFE_componentWillReceiveProps({children}) {
    let slideOffset;

    if (children.key > this.props.children.key) {
      // slide left
      slideOffset = -Dimensions.get('window').width;
    } else if (children.key < this.props.children.key) {
      // slide right
      slideOffset = Dimensions.get('window').width;
    }

    if (slideOffset) {
      this.setState(
        {
          slideAnim: new Animated.Value(0),
          slideOffset,
          isAnimating: true,
          newChildren: children,
          oldChildren: this.props.children,
        },
        () => {
          Animated.timing(this.state.slideAnim, {
            toValue: slideOffset,
            duration: this.props.duration,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }).start(() =>
            this.setState({
              isAnimating: false,
              slideOffset: 0,
              newChildren: null,
              oldChildren: null,
            }),
          );
        },
      );
    }
  }

  render() {
    let child;
    const slideDirection = this.state.slideOffset > 0 ? 'left' : 'right';

    const children = [this.state.oldChildren, this.state.newChildren];

    if (slideDirection === 'left') {
      children.reverse();
    }

    if (this.state.isAnimating) {
      child = (
        <Animated.View
          style={[
            styles.container,
            {
              marginLeft:
                slideDirection === 'right' ? 0 : -1 * this.state.slideOffset,
              transform: [
                {
                  translateX: this.state.slideAnim,
                },
              ],
            },
          ]}>
          {children}
        </Animated.View>
      );
    } else {
      child = this.props.children;
    }

    return child;
  }
}

SlidingAnimation.propTypes = {
  children: PropTypes.node.isRequired,
  duration: PropTypes.number,
};

SlidingAnimation.defaultProps = {
  duration: 350,
};

export default SlidingAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '200%',
    flexDirection: 'row',
  },
});
