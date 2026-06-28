import React from 'react';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import AppNavigator from './AppNavigator';

import EditUserScreen from '../features/users/screens/EditUserScreen';

const Stack =
  createNativeStackNavigator();

export default function AppStackNavigator({
  onLogout,
}: any) {
  return (
    <Stack.Navigator>
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
      />
    </Stack.Navigator>
  );
}
