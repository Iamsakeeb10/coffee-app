import {colors} from '../constants/colors';
import {fontFamily} from './typography';

export const favoriteScreenHeaderOptions = {
  headerShown: true,
  headerTitle: 'Favorites',
  headerTitleAlign: 'center',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: colors.background,
  },
  headerTitleStyle: {
    color: colors.white,
    fontFamily: fontFamily.medium,
  },
};

export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  PAYPAL: 'paypal',
  APPLE_PAY: 'apple_pay',
  GOOGLE_PAY: 'google_pay',
};

export const bangladeshRegion = {
  latitude: 23.685, // Approx center of Bangladesh
  longitude: 90.3563,
  latitudeDelta: 2.5, // Controls zoom level
  longitudeDelta: 2.5,
};
