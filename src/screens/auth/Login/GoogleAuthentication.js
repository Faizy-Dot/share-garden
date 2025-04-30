import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import ApiCaller from '../../../config/ApiCaller';
import { googleLogin } from '../../../redux/Actions/authActions/loginAction';
import Toast from 'react-native-toast-message';
import { Platform } from 'react-native';
import { getMessaging, getToken } from '@react-native-firebase/messaging';
import store from '../../../redux/store';

// Function to get FCM token
const getFcmToken = async () => {
  try {
    // Request permission for iOS
    if (Platform.OS === 'ios') {
      const messaging = getMessaging();
      const authStatus = await messaging.requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        console.log('Notification permission denied');
        return null;
      }
    }

    // Get FCM token
    const messaging = getMessaging();
    const token = await getToken(messaging);
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

//  const checkToken = async () => {
//     try {
//       const userInfo = await GoogleSignin.signInSilently();
//       console.log("User Info:", userInfo);
//     } catch (error) {
//       console.error("Silent Sign-In Error:", error.message);
//     }
//   };
//   useEffect(() => { checkToken() }, []);
  
  

export const onGoogleButtonPress = async (navigation) => {
  try {
    // Check if Google Play Services is available
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Get the user's Google credentials
    const userInfo = await GoogleSignin.signIn();

    console.log("Google User Info:", userInfo);

    // Get FCM token
    const deviceToken = await getFcmToken();
    console.log("FCM Token:", deviceToken);

    // Prepare data for your API
    const userData = {
      token: userInfo.data.idToken, // Google ID token in the token field
      deviceToken: deviceToken,
      deviceType: Platform.OS.toLowerCase(),
    };

    console.log("Sending to API:", JSON.stringify(userData, null, 2));

    // Call your API endpoint
    const response = await ApiCaller.Post('/api/auth/google', userData);

    console.log("API Response:", JSON.stringify(response, null, 2));

    if (response.status === 200 || response.status === 201) {
      // Ensure we have the token in the response data
      if (!response.data.token) {
        throw new Error('No token received from server');
      }

      // Use the googleLogin action to update the Redux store
      await store.dispatch(googleLogin(response.data)).unwrap();

      // Verify the store state after dispatch
      const state = store.getState();
      console.log("Redux Store State:", JSON.stringify({
        user: state.login.user,
        token: state.login.user?.token
      }, null, 2));

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Logged in successfully with Google',
      });

      // Navigate to the main app screen
      navigation.navigate('SgTabs');

      return response.data;
    } else {
      throw new Error('Failed to authenticate with server');
    }
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error.message || 'Failed to sign in with Google',
    });
    throw error;
  }
};

// Sign out function
export const signOut = async () => {
  try {
    // Sign out from Firebase
    await auth().signOut();
    // Sign out from Google
    await GoogleSignin.signOut();
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

// Check if user is signed in
export const isSignedIn = async () => {
  try {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      // Get current user data
      const currentUser = await GoogleSignin.getCurrentUser();
      return currentUser;
    }
    return null;
  } catch (error) {
    console.error('Error checking sign in status:', error);
    return null;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const currentUser = await GoogleSignin.getCurrentUser();
    return currentUser;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};