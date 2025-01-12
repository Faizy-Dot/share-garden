import { StyleSheet } from "react-native";
import { color } from "react-native-elements/dist/helpers";
import { Colors, Metrix } from "../../../config";
import colors from "../../../config/Colors";


const styles = StyleSheet.create({
    tipsContainer: {
        flex: 1,
        backgroundColor : Colors.white,
      padding : 10
    },
    categoryContainer:{
        borderWidth : 1,
        borderColor : colors.borderColor,
        width:"100%",
        height : Metrix.VerticalSize(200),
        borderRadius : Metrix.LightRadius,
    },
    categoryList:{
        gap : Metrix.VerticalSize(30),
        marginBottom : Metrix.VerticalSize(30)
    }
})

export default styles;