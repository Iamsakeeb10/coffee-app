import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CoffeeScreen from '../screens/Coffee/CoffeeScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CoffeeScreen" component={CoffeeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
