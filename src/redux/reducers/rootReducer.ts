import {combineReducers} from 'redux';
import authReducer from '../slices/authSlice';
import cartReducer from '../slices/cartSlice';
import favoritesReducer from '../slices/favoritesSlice';
import languageReducer from '../slices/languageSlice';
import onboardingReducer from '../slices/onboardingSlice';
import themeReducer from '../slices/themeSlice';
import store from '../store/store';

const rootReducer = combineReducers({
  onboarding: onboardingReducer,
  auth: authReducer,
  favorites: favoritesReducer,
  cart: cartReducer,
  language: languageReducer,
  theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default rootReducer;
