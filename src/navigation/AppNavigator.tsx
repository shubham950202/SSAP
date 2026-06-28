import React from 'react';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import HomeScreen from '../features/home/screens/HomeScreen';
import UsersScreen from '../features/users/screens/UsersScreen';
import ProfileScreen from '../features/profile/screens/ProfileScreen';
import ProductList from '../features/products/screens/ProductList';
import AddProduct from '../features/products/screens/AddProduct';

const Tab =
  createBottomTabNavigator();

export default function AppNavigator({
  onLogout,
}: any) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}>
      <Tab.Screen
        name="Home">
        {props => (
          <HomeScreen
            {...props}
            onLogout={onLogout}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Users"
        component={UsersScreen}
      />
            
      <Tab.Screen
        name="Products"
        component={ProductList}
      />
          
      <Tab.Screen
        name="Profile">
        {props => (
          <ProfileScreen
            {...props}
            onLogout={onLogout}
          />
        )}
        
      </Tab.Screen>
    </Tab.Navigator>
  );
}
