import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CoffeeDetailScreen from '../screens/Coffee/CoffeeDetail';
import CoffeeScreen from '../screens/Coffee/CoffeeScreen';

import {RootStackParamList} from '../types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CoffeeScreen" component={CoffeeScreen} />
      <Stack.Screen name="CoffeeDetailScreen" component={CoffeeDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
