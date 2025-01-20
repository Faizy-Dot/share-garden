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
import { StatusBar, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import store from './src/redux/store';
import ProductDetail from './src/screens/sgTabs/items/ProductDetail';
import ForgotPassword from './src/screens/auth/Login/frogotPassword/ForgotPassword';
import OneTimePassword from './src/screens/auth/Login/frogotPassword/OneTimePassword';
import ResetPassword from './src/screens/auth/Login/frogotPassword/ResetPassword';

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
            if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(colors.white); // Android-specific
            }
          StatusBar.setBarStyle('light-content');
        } else {
            if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(colors.white); // Android-specific
            }
          StatusBar.setBarStyle('dark-content');
        }
      }}
    >
      <Stack.Navigator initialRouteName={user ? 'SgTabs' : 'OnBoarding'} screenOptions={{ headerShown: false }}>
        {user ? (
          // Authenticated user screens
          <>
            <Stack.Screen name="SgTabs" component={SgTabNavigator} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="OneTimePassword" component={OneTimePassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
          </>
        ) : (
          // Unauthenticated user screens
          <>
          <Stack.Screen name="SgTabs" component={SgTabNavigator} />
            <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
            <Stack.Screen name="GetStarted" component={GetStarted} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="SuccessSignup" component={SuccessSignupScreen}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="OneTimePassword" component={OneTimePassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
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
