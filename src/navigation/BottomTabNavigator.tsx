// BottomTabNavigator.tsx - Modified version
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

import {useTheme} from '../hooks/useTheme';
import {useTranslation} from '../i18n/useTranslations';
import {RootState} from '../redux/store/store';
import CartScreen from '../screens/Coffee/CartScreen';
import CoffeeScreen from '../screens/Coffee/CoffeeScreen';
import FavoritesScreen from '../screens/Coffee/FavoriteScreen';
import styles from '../styles/bottomtabStyles';
import {getIconName} from '../utils/helpers';
import {fontFamily} from '../utils/typography';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const {items} = useSelector((state: RootState) => state.cart);
  const {t} = useTranslation();
  const {colors, isDarkMode} = useTheme();

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.accentCircle,
        tabBarInactiveTintColor: colors.gray400,
        tabBarStyle: {
          backgroundColor: colors.backgroundDefault,
          borderTopWidth: 0,
          elevation: !isDarkMode ? 0 : 8,
        },
        tabBarIcon: ({color, size, focused}) => {
          const iconName = getIconName(route.name, focused);

          const icon = <Ionicons name={iconName} size={size} color={color} />;

          if (route.name === 'Cart' && totalQuantity > 0) {
            return (
              <View>
                {icon}
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: colors.accentBadge,
                    },
                  ]}>
                  <Text style={[styles.badgeText, {color: colors.white}]}>
                    {totalQuantity}
                  </Text>
                </View>
              </View>
            );
          }

          return icon;
        },
      })}>
      <Tab.Screen name="Coffee" component={CoffeeScreen} />
      <Tab.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{
          headerShown: true,
          headerTitle: t('product.favorites'),
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.backgroundDefault,
          },
          headerTitleStyle: {
            color: colors.textPrimary,
            fontFamily: fontFamily.medium,
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: true,
          headerTitle: t('product.cart'),
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.backgroundDefault,
          },
          headerTitleStyle: {
            color: colors.textPrimary,
            fontFamily: fontFamily.medium,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
