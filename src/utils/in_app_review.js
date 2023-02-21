import Rate, {AndroidMarket} from 'react-native-rate';

export class InAppReview {
  static options = {
    preferInApp: true,
    openAppStoreIfInAppFails: false,
    AppleAppID: '1425844780',
    GooglePackageName: 'com.traineffective',
    preferredAndroidMarket: AndroidMarket.Google,
    fallbackPlatformURL: 'https://www.traineffective.com/app',
  };

  static async rate() {
    return new Promise((resolve, reject) => {
      Rate.rate(this.options, (success) => {
        if (success) {
          resolve();
        } else {
          reject();
        }
      });
    });
  }
}
