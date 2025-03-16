import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

 // const checkToken = async () => {
  //   try {
  //     const userInfo = await GoogleSignin.signInSilently();
  //     console.log("User Info:", userInfo);
  //   } catch (error) {
  //     console.error("Silent Sign-In Error:", error.message);
  //   }
  // };
  // useEffect(() => { checkToken(); }, []);
  
  

  export const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  
     const userInfo = await GoogleSignin.signIn();
  
  
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.data.idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
  
      console.log("Firebase User:", userCredential.user._user);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
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