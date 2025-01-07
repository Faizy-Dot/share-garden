import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import { GetStarted, Login, Signup , OnboardingScreen , SuccessSignupScreen , SgTabNavigator } from './src/screens';
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
      <Stack.Navigator initialRouteName="OnBoarding" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SuccessSignup" component={SuccessSignupScreen}/>
        <Stack.Screen name="SgTabs" component={SgTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
