import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import { GetStarted, Login, Signup, OnboardingScreen, SuccessSignupScreen, SgTabNavigator } from './src/screens';
import { NavigationService } from './src/config';
import colors from './src/config/Colors';
import { StatusBar } from 'react-native';
import Profile from './src/screens/profile/Profile';
import { Provider } from 'react-redux';
import store from './src/assets/redux/store';
import EditProfile from './src/screens/profile/editProfile/EditProfile';
import Toast from 'react-native-toast-message'; // Import Toast

 
const Stack = createNativeStackNavigator();



export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <Provider store={store}>

      <NavigationContainer
        ref={(ref) => NavigationService.setTopLevelNavigator(ref)}
        onStateChange={() => {
          const currentRoute = NavigationService.getCurrentRoute();
          if (currentRoute.name === 'OnBoarding') {
            StatusBar.setBackgroundColor(colors.onBoardColor);
            StatusBar.setBarStyle('light-content');
          } else {
            StatusBar.setBackgroundColor(colors.white);
            StatusBar.setBarStyle('dark-content');
          }
        }}
      >
        <Stack.Navigator initialRouteName="OnBoarding" screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="SuccessSignup" component={SuccessSignupScreen} />
          <Stack.Screen name="SgTabs" component={SgTabNavigator} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </Provider>
  );
}
