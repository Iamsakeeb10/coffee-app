import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isOnboardingCompleted: false,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    completeOnboarding: state => {
      state.isOnboardingCompleted = true;
    },
    resetOnboarding: state => {
      state.isOnboardingCompleted = false;
    },
  },
});

export const {completeOnboarding, resetOnboarding} = onboardingSlice.actions;

export default onboardingSlice.reducer;
