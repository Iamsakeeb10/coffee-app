// src/components/ThemeProvider.tsx
import React, {useEffect} from 'react';
import {Appearance} from 'react-native';
import {useDispatch} from 'react-redux';
import {setSystemTheme} from '../redux/slices/themeSlice';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const dispatch = useDispatch();

  // Initialize the system theme on app start
  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    dispatch(setSystemTheme(colorScheme || 'light'));
  }, [dispatch]);

  return <>{children}</>;
};
