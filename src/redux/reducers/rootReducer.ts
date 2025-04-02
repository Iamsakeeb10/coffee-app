import {combineReducers} from 'redux';
import authReducer from '../slices/authSlice';
import onboardingReducer from '../slices/onboardingSlice';
import store from '../store/store';

const rootReducer = combineReducers({
  onboarding: onboardingReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default rootReducer;
