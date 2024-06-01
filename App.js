import React, {useEffect} from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getApps, initializeApp } from "firebase/app";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as customTheme } from "./customTheme.json";
import { MainNavigator } from "./src/navigation/MainNavigator";
import { AuthenticatedUserProvider } from "./src/providers";
// import firebase from "firebase"
// import {Permissions, Notifications} from "expo"

const Stack = createNativeStackNavigator();

export default function App() {
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