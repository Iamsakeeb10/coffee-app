import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/reducers/rootReducer';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import IntroScreen from '../screens/Intro/IntroScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  const isOnboardingCompleted = useSelector(
    (state: RootState) => state.onboarding.isOnboardingCompleted,
  );

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isOnboardingCompleted ? (
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
      ) : null}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
