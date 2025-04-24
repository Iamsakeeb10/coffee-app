import {PermissionsAndroid, Platform} from 'react-native';

export const requestAndroidPermission = async (
  type: 'camera' | 'gallery',
  setDeniedPermissions: React.Dispatch<
    React.SetStateAction<{camera: boolean; gallery: boolean}>
  >,
) => {
  try {
    let permission;

    if (type === 'camera') {
      permission = PermissionsAndroid.PERMISSIONS.CAMERA;
    } else {
      const androidVersion = Number(Platform.Version);
      permission =
        androidVersion >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    }

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      setDeniedPermissions(prev => ({...prev, [type]: false}));
      return true;
    }

    const granted = await PermissionsAndroid.request(permission);
    const isGranted = granted === PermissionsAndroid.RESULTS.GRANTED;

    if (!isGranted) {
      setDeniedPermissions(prev => ({...prev, [type]: true}));
    } else {
      setDeniedPermissions(prev => ({...prev, [type]: false}));
    }

    return isGranted;
  } catch (err) {
    console.warn(err);
    return false;
  }
};
