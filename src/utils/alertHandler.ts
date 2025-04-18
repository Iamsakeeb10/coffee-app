import {Alert} from 'react-native';

export const alertHandler = () => {
  Alert.alert(
    'Not Ready Yet...',
    "We're still putting the finishing touches on this. Stay tuned!",
    [{text: 'Alright'}],
  );
};

export const accountCreatedAlert = (navigation: any) => {
  Alert.alert(
    'Account Created',
    'Your account has been successfully created.',
    [
      {
        text: 'Go to Login',
        onPress: () => {
          navigation.navigate('LoginScreen');
        },
      },
      {
        text: 'Later',
      },
    ],
    {cancelable: false},
  );
};

export const showConfirmAlert = (
  title: string,
  message: string,
  onConfirm: () => void,
) => {
  Alert.alert(title, message, [
    {text: 'Cancel', style: 'cancel'},
    {
      text: 'Remove',
      style: 'destructive',
      onPress: onConfirm,
    },
  ]);
};
