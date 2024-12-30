import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('./assets/ooo.png')} // Replace with your logo file
        style={styles.logo}
      />

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#999" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
        />
      </View>

      {/* Forgot Password */}
      <Text style={styles.forgotPassword}>Forgot Password?</Text>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>

      {/* OR Divider */}
      <Text style={styles.orText}>OR</Text>

      {/* Social Media Buttons with Icons */}
      <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#1877F2' }]}>
        <Icon name="facebook" size={20} color="#fff" style={styles.socialButtonIcon} />
        <Text style={styles.socialButtonText}>Continue With Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#DB4437' }]}>
        <Icon name="google" size={20} color="#fff" style={styles.socialButtonIcon} />
        <Text style={styles.socialButtonText}>Continue With Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#000000' }]}>
        <Icon name="apple" size={20} color="#fff" style={styles.socialButtonIcon} />
        <Text style={styles.socialButtonText}>Continue With Apple</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <Text style={styles.signUpText}>
        Don’t have an account?{' '}
        <Text style={styles.signUpLink} onPress={() => navigation.navigate('SignUp')}>
          Sign up Now
        </Text>
      </Text>
    </View>
  );
}
function SecondScreen({navigation}) {
  console.log("navigation=>",navigation)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text onPress={() => navigation.navigate('Third')}>Second Screen</Text>
    </View>
  );
}

function ThirdScreen({navigation}) {
  console.log("navigation=>",navigation)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text onPress={() => navigation.goBack()}>Third Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown : false}} >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Second" component={SecondScreen} />
        <Stack.Screen name="Third" component={ThirdScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 250,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  forgotPassword: {
    color: '#666',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'right',
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#009688',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    color: '#999',
    marginBottom: 20,
    fontSize: 14,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    width: '100%',
  },
  socialButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    color: '#666',
    marginTop: 20,
    fontSize: 14,
  },
  signUpLink: {
    color: '#009688',
    fontWeight: 'bold',
  },
  socialButtonIcon : {
    fontSize : 25,
    marginRight : 20
  }
});