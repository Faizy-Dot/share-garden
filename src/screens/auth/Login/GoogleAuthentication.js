import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// Configure Google Sign In
GoogleSignin.configure({
  webClientId: '743643897751-v8oalgv56b1erejcqpksokcvblcqqlsc.apps.googleusercontent.com',
  offlineAccess: false,
});

export const signIn = async () => {
  try {
    // Check if Play Services are available
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Get user ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const userCredential = await auth().signInWithCredential(googleCredential);
    
    console.log("Firebase User:", userCredential.user);
    return userCredential.user;

  } catch (error) {
    console.error('Detailed error:', error);

    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User cancelled the login flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Operation already in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Play services not available or outdated');
    } else {
      console.log('Other error occurred:', error.message);
    }

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