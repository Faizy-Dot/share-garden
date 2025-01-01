
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
import { Images } from "../../../config";
import colors from "../../../config/Colors";

export default function SignUpScreen({ navigation }) {
    const [isSGMember, setIsSGMember] = useState(true);
    const [isMerchant, setIsMerchant] = useState(false);

    return (
        
                    <View style={styles.container}>
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
                                    value={isSGMember}
                                    onValueChange={() => setIsSGMember(!isSGMember)}
                                />
                            </View>
                            <View style={styles.toggle}>
                                <Text style={styles.toggleLabel}>Merchant</Text>
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
                        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('SuccessSignup')}>
                            <Text style={styles.buttonText}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View>
                
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        backgroundColor: colors.white,
    },
    logoContainer: {
        marginTop: 50,
        marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 150,
    },
    toggleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        marginBottom: 20,
    },
    toggle: {
        flexDirection: "row",
        alignItems: "center",
    },
    toggleLabel: {
        fontSize: 16,
        color: "#333333",
        marginRight: 10,
    },
    form: {
        width: "90%",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    input: {
        borderWidth: 1,
        borderColor: "#CCCCCC",
        borderRadius: 8,
        padding: 5,
        marginBottom: 10,
        width: "48%",
    },
    smallInput: {
        width: "20%",
    },
    largeInput: {
        width: "76%",
    },
    terms: {
        fontSize: 10,
        color: "#666666",
        textAlign: "center",
        marginVertical: 15,
    },
    link: {
        color: "#00A676",
        textDecorationLine: "underline",
    },
    button: {
        backgroundColor: "#00A676",
        paddingVertical: 15,
        borderRadius: 6,
        width: "80%",
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
  
});
