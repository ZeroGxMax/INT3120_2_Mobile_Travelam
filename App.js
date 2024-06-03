import React, { useEffect, useRef, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getApps, initializeApp } from "firebase/app";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as customTheme } from "./customTheme.json";
import { MainNavigator } from "./src/navigation/MainNavigator";
import { AuthenticatedUserProvider } from "./src/providers";
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync, schedulePushNotification } from './src/services/notificationService';

// import firebase from "firebase"
// import {Permissions, Notifications} from "expo"

const Stack = createNativeStackNavigator();

export default function App() {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const isFirebaseInitialized = () => {
    const firebaseApps = getApps();
    return firebaseApps.length > 0;
  };

  if (!isFirebaseInitialized()) {
    initializeApp(firebaseConfig);
    console.log("Firebase initialized.");
  } else {
    console.log("Firebase is already initialized.");
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // useEffect(() => {
  //   const subscription = Notifications.addNotificationReceivedListener(notification => {
  //     console.log(notification);
  //   });
  //   return () => subscription.remove();
  // }, []);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...customTheme }}>
        <AuthenticatedUserProvider>
          <SafeAreaProvider>
            <MainNavigator />
          </SafeAreaProvider>
        </AuthenticatedUserProvider>
      </ApplicationProvider>
    </>
  );
}