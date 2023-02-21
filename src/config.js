import fbDatabase from '@react-native-firebase/database';
import fbAuth from '@react-native-firebase/auth';
import fbAnalytics from '@react-native-firebase/analytics';
import fbCrashlytics from '@react-native-firebase/crashlytics';
import fbFunctions from '@react-native-firebase/functions';
import fbRemoteConfig from '@react-native-firebase/remote-config';
import fbStorage from '@react-native-firebase/storage';
import fbMessaging from '@react-native-firebase/messaging';
import fbInAppMessaging from '@react-native-firebase/in-app-messaging';

const base = {};

export const database = fbDatabase();
export const auth = fbAuth();
export const analytics = fbAnalytics();
export const crashlytics = fbCrashlytics();
export const functions = fbFunctions();
export const config = fbRemoteConfig();
export const storage = fbStorage();
export const messaging = fbMessaging();
export const inAppMessaging = fbInAppMessaging();
export const cloudFunctionsURL = `https://us-central1-train-effective-dev.cloudfunctions.net`;

const {uid} = auth.currentUser || {};
export const adminRef = `/authentication/admins/${uid}`;
export const plansRef = `/authentication/userOwned/userReadable/plan/${uid}`;
export const preferencesRef = `/authentication/userOwned/preferences/${uid}`;
export const profileRef = `/authentication/userOwned/profile/${uid}`;

export default base;
