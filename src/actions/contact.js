import {functions, auth} from '../config';
import {handleError} from './error';
import DeviceInfo from 'react-native-device-info';

export const contactSend = ({title, description}) => async () => {
  const contactSendCallable = functions.httpsCallable('sendContactEmail');
  const {uid, displayName, email} = auth.currentUser;
  const [
    deviceName,
    systemName,
    systemVersion,
    appVersion,
  ] = await Promise.all([
    DeviceInfo.getDeviceName(),
    DeviceInfo.getSystemName(),
    DeviceInfo.getSystemVersion(),
    DeviceInfo.getVersion(),
  ]);

  try {
    await contactSendCallable({
      title,
      description,
      user: {uid, displayName, email},
      device: {deviceName, systemName, systemVersion, appVersion},
    });
  } catch (error) {
    handleError(error);
  }
};
