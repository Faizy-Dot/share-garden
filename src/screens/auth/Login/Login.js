import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Images from '../../../config/Images';
import CustomButton from '../../../components/Button/Button';

const Login = ({navigation}) => {
    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image
                source={Images.logo} // Replace with your logo file
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
            <TouchableOpacity activeOpacity={0.8} style={styles.loginButton}>
                <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>

            {/* OR Divider */}
            <Text style={styles.orText}>OR</Text>

            {/* Social Media Buttons with Icons */}
            <TouchableOpacity activeOpacity={0.8} style={[styles.socialButton, { backgroundColor: '#1877F2' }]}>
                <FontAwesome name="facebook" size={20} color="#fff" style={styles.socialButtonIcon} />
                <Text style={styles.socialButtonText}>Continue With Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={[styles.socialButton, { backgroundColor: '#DB4437' }]}>
                <FontAwesome name="google" size={20} color="#fff" style={styles.socialButtonIcon} />
                <Text style={styles.socialButtonText}>Continue With Google</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={[styles.socialButton, { backgroundColor: '#000000' }]}>
                <FontAwesome name="apple" size={20} color="#fff" style={styles.socialButtonIcon} />
                <Text style={styles.socialButtonText}>Continue With Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={styles.signupButton} onPress={()=> navigation.navigate('Signup')}>
                <Text style={styles.signupButtonText}>Don't have an account?Sign up Now</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login