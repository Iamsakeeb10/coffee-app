import Snackbar from 'react-native-snackbar';
import {fontFamily} from './typography';

export const showSnack = (
  message: string,
  options?: {
    duration?: number;
    actionText?: string;
    actionColor?: string;
    onActionPress?: () => void;
    backgroundColor?: string;
    textColor?: string;
    marginBottom?: number;
  },
) => {
  Snackbar.show({
    text: message,
    duration: options?.duration || Snackbar.LENGTH_SHORT,
    fontFamily: fontFamily.medium,
    backgroundColor: options?.backgroundColor,
    textColor: options?.textColor,
    marginBottom: options?.marginBottom,
    action: options?.actionText
      ? {
          text: options.actionText,
          textColor: options.actionColor || 'white',
          onPress: options.onActionPress || (() => {}),
        }
      : undefined,
  });
};

export const dismissSnack = () => {
  Snackbar.dismiss();
};
