import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import { Login } from './src/screens';
import { NavigationService } from './src/config';
import OnboardingScreen from './src/screens/OnBoarding/OnBoarding';
import GetStartedScreen from './src/screens/getStarted/GetStarted';
import SignUpScreen from './src/screens/auth/Login/Signup';
import SuccessSignupScreen from './src/screens/auth/Login/SuccessSignup';
import HomeScreen from './src/screens/home/Home';


const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <NavigationContainer ref={ref => NavigationService.setTopLevelNavigator(ref)}>
      <Stack.Navigator initialRouteName="OnBoarding" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="SuccessSignup" component={SuccessSignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
