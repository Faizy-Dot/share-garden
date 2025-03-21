import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Switch,
    TouchableOpacity,
    ScrollView,
    Linking,
    Alert,
} from "react-native";
import { Image } from "react-native";
import { Colors, Images, Metrix } from "../../../config";
import colors from "../../../config/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomButton from "../../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import getDeviceDetails from "../../../config/DeviceDetails";
import DeviceInfo from "react-native-device-info";
import Toast from 'react-native-toast-message';
import { signUp } from "../../../redux/Actions/authActions/signupAction";
import Feather from 'react-native-vector-icons/Feather';

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidPassword = (password) => {
    // If password is empty/null, return all false
    if (!password) {
        return {
            isValid: false,
            minLength: false,
            hasUpperCase: false,
            hasSymbol: false
        };
    }

    const minLength = password.length >= 6;
    const hasUpperCase = /[A-Z]/.test(password);
    // Update the symbol regex to be more specific and escape special characters
    const hasSymbol = /[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,./]/.test(password);
    
    return {
        isValid: minLength && hasUpperCase && hasSymbol,
        minLength,
        hasUpperCase,
        hasSymbol
    };
};

export default function SignUpScreen({ navigation }) {
    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        emailaddress: '',
        password: '',
        confirmpassword: '',
        postalcode: '',
        address1: '',
        address2: "",
        phonenumber1: '',
        phonenumber2: '',
    });
    
    
    const [isSGMember, setIsSGMember] = useState(true);
    const [isMerchant, setIsMerchant] = useState(false);

    const dispatch = useDispatch();
    const { loading, error, user } = useSelector((state) => state.auth);
    console.log("user=>>>", user)
    if (error) {
        console.log(error)
    }

    const usertypeid = isSGMember ? "1" : "2"

    const [emailError, setEmailError] = useState('');

    // Add state for password
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // In your component, add state for password
    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        hasUpperCase: false,
        hasSymbol: false
    });

    const handleInputChange = (key, value) => {
        // First update the form state
        setForm(prev => ({ ...prev, [key]: value }));
        
        // Then handle specific validations
        if (key === 'emailaddress') {
            setEmailError('');
        }
        
        if (key === 'password') {
            // Only run validation if there's a value
            const validation = isValidPassword(value);
            setPasswordValidation({
                minLength: validation.minLength,
                hasUpperCase: validation.hasUpperCase,
                hasSymbol: validation.hasSymbol
            });
        }
    };

    console.log(form.password)

    const handleSubmit = async () => {
        try {
            // Add password validation check
            if (!passwordValidation.isValid) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Please ensure password meets all requirements',
                });
                return;
            }

            if (form.password !== form.confirmpassword) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Passwords do not match!',
                });
                return;
            }

            if (!isValidEmail(form.emailaddress)) {
                setEmailError('Please enter a valid email address');
                return;
            }

            const { deviceid, fcmtoken, devicetype } = await getDeviceDetails();

            const userData = {
                firstName: form.firstname,
                lastName: form.lastname,
                email: form.emailaddress,
                password: form.password,
                address1: form.address1,
                address2: form.address2,
                postalcode: form.postalcode,
                phoneNumber: form.phonenumber1 + form.phonenumber2,
                deviceToken: deviceid,
                deviceType: devicetype,
                role: isSGMember ? "USER" : "MERCHANT",
            };

            const missingFields = Object.entries(userData).filter(([key, value]) => !value);

            if (missingFields.length > 0) {
                const missingKeys = missingFields.map(([key]) => key).join(', ');
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: `Please fill the following fields: ${missingKeys}`,
                });
                return;
            }

            const res = await dispatch(signUp(userData)).unwrap();
            console.log("response==>>",res)

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: "Signup Successfully",
            });
            console.log("Signup successfully==>", res);
            navigation.navigate('SuccessSignup');
            setForm({
                firstname: '',
                lastname: '',
                emailaddress: '',
                password: '',
                confirmpassword: '',
                postalcode: '',
                address1: '',
                address2: '',
                phonenumber1: '',
                phonenumber2: '',
            });

        } catch (error) {
            console.error("Signup failed:", error);

            Toast.show({
                type: 'error',
                text1: 'Signup Failed',
                text2: "Something went wrong",
            });
        }
    }

    return (
        <KeyboardAwareScrollView 
            style={styles.container} 
            contentContainerStyle={{
                alignItems: "center",
                paddingBottom: Metrix.VerticalSize(30),
            }}
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.logoContainer}>
                <Image
                    source={Images.logo}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.toggleContainer}>
                <View style={styles.toggle}>
                    <Text style={styles.toggleLabel}>SG Member</Text>
                    <Switch
                        style={{ marginLeft: Metrix.HorizontalSize(62) }}
                        value={isSGMember}
                        onValueChange={() => {
                            setIsSGMember(true);
                            setIsMerchant(false);
                        }}
                    />
                </View>
                <View style={styles.toggle}>
                    <View style={styles.switchText}>
                        <Text style={styles.toggleLabel}>Merchant</Text>
                        <Text style={styles.toggleDesc}>Name of the comapany</Text>
                    </View>
                    <Switch
                        value={isMerchant}
                        onValueChange={() => {
                            setIsMerchant(true);
                            setIsSGMember(false);
                        }}
                    />
                </View>
            </View>

            <View style={styles.form}>
                <View style={styles.row}>
                    <TextInput
                        placeholder="First Name"
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('firstname', text)}
                    />
                    <TextInput
                        placeholder="Last Name"
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('lastname', text)}
                    />
                </View>
                <View>
                    <TextInput 
                        placeholder="Email"
                        style={[
                            styles.input, 
                            { width: "100%" },
                            emailError ? styles.inputError : null
                        ]}
                        onChangeText={(text) => handleInputChange('emailaddress', text)} 
                    />
                    {emailError ? 
                        <Text style={styles.errorText}>{emailError}</Text>
                     : null}
                </View>

                <View style={{ width: "100%", position: 'relative' }}>
                    <TextInput
                        placeholder="Password"
                        style={[
                            styles.input, 
                            { width: "100%" },
                            passwordValidation.isValid && { color: "green" }
                        ]}
                        secureTextEntry={!showPassword}
                        onChangeText={(text) => handleInputChange('password', text)}
                    />
                    <TouchableOpacity 
                        onPress={() => setShowPassword(!showPassword)}
                        style={{ 
                            position: 'absolute', 
                            right: 10, 
                            top: 7,
                            padding: 5,
                            zIndex: 1
                        }}
                    >
                        <Feather 
                            name={showPassword ? "eye-off" : "eye"} 
                            size={16} 
                            color="#000" 
                        />
                    </TouchableOpacity>
                    
                    {/* Update the password validation indicators section */}
                    <View style={styles.passwordValidation}>
                        <View style={styles.validationRow}>
                            <Feather 
                                name={passwordValidation.minLength ? "check" : "x"} 
                                size={12} 
                                color={passwordValidation.minLength ? "green" : "red"} 
                            />
                            <Text style={[
                                styles.validationText,
                                passwordValidation.minLength ? styles.validationSuccess : styles.validationError
                            ]}>
                                At least 6 characters
                            </Text>
                        </View>
                        
                        <View style={styles.validationRow}>
                            <Feather 
                                name={passwordValidation.hasUpperCase ? "check" : "x"} 
                                size={12} 
                                color={passwordValidation.hasUpperCase ? "green" : "red"} 
                            />
                            <Text style={[
                                styles.validationText,
                                passwordValidation.hasUpperCase ? styles.validationSuccess : styles.validationError
                            ]}>
                                One uppercase letter
                            </Text>
                        </View>
                        
                        <View style={styles.validationRow}>
                            <Feather 
                                name={passwordValidation.hasSymbol ? "check" : "x"} 
                                size={12} 
                                color={passwordValidation.hasSymbol ? "green" : "red"} 
                            />
                            <Text style={[
                                styles.validationText,
                                passwordValidation.hasSymbol ? styles.validationSuccess : styles.validationError
                            ]}>
                                One special character
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: "100%", position: 'relative' }}>
                    <TextInput
                        placeholder="Confirm Password"
                        style={[
                            styles.input, 
                            { width: "100%" },
                            { color: "red" }
                        ]}
                        secureTextEntry={!showConfirmPassword}
                        onChangeText={(text) => handleInputChange('confirmpassword', text)}
                    />
                    <TouchableOpacity 
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{ 
                            position: 'absolute', 
                            right: 10, 
                            top: 7,
                            padding: 5,
                            zIndex: 1
                        }}
                    >
                        <Feather 
                            name={showConfirmPassword ? "eye-off" : "eye"} 
                            size={16} 
                            color="#000" 
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TextInput
                        placeholder="+1"
                        style={[styles.input, styles.smallInput]}
                        onChangeText={(text) => handleInputChange('phonenumber1', text)}
                    />
                    <TextInput
                        placeholder="786 124 - 3425"
                        style={[styles.input, styles.largeInput]}
                        onChangeText={(text) => handleInputChange('phonenumber2', text)}
                    />
                </View>
                <View style={styles.row}>
                    <TextInput placeholder="Postal code"
                        style={[styles.input, { width: "30%" }]}
                        onChangeText={(text) => handleInputChange('postalcode', text)} />
                    <TextInput placeholder="Address"
                        style={[styles.input, { width: "65%" }]}
                        onChangeText={(text) => handleInputChange('address1', text)} />
                </View>
                <View>
                    <TextInput placeholder="Address" style={[styles.input, { width: "100%" }]}
                        onChangeText={(text) => handleInputChange('address2', text)} />
                </View>
            </View>

            <Text style={styles.terms}>
                By signing up, you're agreeing to our{" "}
                <Text
                    style={styles.link}
                    onPress={() => Linking.openURL("https://example.com/terms")}
                >
                    Terms & Conditions
                </Text>{" "}
                and{" "}
                <Text
                    style={styles.link}
                    onPress={() => Linking.openURL("https://example.com/privacy")}
                >
                    Privacy Policy
                </Text>
            </Text>

            <CustomButton title={loading ? 'Submitting...' : 'Submit'} onPress={handleSubmit} />
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    logoContainer: {
        marginTop: Metrix.VerticalSize(100),
    },
    logo: {
        width: Metrix.HorizontalSize(156),
        height: Metrix.VerticalSize(96),
    },
    toggleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        marginTop: Metrix.VerticalSize(82),
    },
    toggle: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        justifyContent: 'space-between'
    },
    toggleLabel: {
        fontSize: Metrix.FontExtraSmall,
        fontWeight: "500",
    },
    toggleDesc: {
        fontSize: Metrix.normalize(9),
        fontWeight: "500",
    },
    form: {
        width: "90%",
        marginTop: Metrix.VerticalSize(20)
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    input: {
        borderWidth: 1,
        borderColor: "#EAEAEA",
        borderRadius: Metrix.HorizontalSize(4),
        marginBottom: Metrix.VerticalSize(10),
        width: "48%",
        height: Metrix.VerticalSize(40),
        padding: Metrix.HorizontalSize(10),
        fontSize: Metrix.FontExtraSmall
    },
    smallInput: {
        width: "20%",
    },
    largeInput: {
        width: "76%",
    },
    terms: {
        fontSize: 10,
        fontWeight: "500",
        color: colors.black,
        textAlign: "center",
        marginVertical: Metrix.VerticalSize(15),
        width: "90%",
        marginBottom: Metrix.VerticalSize(20),
    },
    link: {
        color: colors.buttonColor,
        textDecorationLine: "underline",
    },
    switchText: {
        marginLeft: Metrix.HorizontalSize(10)
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: -8,
        marginBottom: 10,
        marginLeft: 4,
    },
    passwordValidation: {
        marginTop: -5,
        marginBottom: 10,
        paddingLeft: 5,
    },
    validationText: {
        fontSize: 11,
        marginBottom: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    validationSuccess: {
        color: 'green',
    },
    validationError: {
        color: 'red',
    },
    validationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
        gap: 5,
    },
});
