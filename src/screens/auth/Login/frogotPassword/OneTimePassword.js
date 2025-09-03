import React, { useRef, useState } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import styles from './styles';
import { Images, Metrix } from '../../../../config';
import CustomButton from '../../../../components/Button/Button';
import BackArrowIcon from '../../../../components/backArrowIcon/BackArrowIcon';
import ApiCaller from '../../../../config/ApiCaller';
import Toast from 'react-native-toast-message';

export default function OneTimePassword({ navigation, route }) {
  const { email } = route.params || {}; // Handle undefined params safely
  console.log("OneTimePassword Email:", email);

  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Handle OTP input and auto-focus
  const handleInputChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length === 1 && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  // Submit OTP for verification
  const verify = async () => {
    const otpCode = otp.join(""); // Convert OTP array to string
    if (otpCode.length !== 4) {
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: 'Please enter all 4 digits.',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await ApiCaller.Post('/api/auth/verify-otp', { email, otp: otpCode });

      console.log("Response from API:", response.status);

      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: response.data.message,
        });
        navigation.navigate('ResetPassword', { email, otp: otpCode });
      } else {
        Toast.show({
          type: 'error',
          text1: response.data.message,
        });
      }
    } catch (err) {
      console.error("OTP Verification Error:", err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP functionality
  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;
    
    setResendLoading(true);
    try {
      const response = await ApiCaller.Post('/api/auth/forgot-password', { email });
      
      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'OTP sent successfully',
          text2: 'Please check your email for the new OTP.',
        });
        
        // Start cooldown timer (60 seconds)
        setResendCooldown(60);
        const timer = setInterval(() => {
          setResendCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.data?.message || 'Failed to resend OTP',
        });
      }
    } catch (err) {
      console.error("Resend OTP Error:", err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong. Please try again.',
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <View style={styles.OneTimePassword}>
      <View style={{ marginTop: Metrix.VerticalSize(30) }}>
        <BackArrowIcon />
      </View>
      <View style={{ alignItems: "center" }}>
        <Image source={Images.logo} style={styles.logo} />
        <View style={{ marginTop: Metrix.VerticalSize(50), width: "100%" }}>
          <Text style={styles.description}>
            Enter the 4-digit code sent to your email address.
          </Text>

          <View style={styles.otpInputsContainer}>
          {otp.map((_, index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(text) => handleInputChange(text, index)}
                value={otp[index]}
              />
            ))}
          </View>

          {/* Verify Button */}
          <CustomButton title={loading ? "Verifying..." : "Verify"} width={"100%"} onPress={verify} disabled={loading} />
          
          {/* Resend OTP Button */}
          <View style={{ marginTop: Metrix.VerticalSize(20), alignItems: 'center' }}>
            <Text style={styles.resendText}>
              Didn't receive the code?{' '}
              {resendCooldown > 0 ? (
                <Text style={styles.cooldownText}>Resend in {resendCooldown}s</Text>
              ) : (
                <Text 
                  style={[styles.resendLink, resendLoading && styles.disabledLink]} 
                  onPress={handleResendOTP}
                >
                  {resendLoading ? 'Sending...' : 'Resend OTP'}
                </Text>
              )}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
