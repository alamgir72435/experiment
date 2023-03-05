// In App.js in a new project

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/home';
import AboutScreen from '../screens/about';


const Stack = createNativeStackNavigator();


const defaultOptions = {
    headerShown: false
  }

function StackNavigation() {
  return (
      
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={defaultOptions} />
          <Stack.Screen name="About" component={AboutScreen} options={defaultOptions} />
        </Stack.Navigator>
      
  );
}

export default StackNavigation;