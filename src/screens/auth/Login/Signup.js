
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




    const handleInputChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };



    const handleSubmit = async () => {

        try {


            if (form.password !== form.confirmpassword) {
                // alert('Passwords do not match!');
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Passwords do not match!',
                });
                return;
            }

            const { deviceid, fcmtoken, devicetype } = await getDeviceDetails();


            const userData = {
                firstName: form.firstname,
                lastName: form.lastname,
                email: form.emailaddress,
                password: form.password,
                // address1: form.address1,
                // address2: form.address2,
                // postalcode: form.postalcode,
                phoneNumber: form.phonenumber1 + form.phonenumber2,
                // isactive: true,
                deviceToken: deviceid,
                // fcmtoken: "COming SOon",
                deviceType: devicetype,
                // usertypeid,
            };

            // Validate user data
            const missingFields = Object.entries(userData).filter(([key, value]) => !value);

            if (missingFields.length > 0) {
                const missingKeys = missingFields.map(([key]) => key).join(', ');
                // alert(`Please fill the following fields: ${missingKeys}`);
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: `Please fill the following fields: ${missingKeys}`,
                });
                return;
            }

            // console.log("form=>", userData);


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

    <KeyboardAwareScrollView style={styles.container} contentContainerStyle={{
        alignItems: "center",
    }}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
            <Image
                source={Images.logo} // Fallback image
                style={styles.logo}
                resizeMode="contain"
            />
        </View>

        {/* Toggle Switches */}
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

        {/* Input Fields */}
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
            <TextInput placeholder="Email"
                style={[styles.input, { width: "100%" }]}
                onChangeText={(text) => handleInputChange('emailaddress', text)} />

            <TextInput
                placeholder="Password"
                style={[styles.input, { width: "100%" }]}
                secureTextEntry
                onChangeText={(text) => handleInputChange('password', text)}
            />
            <TextInput
                placeholder="Confirm Password"
                style={[styles.input, { width: "100%" }]}
                secureTextEntry
                onChangeText={(text) => handleInputChange('confirmpassword', text)}
            />
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

        {/* Terms and Conditions */}
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

        {/* Submit Button */}

        <CustomButton title={loading ? 'Submitting...' : 'Submit'} onPress={handleSubmit} />
    </KeyboardAwareScrollView>

);
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
    },
    link: {
        color: colors.buttonColor,
        textDecorationLine: "underline",
    },
    switchText: {
        marginLeft: Metrix.HorizontalSize(10)
    }
});
