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
