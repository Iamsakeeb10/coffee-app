import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LanguageState} from '../../types/Profile/LanguageBottomSheet.type';

const initialState: LanguageState = {
  current: 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.current = action.payload;
    },
  },
});

export const {setLanguage} = languageSlice.actions;
export default languageSlice.reducer;
