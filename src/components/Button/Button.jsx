import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors, Fonts, Metrix } from "../../config";
import colors from "../../config/Colors";



export default function CustomButton({
    title,
    onPress,
    width = Metrix.HorizontalSize(350),
    backgroundColor = Colors.buttonColor,
    color = Colors.white,
    height = Metrix.VerticalSize(56),
    fontSize = Metrix.FontMedium,
    fontFamily = Fonts.InterSemiBold,
    borderRadius = Metrix.HorizontalSize(8),
    borderWidth ,
    borderColor,
    flex,
    icon,
    iconPosition = "left"
}) {
    return (
        <TouchableOpacity  style={[styles.customButton, {
            backgroundColor,
            height,
            width,
            borderRadius,
            borderWidth,
            borderColor,
            flex,   
        }]} activeOpacity={0.8} onPress={onPress}>
            
            {
                icon && iconPosition === "left" && icon
            }
            <Text style={{ color, fontSize,fontFamily }}>
                {title}
            </Text>
            {
                icon && iconPosition === "right" && icon
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    customButton: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },

})