
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

export default function SignUpScreen({ navigation }) {
    const [isSGMember, setIsSGMember] = useState(true);
    const [isMerchant, setIsMerchant] = useState(false);

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
                        onValueChange={() => setIsSGMember(!isSGMember)}
                    />
                </View>
                <View style={styles.toggle}>
                    <View style={styles.switchText}>
                        <Text style={styles.toggleLabel}>Merchant</Text>
                        <Text style={styles.toggleDesc}>Name of the comapany</Text>
                    </View>
                    <Switch
                        value={isMerchant}
                        onValueChange={() => setIsMerchant(!isMerchant)}
                    />
                </View>
            </View>

            {/* Input Fields */}
            <View style={styles.form}>
                <View style={styles.row}>
                    <TextInput
                        placeholder="First Name"
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Last Name"
                        style={styles.input}
                    />
                </View>
                <TextInput placeholder="Email" style={[styles.input, { width: "100%" }]} />
                <TextInput
                    placeholder="Password"
                    style={[styles.input, { width: "100%" }]}
                    secureTextEntry
                />
                <TextInput
                    placeholder="Confirm Password"
                    style={[styles.input, { width: "100%" }]}
                    secureTextEntry
                />
                <View style={styles.row}>
                    <TextInput
                        placeholder="+1"
                        style={[styles.input, styles.smallInput]}
                    />
                    <TextInput
                        placeholder="786 124 - 3425"
                        style={[styles.input, styles.largeInput]}
                    />
                </View>
                <View style={styles.row}>
                    <TextInput placeholder="Postal code" style={[styles.input, { width: "30%" }]} />
                    <TextInput placeholder="Address" style={[styles.input, { width: "65%" }]} />
                </View>
                <View>
                    <TextInput placeholder="Address" style={[styles.input, { width: "100%" }]} />
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

            <CustomButton
                title={"SUBMIT"}
                onPress={() => navigation.navigate('SuccessSignup')}
            />
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
        justifyContent:'space-between'
        
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
        padding : Metrix.HorizontalSize(10),
        fontSize:Metrix.FontExtraSmall
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
