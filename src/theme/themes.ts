// theme/themes.ts
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme,
} from '@react-navigation/native';

export const LightTheme: Theme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: '#007074',
    background: '#ffffff',
    card: '#f8f8f8',
    text: '#000000',
    border: '#e0e0e0',
    notification: '#007074',
  },
};

export const DarkTheme: Theme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: '#0fbcf9',
    background: '#000000',
    card: '#1c1c1e',
    text: '#ffffff',
    border: '#272729',
    notification: '#0fbcf9',
  },
};
