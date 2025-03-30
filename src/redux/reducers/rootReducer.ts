import {combineReducers} from 'redux';
import onboardingReducer from '../slices/onboardingSlice';

const rootReducer = combineReducers({
  onboarding: onboardingReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
