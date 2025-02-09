import React, { useState } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import styles from './styles';
import { Images, Metrix } from '../../../../config';
import CustomButton from '../../../../components/Button/Button';
import BackArrowIcon from '../../../../components/backArrowIcon/BackArrowIcon';
import ApiCaller from '../../../../config/ApiCaller';
import Toast from 'react-native-toast-message';

export default function ResetPassword({ navigation, route }) {
  const { email, otp } = route.params || {};

  console.log("ResetPassword Params:", { email, otp });

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle password reset API call
  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Both fields are required.',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Password Mismatch',
        text2: 'Passwords do not match.',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await ApiCaller.Post('/api/auth/reset-password', {
        email,
        otp,
        newPassword: newPassword,
      });

      console.log("Reset Password Response:", response.status);

      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: response.data.message,
        });
        navigation.navigate('Login');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.data.message,
        });
      }
    } catch (err) {
      console.error("Reset Password Error:", err);
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
    <View style={styles.resetPasswordContainer}>
      <View style={{ marginTop: Metrix.VerticalSize(30) }}>
        <BackArrowIcon />
      </View>
      <View style={{ alignItems: "center" }}>
        <Image source={Images.logo} style={styles.logo} />
        <View style={{ marginTop: Metrix.VerticalSize(50), width: "100%" }}>
          <Text style={styles.description}>
            Please enter and confirm your new password to reset it.
          </Text>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
        </View>
      </View>

      <CustomButton
        title={loading ? "Saving..." : "Save"}
        width={"100%"}
        onPress={handleResetPassword}
        disabled={loading}
      />
    </View>
  );
}
