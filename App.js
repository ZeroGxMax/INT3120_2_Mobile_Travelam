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
import { getApp, getApps, initializeApp, deleteApp } from "firebase/app";
import { ref, get, getDatabase, set, remove } from "firebase/database";

import { auth, storage, firebaseApp } from './src/services/firebaseService';
import { getAllTours, getTourById, getTour, getTourByCountryId } from './src/services/firebase/tours';
import { getCountryFromName } from './src/services/firebase/country';

import HomeScreen from './src/screens/HomeScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import ItemScreen from './src/screens/ItemScreen';
import PackageScreen from './src/screens/PackageScreen';
import DetailScreen from './src/screens/DetailScreen';

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

  // getCountryFromName("France")

  // getTourByCountryId(6)
  // .then(tour => {
  //   console.log("Tour: ", tour);
  // })
  // .catch(error => {
  //   console.error("Error:", error);
  // });

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
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Discover" component={DiscoverScreen} />
          <Stack.Screen name="Item" component={ItemScreen} />
          <Stack.Screen name="Package" component={PackageScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}
