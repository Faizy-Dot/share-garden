import React, { useState } from 'react';
import { View, Text, Image, TextInput, Alert } from 'react-native';
import styles from './styles';
import { Images, Metrix } from '../../../../config';
import CustomButton from '../../../../components/Button/Button';
import BackArrowIcon from '../../../../components/backArrowIcon/BackArrowIcon';
import ApiCaller from '../../../../config/ApiCaller';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

export default function ForgotPassword({ navigation }) {
    const { user } = useSelector((state) => state.login);
    const [email, setEmail] = useState(user?.email || "");
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Email',
                text2: 'Please enter a valid email address.',
            });
            return;
        }

        setLoading(true);
        try {
            const response = await ApiCaller.Post('/api/auth/forgot-password', { email });
    
            console.log("Response from API:", response.status);
    
            if (response.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: response.data.message,
                });
                navigation.navigate('OneTimePassword', { email: response.data.email });
            } else {
                // Handle different error status codes
                const errorMessage = response.data?.message || 'An error occurred';
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: errorMessage,
                });
            }
        } catch (err) {
            console.error("Forgot Password Error:", err);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Something went wrong. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };
    
    

    return (
        <View style={styles.forgotPasswordContainer}>
            <View style={{ marginTop: Metrix.VerticalSize(30) }}>
                <BackArrowIcon />
            </View>
            <View style={{ alignItems: "center" }}>
                <Image source={Images.logo} style={styles.logo} />
                <View style={styles.emailContainer}>
                    <View>
                        <Text style={styles.description}>
                            Please enter your email address to receive a OTP by Email.
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                    <CustomButton
                        title={loading ? "Submitting..." : "Submit"}
                        width="100%"
                        onPress={submit}
                        disabled={loading}
                    />
                </View>
            </View>
        </View>
    );
}
