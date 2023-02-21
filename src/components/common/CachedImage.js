/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React, {Component} from 'react';
import {View, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

export default class CachedImage extends Component {
  constructor(props) {
    super(props);

    // Temporally setted to TRUE
    // The react-native-fast-image project have a issue on Android for the onLoadEnd. It never gets called
    // https://github.com/DylanVann/react-native-fast-image/issues/208#issuecomment-503712233
    this.state = {loaded: true};
  }

  handleLoadEnd = () => {
    this.setState({loaded: true});
  };

  render() {
    return (
      <View>
        {!this.state.loaded && (
          <View
            style={[this.props.style, {backgroundColor: Colors.loadingOverlay}]}
          />
        )}
        <FastImage
          source={this.props.source}
          style={[
            this.props.style,
            this.state.loaded ? {} : {width: 0, height: 0},
          ]}
          onLoadEnd={() => this.handleLoadEnd()}
          resizeMode={this.props.resizeMode}
        />
      </View>
    );
  }
}

CachedImage.defaultProps = {
  resizeMode: 'contain',
  style: null,
};

CachedImage.propTypes = {
  source: PropTypes.shape({
    uri: PropTypes.string.isRequired,
  }).isRequired,
  style: PropTypes.any,
  resizeMode: PropTypes.string,
};
