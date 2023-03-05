import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigations/StackNavigation';

import { NativeBaseProvider  } from "native-base"

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import useTheme from './src/components/config/useTheme';


function App(): JSX.Element {

  const queryClient = new QueryClient();
  const { theme } = useTheme();




  return (
    <QueryClientProvider client={queryClient}>
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </NativeBaseProvider>
    </QueryClientProvider>
  );
}



export default App;
