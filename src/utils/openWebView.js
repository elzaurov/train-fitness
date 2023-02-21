import {Platform, Linking} from 'react-native';
import SafariView from 'react-native-safari-view';

export default (url) => {
  if (Platform.OS === 'ios') {
    SafariView.show({
      url: url,
    });
  } else {
    Linking.openURL(url);
  }
};
