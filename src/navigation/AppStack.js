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
import TransportationScreen from "../screens/ServiceScreen/TransportationScreen";
import RestaurantScreen from "../screens/ServiceScreen/RestaurantScreen";
import ChooseServiceScreen from "../screens/ChooseServiceScreen"
import DestinationScreen from "../screens/DestinationScreen"
import CartScreen from "../screens/CartScreen"
import ActivityScreen from "../screens/ServiceScreen/ActivityScreen";
import AccommodationScreen from "../screens/ServiceScreen/AccommodationScreen";
import RestDetailScreen from "../screens/ServiceScreen/ServiceScreenContent/RestDetailScreen";
import AccomDetailScreen from "../screens/ServiceScreen/ServiceScreenContent/AccomDetailScreen";
import ActivityDetailScreen from "../screens/ServiceScreen/ServiceScreenContent/ActivityDetailScreen";
import TransDetailScreen from "../screens/ServiceScreen/ServiceScreenContent/TransDetailScreen";


const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Discover" component={DiscoverScreen} />
          <Stack.Screen name="Transportation" component={TransportationScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Restaurant" component={RestaurantScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Customize" component={CustomizeScreen} />
          <Stack.Screen name="Choose Service" component={ChooseServiceScreen} />
          <Stack.Screen name="Destination" component={DestinationScreen} />
          <Stack.Screen name="Item" component={ItemScreen} />
          <Stack.Screen name="Package" component={PackageScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Activity" component={ActivityScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Accommodation" component={AccommodationScreen} options={{ headerShown: false }} />

          {/* Service Detail Screen */}
          <Stack.Screen name="RestDetail" component={RestDetailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AccomDetail" component={AccomDetailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ActivityDetail" component={ActivityDetailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="TransDetail" component={TransDetailScreen} options={{ headerShown: false }} />


        </Stack.Navigator>
  );
};