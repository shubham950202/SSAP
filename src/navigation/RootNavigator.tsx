import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import AuthNavigator from './AuthNavigator';
import AppStackNavigator from './AppStackNavigator';

import {
  getSession,
} from '../services/auth/sessionService';

export default function RootNavigator() {
  const [loading, setLoading] =
    useState(true);

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const checkAuth =
    useCallback(async () => {
      const user =
        await getSession();

      setIsLoggedIn(!!user);
      setLoading(false);
    }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppStackNavigator
          onLogout={() =>
            setIsLoggedIn(false)
          }
        />
      ) : (
        <AuthNavigator
          onLogin={() =>
            setIsLoggedIn(true)
          }
        />
      )}
    </NavigationContainer>
  );
}
