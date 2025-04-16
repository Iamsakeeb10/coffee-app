import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '../constants/colors';
import CartScreen from '../screens/Coffee/CartScreen';
import CoffeeScreen from '../screens/Coffee/CoffeeScreen';
import FavoritesScreen from '../screens/Coffee/FavoriteScreen';
import {fontFamily} from '../utils/typography';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
        },
        tabBarIcon: ({color, size, focused}) => {
          let iconName = '';

          if (route.name === 'Coffee') {
            iconName = focused ? 'cafe' : 'cafe-outline';
          } else if (route.name === 'FavoritesScreen') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: colors.circle,
        tabBarInactiveTintColor: colors.tabIcon,
      })}>
      <Tab.Screen name="Coffee" component={CoffeeScreen} />
      <Tab.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{
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
        }}
      />

      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
