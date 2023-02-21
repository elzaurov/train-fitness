import {storage} from '../config';
import ImageCropPicker from 'react-native-image-crop-picker';

const createFileRecord = ({file, path, fileName}) =>
  new Promise((resolve, reject) => {
    const fileMetadata = {
      contentType: file.mime,
    };

    storage
      .ref(`app-images/${path}${path ? '/' : ''}${fileName}`)
      .putFile(file.path, fileMetadata)
      .on(
        'state_changed',
        () => {},
        (error) => {
          reject(error);
        },
        async (snap) => {
          const downloadURL = await snap.ref.getDownloadURL();
          const fileUrl = downloadURL;
          resolve(fileUrl);
        },
      );
  });

export const uploadFileToFirebase = ({
  file,
  path = '',
  fileName = 'image.jpeg',
}) =>
  new Promise((resolve) => {
    createFileRecord({file, path, fileName})
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.error(error);
      });
  });

export const uploadFileToDevice = (imagePickerOptions) =>
  new Promise(async (resolve) => {
    try {
      const file = await ImageCropPicker.openPicker(imagePickerOptions);
      resolve({localSource: file.path, file});
    } catch (error) {
      // errorHandler(error);
    }
  });
