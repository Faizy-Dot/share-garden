import { StyleSheet } from "react-native";
import { color } from "react-native-elements/dist/helpers";
import { Colors, Metrix } from "../../../config";
import colors from "../../../config/Colors";
import fonts from "../../../config/Fonts";


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
        height : Metrix.VerticalSize(215),
        borderRadius : Metrix.LightRadius,
    },
    categoryList:{
        gap : Metrix.VerticalSize(30),
        paddingBottom : Metrix.VerticalSize(30)
    },
    clearButton: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchButton: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.buttonColor,
        borderRadius: Metrix.LightRadius,
        minWidth: 80
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Metrix.VerticalSize(20)
    },
    emptyText: {
        fontSize: Metrix.FontSmall,
        color: colors.textColor,
        fontFamily: fonts.InterRegular
    },
    containertext:{
        fontSize:Metrix.FontExtraSmall,
        fontFamily : fonts.InterRegular
    },
    logoContainer:{
        flexDirection :"row",
        alignItems :"center",
        gap : Metrix.HorizontalSize(5)
    }
})

export default styles;