import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//
//import { HomeScreen } from "../screens/HomeScreen";

import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import ItemScreen from '../screens/ItemScreen';

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Discover" component={DiscoverScreen} />
      <Stack.Screen name="Item" component={ItemScreen} />
    </Stack.Navigator>
  );
};