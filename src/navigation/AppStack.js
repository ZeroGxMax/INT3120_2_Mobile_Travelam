import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import CustomizeScreen from '../screens/CustomizeScreen';
import ItemScreen from '../screens/ItemScreen';
import PackageScreen from "../screens/PackageScreen";
import DetailScreen from "../screens/DetailScreen";
import ChooseServiceScreen from "../screens/ChooseServiceScreen"
import DestinationScreen from "../screens/DestinationScreen"
import CartScreen from "../screens/CartScreen"
import OptionsScreen from "../screens/OptionsScreen"
import ProfileScreen from "../screens/ProfileScreen";
import TourHistoryScreen from "../screens/TourHistoryScreen";
import PaidTourDetailScreen from "../screens/PaidTourDetailScreen";

const Stack = createStackNavigator();
export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Discover" component={DiscoverScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Customize" component={CustomizeScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Choose Service" component={ChooseServiceScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Destination" component={DestinationScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Item" component={ItemScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Package" component={PackageScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Options" component={OptionsScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Paid Tours" component={TourHistoryScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Paid Tour Detail" component={PaidTourDetailScreen} options={{ headerShown: true }} />
      
    </Stack.Navigator>
  );
};