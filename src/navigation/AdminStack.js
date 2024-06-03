import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AdminScreen from "../screens/AdminScreenContent/AdminScreen";
import ManagementScreen from "../screens/AdminScreenContent/ManagementScreen"
import HomeAdminScreen from "../screens/AdminScreenContent/HomeAdminScreen"


const Stack = createStackNavigator();
export const AdminStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeAdmin" component={HomeAdminScreen} />
      
    </Stack.Navigator>
  );
};