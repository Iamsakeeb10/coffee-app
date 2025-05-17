import {StyleProp, ViewStyle} from 'react-native';

export interface ThemeToggleProps {
  containerStyle?: StyleProp<ViewStyle>;
}

export type ThemeOption = 'auto' | 'dark' | 'light';

export interface ThemeOptionItem {
  value: ThemeOption;
  label: string;
  icon: string;
}
