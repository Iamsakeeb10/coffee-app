// helpers/profileImageHelpers.ts
import database from '@react-native-firebase/database';
import RNFS from 'react-native-fs';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {colors} from '../constants/colors';
import {showSnack} from '../utils/Snack';

export const captureImage = () =>
  launchCamera({
    mediaType: 'photo',
    quality: 0.3,
    maxWidth: 200,
    maxHeight: 200,
    includeBase64: true,
  });

export const selectFromGallery = () =>
  launchImageLibrary({
    mediaType: 'photo',
    quality: 0.3,
    maxWidth: 200,
    maxHeight: 200,
    includeBase64: true,
  });

export const processAndConvertToBase64 = async (
  uri: string,
): Promise<string> => {
  return await RNFS.readFile(uri, 'base64');
};

export const saveBase64ProfileImage = async (
  base64Image: string,
  userId: string,
): Promise<string> => {
  const dataUrl = `data:image/jpeg;base64,${base64Image}`;

  await database().ref(`users/${userId}/profileImage`).set(dataUrl);

  return dataUrl;
};

export const showError = (msg: string) => {
  showSnack(msg, {
    backgroundColor: colors.deepRed,
    textColor: colors.white,
  });
};

export const showSuccess = (msg: string) => {
  showSnack(msg, {
    backgroundColor: colors.background,
    textColor: colors.white,
  });
};
