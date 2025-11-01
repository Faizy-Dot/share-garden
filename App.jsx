import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import { useSelector, Provider } from 'react-redux';
import { GetStarted, Login, Signup, OnboardingScreen, SuccessSignupScreen, SgTabNavigator } from './src/screens';
import { NavigationService } from './src/config';
import colors from './src/config/Colors';
import { StatusBar, Platform, Linking } from 'react-native';
import Toast from 'react-native-toast-message';
import store from './src/redux/store';
import ForgotPassword from './src/screens/auth/Login/frogotPassword/ForgotPassword';
import OneTimePassword from './src/screens/auth/Login/frogotPassword/OneTimePassword';
import ResetPassword from './src/screens/auth/Login/frogotPassword/ResetPassword';
import MerchantTabNavigtor from './src/screens/merchantScreens/merchantTabs/MerchantTabs';
// Stripe Provider - will be uncommented after installing the package
import { StripeProvider } from '@stripe/stripe-react-native';
import pushNotificationService from './src/services/pushNotificationService';
import pointsSocketService from './src/services/pointsSocketService';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user } = useSelector((state) => state.login); // Fetch user from Redux state

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  // Initialize push notifications when user is logged in
  useEffect(() => {
    if (user?.id) {
      pushNotificationService.initialize();
    }
  }, [user?.id]);

  // Initialize centralized points socket service when user is logged in
  useEffect(() => {
    if (user?.id) {
      pointsSocketService.connect(user.id);
    } else {
      // Disconnect when user logs out
      pointsSocketService.disconnect();
    }

    // Cleanup on unmount or when user changes
    return () => {
      if (!user?.id) {
        pointsSocketService.disconnect();
      }
    };
  }, [user?.id]);

  const getInitialRoute = () => {
    if (!user) return 'OnBoarding';
    if (user.role === 'MERCHANT') return 'MerchantTabs';
    return 'SgTabs';
  };

  return (
    <NavigationContainer
      ref={(ref) => NavigationService.setTopLevelNavigator(ref)}
      linking={{
        prefixes: ['sharegarden://', 'https://sharegarden.com', 'https://www.sharegarden.com'],
        config: {
          screens: {
            SgTabs: {
              screens: {
                Items: {
                  screens: {
                    ProductDetail: 'product/:id',
                  },
                },
                Tips: {
                  screens: {
                    TipsDetail: "sgtip/:id",  // maps /sgtip/12345 -> route.params.id = 12345
                  },

                }
              },
            },

            // Add other deep link routes as needed
          },
        },
        async getInitialURL() {
          // Check if app was opened from a deep link
          const url = await Linking.getInitialURL();
          return url;
        },
        subscribe(listener) {
          const onReceiveURL = ({ url }) => listener(url);
          // Listen to incoming links from deep linking
          const eventListener = Linking.addEventListener('url', onReceiveURL);
          return () => {
            // Clean up the event listeners
            eventListener?.remove();
          };
        },
      }}
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
      <Stack.Navigator initialRouteName={getInitialRoute()} screenOptions={{ headerShown: false }}>
        {user ? (
          // Authenticated user screens
          <>
            {
              user?.role === "MERCHANT" ?
                <Stack.Screen name="MerchantTabs" component={MerchantTabNavigtor} />
                :
                <Stack.Screen name="SgTabs" component={SgTabNavigator} />
            }
            {
              !user &&
              <Stack.Screen name="Login" component={Login} />
            }
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="OneTimePassword" component={OneTimePassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
          </>
        ) : (
          // Unauthenticated user screens
          <>
            {/* <Stack.Screen name="SgTabs" component={SgTabNavigator} /> */}
            <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
            <Stack.Screen name="GetStarted" component={GetStarted} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="SuccessSignup" component={SuccessSignupScreen} />
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
      <StripeProvider publishableKey="pk_test_51RkTv5BSnkvyM8bzS2oWw7fJjCGx63akot9KZANcw7iZDs84R1ifvEmhw3uoi7q8dTrGmkM4BEAUPHIWVjj48qCa00NAqg6aFC">
        <AppNavigator />
        <Toast />
      </StripeProvider>
    </Provider>
  );
}
