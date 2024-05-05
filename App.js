import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getApp, getApps, initializeApp, deleteApp } from "firebase/app";
import { ref, get, getDatabase, set, remove } from "firebase/database";

import { auth, storage, firebaseApp } from './src/services/firebaseService';
import { getAllTours, getTourById } from './src/services/firebase/tours';

import HomeScreen from './src/screens/HomeScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import ItemScreen from './src/screens/ItemScreen';

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

  // getAllTours()

  getTourById(2)
  .then(tour => {
    console.log("Tour: ", tour);
  })
  .catch(error => {
    console.error("Error:", error);
  });

  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Discover" component={DiscoverScreen} />
          <Stack.Screen name="Item" component={ItemScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}
