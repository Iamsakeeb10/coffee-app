// BottomTabNavigator.tsx - Modified version
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

import {colors} from '../constants/colors';
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

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

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
          const iconName = getIconName(route.name, focused);

          const icon = <Ionicons name={iconName} size={size} color={color} />;

          if (route.name === 'Cart' && totalQuantity > 0) {
            return (
              <View>
                {icon}
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{totalQuantity}</Text>
                </View>
              </View>
            );
          }

          return icon;
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
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: true,
          headerTitle: 'Cart',
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
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
