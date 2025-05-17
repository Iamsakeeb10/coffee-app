import {NavigationContainer} from '@react-navigation/native';

import React from 'react';
import {useSelector} from 'react-redux';
import GlobalStatusBar from '../components/Common/GlobalStatusBar';
import useSyncCart from '../hooks/useSyncCart';
import useSyncFavorites from '../hooks/useSyncFavorites';
import {RootState} from '../redux/store/store';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const AuthGuard = () => {
  const {user} = useSelector((state: RootState) => state.auth);

  useSyncFavorites();
  useSyncCart();

  return (
    <NavigationContainer>
      <GlobalStatusBar />
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AuthGuard;
