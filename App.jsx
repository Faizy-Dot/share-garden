import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import { useSelector, Provider } from 'react-redux';
import { GetStarted, Login, Signup, OnboardingScreen, SuccessSignupScreen, SgTabNavigator } from './src/screens';
import Profile from './src/screens/profile/Profile';
import EditProfile from './src/screens/profile/editProfile/EditProfile';
import { NavigationService } from './src/config';
import colors from './src/config/Colors';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import store from './src/redux/store';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user } = useSelector((state) => state.login); // Fetch user from Redux state

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
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
      <Stack.Navigator initialRouteName={user ? 'SgTabs' : 'OnBoarding'} screenOptions={{ headerShown: false }}>
        {user ? (
          // Authenticated user screens
          <>
            <Stack.Screen name="SgTabs" component={SgTabNavigator} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Login" component={Login} />
          </>
        ) : (
          // Unauthenticated user screens
          <>
          <Stack.Screen name="SgTabs" component={SgTabNavigator} />
            <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
            <Stack.Screen name="GetStarted" component={GetStarted} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="SuccessSignup" component={SuccessSignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
      <Toast />
    </Provider>
  );
}
