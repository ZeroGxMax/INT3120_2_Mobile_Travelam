import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getApps } from "firebase/app";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as customTheme } from "./customTheme.json";
import { MainNavigator } from "./src/navigation/MainNavigator";
import { AuthenticatedUserProvider } from "./src/providers";
import { MainDrawer } from "./src/navigation/MainDrawer"

const Stack = createNativeStackNavigator();

export default function App() {
  const isFirebaseInitialized = () => {
    const firebaseApps = getApps();
    return firebaseApps.length > 0;
  };

  // Usage
  if (isFirebaseInitialized()) {
    console.log("Firebase is initialized.");
  } else {
    console.log("Firebase is not initialized.");
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