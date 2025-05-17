// src/redux/themeSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Appearance} from 'react-native';
import {RootState} from '../store/store';

type ThemeMode = 'auto' | 'light' | 'dark';
type SystemTheme = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
  systemTheme: SystemTheme;
}

const initialState: ThemeState = {
  mode: 'dark', // 'auto', 'light', or 'dark'
  systemTheme: (Appearance.getColorScheme() as SystemTheme) || 'light', // 'light' or 'dark'
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
    setSystemTheme: (state, action: PayloadAction<SystemTheme>) => {
      state.systemTheme = action.payload;
    },
    resetTheme: state => {
      state.mode = 'auto';
    },
  },
});

export const {setThemeMode, setSystemTheme, resetTheme} = themeSlice.actions;

export const selectActiveTheme = (state: RootState): SystemTheme => {
  if (state.theme.mode === 'auto') {
    return state.theme.systemTheme;
  }
  return state.theme.mode as SystemTheme;
};

export default themeSlice.reducer;
