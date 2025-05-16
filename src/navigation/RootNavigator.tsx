import {NavigationContainer} from '@react-navigation/native';

import React from 'react';
import {useSelector} from 'react-redux';
import useSyncFavorites from '../hooks/useSyncFavorites';
import {RootState} from '../redux/store/store';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const AuthGuard = () => {
  const {user} = useSelector((state: RootState) => state.auth);

  useSyncFavorites();

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AuthGuard;
