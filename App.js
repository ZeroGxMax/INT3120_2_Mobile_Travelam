import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './FireBase';
import { getApp, getApps, initializeApp, deleteApp } from "firebase/app";

import HomeScreen from './screens/HomeScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import ItemScreen from './screens/ItemScreen';

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
