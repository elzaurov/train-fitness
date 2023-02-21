import React from 'react';
import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';

const WebviewPlayer = ({uri, ...rest}) => (
  <WebView
    javaScriptEnabled={true}
    domStorageEnabled={true}
    source={{uri}}
    {...rest}
  />
);

WebviewPlayer.propTypes = {
  uri: PropTypes.string.isRequired,
};

export default WebviewPlayer;
