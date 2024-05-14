import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//
//import { HomeScreen } from "../screens/HomeScreen";

import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import CustomizeScreen from '../screens/CustomizeScreen';
import ItemScreen from '../screens/ItemScreen';
import PackageScreen from "../screens/PackageScreen";
import DetailScreen from "../screens/DetailScreen";
import ChooseServiceScreen from "../screens/ChooseServiceScreen"
import DestinationScreen from "../screens/DestinationScreen"
import CartScreen from "../screens/CartScreen"


const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Discover" component={DiscoverScreen} />
          <Stack.Screen name="Customize" component={CustomizeScreen} />
          <Stack.Screen name="Choose Service" component={ChooseServiceScreen} />
          <Stack.Screen name="Destination" component={DestinationScreen} />
          <Stack.Screen name="Item" component={ItemScreen} />
          <Stack.Screen name="Package" component={PackageScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
  );
};