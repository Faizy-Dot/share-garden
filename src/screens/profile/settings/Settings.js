import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import BackArrowIcon from '../../../components/backArrowIcon/BackArrowIcon';
import NavBar from '../../../components/navBar/NavBar';
import styles from './styles';
import colors from '../../../config/Colors';
import { Metrix } from '../../../config';
import fonts from '../../../config/Fonts';
import CustomButton from '../../../components/Button/Button';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import axiosInstance from '../../../config/axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Password validation function - same as Signup screen
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
    // Update the symbol regex to be more specific and escape special characters
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

export default function Settings({ navigation }) {
    const { user } = useSelector((state) => state.login);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChangePassword = async () => {
        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'All fields are required',
            });
            return;
        }

        // Validate new password using same rules as Signup
        const passwordValidation = isValidPassword(newPassword);
        if (!passwordValidation.isValid) {
            Toast.show({
                type: 'error',
                text1: 'Password Requirements',
                text2: 'Please ensure password meets all requirements',
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'New passwords do not match',
            });
            return;
        }

        if (currentPassword === newPassword) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'New password must be different from current password',
            });
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.post('/api/auth/change-password', {
                currentPassword,
                newPassword
            });

            if (response.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: response.data.message || 'Password changed successfully',
                });
                // Clear form
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            console.error('Change password error:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.response?.data?.message || 'Failed to change password. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <BackArrowIcon />
                    <NavBar title="Settings" />
                </View>

                <KeyboardAwareScrollView 
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    enableOnAndroid={true}
                    extraScrollHeight={20}
                >
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Change Password</Text>
                        <Text style={styles.sectionDescription}>
                            Update your password to keep your account secure
                        </Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Current Password</Text>
                            <View style={styles.passwordInputContainer}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="Enter current password"
                                    secureTextEntry={!showCurrentPassword}
                                    value={currentPassword}
                                    onChangeText={setCurrentPassword}
                                    editable={!loading}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                                    style={styles.eyeIcon}
                                >
                                    <Icon
                                        name={showCurrentPassword ? "visibility" : "visibility-off"}
                                        size={20}
                                        color={showCurrentPassword ? colors.buttonColor : "#ccc"}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>New Password</Text>
                            <View style={styles.passwordInputContainer}>
                                <TextInput
                                    style={[styles.passwordInput, !newPassword || isValidPassword(newPassword).isValid ? {} : styles.inputError]}
                                    placeholder="Enter new password"
                                    secureTextEntry={!showNewPassword}
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                    editable={!loading}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowNewPassword(!showNewPassword)}
                                    style={styles.eyeIcon}
                                >
                                    <Icon
                                        name={showNewPassword ? "visibility" : "visibility-off"}
                                        size={20}
                                        color={showNewPassword ? colors.buttonColor : "#ccc"}
                                    />
                                </TouchableOpacity>
                            </View>
                            {newPassword.length > 0 && (
                                <View style={styles.passwordValidationContainer}>
                                    <Text style={styles.validationTitle}>Password Requirements:</Text>
                                    <View style={styles.validationItem}>
                                        <Icon
                                            name={isValidPassword(newPassword).minLength ? "check-circle" : "cancel"}
                                            size={16}
                                            color={isValidPassword(newPassword).minLength ? colors.greenColor : colors.redColor}
                                        />
                                        <Text style={[
                                            styles.validationText,
                                            isValidPassword(newPassword).minLength ? styles.validRequirement : styles.invalidRequirement
                                        ]}>
                                            At least 6 characters
                                        </Text>
                                    </View>
                                    <View style={styles.validationItem}>
                                        <Icon
                                            name={isValidPassword(newPassword).hasUpperCase ? "check-circle" : "cancel"}
                                            size={16}
                                            color={isValidPassword(newPassword).hasUpperCase ? colors.greenColor : colors.redColor}
                                        />
                                        <Text style={[
                                            styles.validationText,
                                            isValidPassword(newPassword).hasUpperCase ? styles.validRequirement : styles.invalidRequirement
                                        ]}>
                                            At least one capital letter
                                        </Text>
                                    </View>
                                    <View style={styles.validationItem}>
                                        <Icon
                                            name={isValidPassword(newPassword).hasNumber ? "check-circle" : "cancel"}
                                            size={16}
                                            color={isValidPassword(newPassword).hasNumber ? colors.greenColor : colors.redColor}
                                        />
                                        <Text style={[
                                            styles.validationText,
                                            isValidPassword(newPassword).hasNumber ? styles.validRequirement : styles.invalidRequirement
                                        ]}>
                                            At least one number
                                        </Text>
                                    </View>
                                    <View style={styles.validationItem}>
                                        <Icon
                                            name={isValidPassword(newPassword).hasSymbol ? "check-circle" : "cancel"}
                                            size={16}
                                            color={isValidPassword(newPassword).hasSymbol ? colors.greenColor : colors.redColor}
                                        />
                                        <Text style={[
                                            styles.validationText,
                                            isValidPassword(newPassword).hasSymbol ? styles.validRequirement : styles.invalidRequirement
                                        ]}>
                                            At least one special character (!@#$%^&*)
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Confirm New Password</Text>
                            <View style={styles.passwordInputContainer}>
                                <TextInput
                                    style={[styles.passwordInput, confirmPassword.length > 0 && newPassword !== confirmPassword ? styles.inputError : {}]}
                                    placeholder="Confirm new password"
                                    secureTextEntry={!showConfirmPassword}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    editable={!loading}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={styles.eyeIcon}
                                >
                                    <Icon
                                        name={showConfirmPassword ? "visibility" : "visibility-off"}
                                        size={20}
                                        color={showConfirmPassword ? colors.buttonColor : "#ccc"}
                                    />
                                </TouchableOpacity>
                            </View>
                            {confirmPassword.length > 0 && newPassword !== confirmPassword && (
                                <Text style={styles.errorText}>Passwords do not match</Text>
                            )}
                        </View>

                        <CustomButton
                            title={loading ? "Changing..." : "Change Password"}
                            onPress={handleChangePassword}
                            disabled={loading}
                            width="100%"
                            height={Metrix.VerticalSize(45)}
                            borderRadius={Metrix.VerticalSize(4)}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
}
