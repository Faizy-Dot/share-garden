import { StyleSheet } from "react-native"
import colors from "../../../config/Colors"
import { Metrix } from "../../../config"
import fonts from "../../../config/Fonts"


export const styles = StyleSheet.create({
    adsContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: Metrix.HorizontalSize(15)
    },
    topContainer: {
        marginTop: Metrix.VerticalSize(15),
        gap: Metrix.HorizontalSize(10),
        width: "100%"
    },
    bottomContainer: {
        marginTop: Metrix.VerticalSize(5),

    },
    adsDataStyle: {
        gap: Metrix.HorizontalSize(12),

    },
    image: {
        height: Metrix.VerticalSize(178),
        width: Metrix.HorizontalSize(136),
        resizeMode: "contain",
    },
    textContainer: {
        
    },
    title: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterSemiBold
    },
    description: {
        fontSize: Metrix.normalize(8),
        fontFamily : fonts.InterRegular,
        color : "#168679",
        height : 22
    },
    adsDataContainer: {
        height: Metrix.VerticalSize(270),
        width: Metrix.HorizontalSize(136),
        gap: Metrix.VerticalSize(15)

    },
    locationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    locationText:{
        fontSize: Metrix.normalize(8),
        fontFamily : fonts.InterRegular,
        color : "#646262"
    }
})