import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors, Metrix } from "../../config";
import colors from "../../config/Colors";



export default function CustomButton({ title,onPress }) {
    return (
        <TouchableOpacity style={styles.customButton} activeOpacity={0.8} onPress={onPress}>
            <Text style={styles.text}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    customButton: {
        backgroundColor: Colors.buttonColor,
        marginHorizontal: Metrix.HorizontalSize(13),
        borderRadius: Metrix.LightRadius,
        padding: 20,
    },
    text : {
        textAlign: "center",
        color : colors.white,
        fontSize : Metrix.FontMedium
    }
})