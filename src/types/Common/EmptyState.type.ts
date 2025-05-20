import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface EmptyStateProps {
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  title?: string;
  subtitle?: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  iconStyle?: {
    size?: number;
    color?: string;
  };
}
