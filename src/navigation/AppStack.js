import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//
//import { HomeScreen } from "../screens/HomeScreen";

import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import ItemScreen from '../screens/ItemScreen';
import PackageScreen from "../screens/PackageScreen";
import DetailScreen from "../screens/DetailScreen";


const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Discover" component={DiscoverScreen} />
          <Stack.Screen name="Item" component={ItemScreen} />
          <Stack.Screen name="Package" component={PackageScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
  );
};