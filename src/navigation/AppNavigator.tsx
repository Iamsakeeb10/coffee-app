import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CoffeeDetailScreen from '../screens/Coffee/CoffeeDetailScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
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
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: 'Profile',
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
          headerLeft: ({tintColor}) => (
            <Ionicons
              name="chevron-back"
              size={26}
              color={tintColor}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
