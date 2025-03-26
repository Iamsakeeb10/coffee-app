import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import IntroScreen from '../screens/IntroScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="IntroScreen" component={IntroScreen} />
      {/* <Stack.Screen name="LoginScreen" component={LoginScreen} /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
