import React, {Component} from 'react';
import {Alert} from 'react-native';
import {crashlytics} from '../../../config';

const CRASH_TAP_COUNT = 20;

const ForceCrashHOCWrapper = (InnerComponent) => {
  class ForceCrashHOC extends Component {
    state = {
      tapCount: 0,
    };

    handlePress = async () => {
      await this.setState((state) => ({
        tapCount: state.tapCount + 1,
      }));

      if (this.state.tapCount > CRASH_TAP_COUNT) {
        Alert.alert('Force crash?', 'This is for testing the crashlytics', [
          {
            text: 'No',
            onPress: () => {
              this.setState({tapCount: 0});
            },
          },
          {
            text: 'Yes',
            onPress: () => {
              crashlytics.crash();
            },
          },
        ]);
      }
    };

    render() {
      return (
        <InnerComponent
          {...this.props}
          {...this.state}
          onPress={this.handlePress}
        />
      );
    }
  }

  return ForceCrashHOC;
};

export default ForceCrashHOCWrapper;
