import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';

import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {clearUser, setUser} from '../redux/slices/authSlice';
import {RootState} from '../redux/store/store';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const AuthGuard = () => {
  const {user} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            emailVerified: user.emailVerified,
          }),
        );
      } else {
        dispatch(clearUser());
      }

      return () => unsubscribe();
    });
  }, [dispatch]);

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AuthGuard;
