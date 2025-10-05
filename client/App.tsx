import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  auth,
  checkInitialNotification,
  getFCMToken,
  listenForegroundMessages,
  onAuthStateChanged,
  requestUserPermission,
} from './firebase.config';
import linking from './src/linking';
import AuthNavigator from './src/router/AuthNavigator';
import MainNavigator from './src/router/MainNavigator';
import SplashScreen from './src/screens/SplashScreen';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isWellcome, setIsWellcome] = useState(false);

  useEffect(() => {
    async function initMessaging() {
      const granted = await requestUserPermission();
      if (granted) {
        await getFCMToken();
      }
      listenForegroundMessages();
      checkInitialNotification();
    }

    initMessaging();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsWellcome(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    });
  }, [isLoading]);

  return (
    <NavigationContainer linking={linking}>
      {isWellcome ? (
        <SplashScreen />
      ) : isLoading ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default App;
