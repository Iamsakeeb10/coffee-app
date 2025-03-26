import {Alert} from 'react-native';

export const alertHandler = () => {
  Alert.alert(
    'Not Ready Yet...',
    "We're still putting the finishing touches on this. Stay tuned!",
    [{text: 'Alright'}],
  );
};
