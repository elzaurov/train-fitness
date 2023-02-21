import React from 'react';
import WebView from 'react-native-webview';
import {SafeAreaView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Colors} from '../../constants';

const WebViewScreen = () => {
  const route = useRoute();
  return (
      <SafeAreaView style={styles.container}>
        {route.params?.url && (
            <WebView tit source={{url: decodeURIComponent(route.params?.url)}} />
        )}
        {route.params?.params?.url && (
            <WebView tit source={{url: decodeURIComponent(route.params?.params?.url)}} />
        )}
      </SafeAreaView>
  );
};

export default WebViewScreen;

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
};
