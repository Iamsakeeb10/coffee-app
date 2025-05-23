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
