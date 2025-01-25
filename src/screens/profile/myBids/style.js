import { StyleSheet } from "react-native";
import colors from "../../../config/Colors";
import { Metrix } from "../../../config";
import fonts from "../../../config/Fonts";

const styles = StyleSheet.create({
    myBidsContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    topContainer: {
        marginTop: Metrix.VerticalSize(30),
        paddingHorizontal: Metrix.HorizontalSize(15),
        gap: Metrix.VerticalSize(5),
        borderBottomWidth: 1,
        borderColor: colors.borderColor,
        paddingBottom: Metrix.VerticalSize(30)
    },
    renderMyBidsContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: colors.borderColor,
        paddingVertical : Metrix.VerticalSize(15),
        paddingHorizontal : Metrix.VerticalSize(30),
        justifyContent : "space-between",
        alignItems : "center"
    },
    title: {
        fontSize: Metrix.FontRegular,
        fontFamily: fonts.InterBold,
        color: colors.buttonColor
    },
    description: {
        fontSize: Metrix.normalize(13),
        fontFamily: fonts.InterRegular,
    },
    bidIcon:{
        width : Metrix.HorizontalSize(30),
        height : Metrix.HorizontalSize(30),
    },
    messageIcon:{
        width : Metrix.HorizontalSize(18),
        height : Metrix.HorizontalSize(18),
    }
})

export default styles;