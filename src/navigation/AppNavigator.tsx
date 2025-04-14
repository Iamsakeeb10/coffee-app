import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CoffeeDetailScreen from '../screens/Coffee/CoffeeDetailScreen';

import {RootStackParamList} from '../types/types';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="CoffeeScreen" component={CoffeeScreen} /> */}
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="CoffeeDetailScreen" component={CoffeeDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
