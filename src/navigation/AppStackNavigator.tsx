import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppNavigator from './AppNavigator';

import EditUserScreen from '../features/users/screens/EditUserScreen';
import AddProduct from '../features/products/screens/AddProduct';
import ProductDetail from '../features/products/screens/ProductDetail';

const Stack = createNativeStackNavigator();

export default function AppStackNavigator({
  onLogout,
}: any) {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
      }}>

      <Stack.Screen
        name="MainTabs"
        options={{
          headerShown: false,
        }}>
        {props => (
          <AppNavigator
            {...props}
            onLogout={onLogout}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="EditUser"
        component={EditUserScreen}
        options={{
          title: 'Edit User',
        }}
      />

      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{
          title: 'Add Product',
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          title: 'Product Details',
        }}
      />
    </Stack.Navigator>
  );
}
