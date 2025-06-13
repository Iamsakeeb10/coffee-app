import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CoffeeDetailScreen from '../screens/Coffee/CoffeeDetailScreen';

import CheckoutScreen from '../screens/Checkout/CheckoutScreen';
import OrderSuccessScreen from '../screens/Checkout/OrderSuccessScreen';
import ProfileScreen from '../screens/Coffee/ProfileScreen';
import ThemeScreen from '../screens/Theme/ThemeScreen';
import {RootStackParamList} from '../types/types';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="CoffeeDetailScreen" component={CoffeeDetailScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ThemeScreen" component={ThemeScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="OrderSuccessScreen" component={OrderSuccessScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
