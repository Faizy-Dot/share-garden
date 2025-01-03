import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors, Metrix } from "../../config";
import colors from "../../config/Colors";



export default function CustomButton({
    title,
    onPress,
    width = Metrix.HorizontalSize(350),
    backgroundColor = Colors.buttonColor,
    color = Colors.white,
    height = Metrix.VerticalSize(56),
    fontSize = Metrix.FontMedium,
    fontWeight = 500,
    borderRadius = Metrix.HorizontalSize(8),
    icon
}) {
    return (
        <TouchableOpacity style={[styles.customButton, {
            backgroundColor,
            height,
            width,
            borderRadius
        }]} activeOpacity={0.8} onPress={onPress}>
            
            {
                icon && icon
            }
            <Text style={{ color, fontSize, fontWeight }}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    customButton: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },

})