import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Images, Metrix } from '../../../../config';
import colors from '../../../../config/Colors';
import CustomButton from '../../../../components/Button/Button';
import BackArrowIcon from '../../../../components/backArrowIcon/BackArrowIcon';
import ApiCaller from '../../../../config/ApiCaller';
import Toast from 'react-native-toast-message';
import Icon from "react-native-vector-icons/MaterialIcons";

// Password validation function
const isValidPassword = (password) => {
  // If password is empty/null, return all false
  if (!password) {
    return {
      isValid: false,
      minLength: false,
      hasUpperCase: false,
      hasSymbol: false,
      hasNumber: false
    };
  }

  const minLength = password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSymbol = /[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,./]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return {
    isValid: minLength && hasUpperCase && hasSymbol && hasNumber,
    minLength,
    hasUpperCase,
    hasSymbol,
    hasNumber
  };
};

export default function ResetPassword({ navigation, route }) {
  const { email, otp } = route.params || {};

  console.log("ResetPassword Params:", { email, otp });

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUpperCase: false,
    hasSymbol: false,
    hasNumber: false
  });

  // Update password validation when new password changes
  const handlePasswordChange = (text) => {
    setNewPassword(text);
    const validation = isValidPassword(text);
    setPasswordValidation({
      minLength: validation.minLength,
      hasUpperCase: validation.hasUpperCase,
      hasSymbol: validation.hasSymbol,
      hasNumber: validation.hasNumber
    });
  };

  // Handle password reset API call
  const handleResetPassword = async () => {
    const validPassword = isValidPassword(newPassword);
    
    if (!validPassword.isValid) {
      Toast.show({
        type: 'error',
        text1: 'Password Requirements',
        text2: 'Please ensure password meets all requirements',
      });
      return;
    }

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
            <View style={styles.eyeContainer}>
              <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry={!isPasswordVisible}
                value={newPassword}
                onChangeText={handlePasswordChange}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!isPasswordVisible)}
                style={styles.eyeIcon}
              >
                <Icon
                  name={isPasswordVisible ? "visibility" : "visibility-off"}
                  size={20}
                  color={isPasswordVisible ? colors.buttonColor : "#ccc"}
                />
              </TouchableOpacity>
            </View>

            {newPassword.length > 0 && (
              <View style={styles.passwordValidationContainer}>
                <Text style={styles.validationTitle}>Password must contain:</Text>
                <View style={styles.validationItem}>
                  <Icon 
                    name={passwordValidation.minLength ? "check-circle" : "cancel"} 
                    size={16} 
                    color={passwordValidation.minLength ? colors.greenColor : colors.redColor} 
                  />
                  <Text style={[styles.validationText, 
                    passwordValidation.minLength ? styles.validRequirement : styles.invalidRequirement]}>
                    At least 6 characters
                  </Text>
                </View>
                <View style={styles.validationItem}>
                  <Icon 
                    name={passwordValidation.hasUpperCase ? "check-circle" : "cancel"} 
                    size={16} 
                    color={passwordValidation.hasUpperCase ? colors.greenColor : colors.redColor} 
                  />
                  <Text style={[styles.validationText, 
                    passwordValidation.hasUpperCase ? styles.validRequirement : styles.invalidRequirement]}>
                    At least one capital letter
                  </Text>
                </View>
                <View style={styles.validationItem}>
                  <Icon 
                    name={passwordValidation.hasNumber ? "check-circle" : "cancel"} 
                    size={16} 
                    color={passwordValidation.hasNumber ? colors.greenColor : colors.redColor} 
                  />
                  <Text style={[styles.validationText, 
                    passwordValidation.hasNumber ? styles.validRequirement : styles.invalidRequirement]}>
                    At least one number
                  </Text>
                </View>
                <View style={styles.validationItem}>
                  <Icon 
                    name={passwordValidation.hasSymbol ? "check-circle" : "cancel"} 
                    size={16} 
                    color={passwordValidation.hasSymbol ? colors.greenColor : colors.redColor} 
                  />
                  <Text style={[styles.validationText, 
                    passwordValidation.hasSymbol ? styles.validRequirement : styles.invalidRequirement]}>
                    At least one special character (!@#$%^&*)
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.eyeContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry={!isConfirmPasswordVisible}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}
                style={styles.eyeIcon}
              >
                <Icon
                  name={isConfirmPasswordVisible ? "visibility" : "visibility-off"}
                  size={20}
                  color={isConfirmPasswordVisible ? colors.buttonColor : "#ccc"}
                />
              </TouchableOpacity>
            </View>

            {confirmPassword.length > 0 && newPassword !== confirmPassword && (
              <Text style={styles.errorText}>Passwords do not match!</Text>
            )}
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
