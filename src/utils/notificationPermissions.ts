import notifee, {AuthorizationStatus} from '@notifee/react-native';
import {Alert} from 'react-native';

export const requestNotificationPermission = async () => {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
    Alert.alert(
      'Notifications Disabled',
      'Enable notifications in Settings to receive order updates.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Settings', onPress: () => notifee.openNotificationSettings()},
      ],
    );
    return false;
  }

  return settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED;
};

export const checkNotificationPermission = async () => {
  const settings = await notifee.getNotificationSettings();
  return settings.authorizationStatus === AuthorizationStatus.AUTHORIZED;
};
