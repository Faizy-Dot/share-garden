import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import { Login } from './src/screens';
import { NavigationService } from './src/config';


const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <NavigationContainer ref={ref => NavigationService.setTopLevelNavigator(ref)}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
