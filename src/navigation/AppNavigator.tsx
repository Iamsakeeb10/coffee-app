import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';
import CoffeeDetailScreen from '../screens/Coffee/CoffeeDetailScreen';

import {colors} from '../constants/colors';
import ProfileScreen from '../screens/Coffee/ProfileScreen';
import {RootStackParamList} from '../types/types';
import {fontFamily} from '../utils/typography';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="CoffeeDetailScreen" component={CoffeeDetailScreen} />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={() =>
          ({
            headerShown: false,
            headerTitle: '',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTitleStyle: {
              color: colors.white,
              fontFamily: fontFamily.medium,
            },
            headerTintColor: colors.white,
            headerLeft: () => '',
          } as NativeStackNavigationOptions)
        }
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
