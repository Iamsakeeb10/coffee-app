// src/hooks/useTheme.ts
import {useEffect} from 'react';
import {Appearance} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {darkColors, lightColors} from '../constants/colors';
import {selectActiveTheme, setSystemTheme} from '../redux/slices/themeSlice';
import {RootState} from '../redux/store/store';

export const useTheme = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const activeTheme = useSelector(selectActiveTheme);
  const colors = activeTheme === 'dark' ? darkColors : lightColors;

  // Set up listener for system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      dispatch(setSystemTheme(colorScheme || 'light'));
    });

    return () => {
      subscription.remove();
    };
  }, [dispatch]);

  return {
    isDarkMode: activeTheme === 'dark',
    themeMode,
    colors,
  };
};
