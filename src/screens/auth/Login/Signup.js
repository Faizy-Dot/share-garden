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
import fonts from "../../../config/Fonts";
import Icon from "react-native-vector-icons/MaterialIcons";

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
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

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
        hasSymbol: false,
        hasNumber: false
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
                hasSymbol: validation.hasSymbol,
                hasNumber: validation.hasNumber
            });
        }
    };


    const handleSubmit = async () => {
        try {
            // Add password validation check
            const validPassword = isValidPassword(form.password);
            if (!validPassword.isValid) {
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
            if (form.password.length < 6) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Password must be at least 6 characters!',
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
            console.log("response==>>", res)

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
                <View style={styles.eyeContainer}>
                    <TextInput
                        placeholder="Password"
                        style={[styles.input, { width: "100%" }]}
                        secureTextEntry={!isPasswordVisible}
                        onChangeText={(text) => handleInputChange('password', text)}
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

                {form.password.length > 0 && (
                    <View style={styles.passwordValidationContainer}>
                        <Text style={styles.validationTitle}>Password must contain:</Text>
                        <View style={styles.validationItem}>
                            <Icon 
                                name={passwordValidation.minLength ? "check-circle" : "cancel"} 
                                size={16} 
                                color={passwordValidation.minLength ? colors.greenColor : colors.redColor} 
                            />
                            <Text style={[styles.validationText, passwordValidation.minLength ? styles.validRequirement : styles.invalidRequirement]}>
                                At least 6 characters
                            </Text>
                        </View>
                        <View style={styles.validationItem}>
                            <Icon 
                                name={passwordValidation.hasUpperCase ? "check-circle" : "cancel"} 
                                size={16} 
                                color={passwordValidation.hasUpperCase ? colors.greenColor : colors.redColor} 
                            />
                            <Text style={[styles.validationText, passwordValidation.hasUpperCase ? styles.validRequirement : styles.invalidRequirement]}>
                                At least one capital letter
                            </Text>
                        </View>
                        <View style={styles.validationItem}>
                            <Icon 
                                name={passwordValidation.hasNumber ? "check-circle" : "cancel"} 
                                size={16} 
                                color={passwordValidation.hasNumber ? colors.greenColor : colors.redColor} 
                            />
                            <Text style={[styles.validationText, passwordValidation.hasNumber ? styles.validRequirement : styles.invalidRequirement]}>
                                At least one number
                            </Text>
                        </View>
                        <View style={styles.validationItem}>
                            <Icon 
                                name={passwordValidation.hasSymbol ? "check-circle" : "cancel"} 
                                size={16} 
                                color={passwordValidation.hasSymbol ? colors.greenColor : colors.redColor} 
                            />
                            <Text style={[styles.validationText, passwordValidation.hasSymbol ? styles.validRequirement : styles.invalidRequirement]}>
                                At least one special character (!@#$%^&*)
                            </Text>
                        </View>
                    </View>
                )}

                <View style={styles.eyeContainer}>
                    <TextInput
                        placeholder="Confirm Password"
                        style={[styles.input, { width: "100%" }]}
                        secureTextEntry={!isConfirmPasswordVisible}
                        onChangeText={(text) => handleInputChange('confirmpassword', text)}
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
                
                {form.confirmpassword.length > 0 && form.password !== form.confirmpassword && (
                    <Text style={styles.errorText}>Passwords do not match!</Text>
                )}
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
                    <TextInput placeholder="Address Line 2 (optional)" style={[styles.input, { width: "100%" }]}
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
        fontFamily: fonts.InterRegular,
    },
    toggleDesc: {
        fontSize: Metrix.normalize(9),
        fontFamily: fonts.InterRegular,
    },
    form: {
        width: "90%",
        marginTop: Metrix.VerticalSize(20),
        gap: Metrix.VerticalSize(10)
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    input: {
        borderWidth: 1,
        borderColor: "#EAEAEA",
        borderRadius: Metrix.HorizontalSize(4),
        // marginBottom: Metrix.VerticalSize(10),
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
        fontSize: Metrix.normalize(9),
        fontFamily: fonts.InterRegular,
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
        color: colors.redColor,
        fontSize: Metrix.FontExtraSmall,
        marginLeft: 4,
        bottom : Metrix.VerticalSize(8)
    },
    eyeContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    eyeIcon: {
        position: "absolute",
        right: Metrix.HorizontalSize(10)
    },
    passwordValidationContainer: {
        marginTop: Metrix.VerticalSize(5),
        marginBottom: Metrix.VerticalSize(10),
        padding: Metrix.HorizontalSize(10),
        backgroundColor: '#f9f9f9',
        borderRadius: Metrix.HorizontalSize(4),
        borderWidth: 1,
        borderColor: '#EAEAEA',
    },
    validationTitle: {
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterRegular,
        marginBottom: Metrix.VerticalSize(5),
        fontWeight: '500',
    },
    validationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Metrix.VerticalSize(2),
    },
    validationText: {
        fontSize: Metrix.FontExtraSmall - 1,
        fontFamily: fonts.InterRegular,
        marginLeft: Metrix.HorizontalSize(5),
    },
    validRequirement: {
        color: colors.greenColor,
    },
    invalidRequirement: {
        color: colors.redColor,
    },
});
