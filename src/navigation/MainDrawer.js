import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from '../components/Dashboard';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native'; 
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


const DashboardIcon =({focused, color, size})=><Ionicons name='md-speedometer' size={size} color={color} />

export const MainDrawer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainDashboard">
          {() => (
            <Drawer.Navigator 
            screenOptions={{
              drawerStyle:{
                backgroundColor:'yellow',   //change bg color
                width:230    //change width of sidebar 
              }
            }}
            >
              <Drawer.Screen name="Jome" component={Dashboard} options={{ drawerIcon: DashboardIcon }} />

            </Drawer.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>

  );
};