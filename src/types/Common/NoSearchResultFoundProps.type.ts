import {TextStyle, ViewStyle} from 'react-native';

export interface NoSearchResultFoundProps {
  message?: string;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  containerStyle?: ViewStyle;
  messageStyle?: TextStyle;
}
