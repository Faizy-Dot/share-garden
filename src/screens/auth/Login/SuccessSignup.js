import { Image, StyleSheet, Text, View } from "react-native";
import { Images, Metrix } from "../../../config";
import colors from "../../../config/Colors";
import { useEffect } from "react";
import { SuccessLogoIcon } from "../../../assets/svg";


export default function SuccessSignupScreen({ navigation }) {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login')
        }, 2000)
    }, [])
    return (
        <View style={styles.success}>
            <View style={{ alignItems: "center", width: Metrix.HorizontalSize(290) }}>
                <SuccessLogoIcon />
                <Text style={{ marginTop: 30, fontSize: 18, color: colors.buttonColor, fontWeight: "800" }}>Thanks for joining Share Garden.</Text>
                <Text style={{ textAlign: "center", lineHeight: 25, fontWeight: "800" }}>Your Account has been created,please check your email to verify.</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    success: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center"
    }
})