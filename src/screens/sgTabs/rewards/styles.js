import { StyleSheet } from "react-native";
import colors from "../../../config/Colors";
import { Metrix } from "../../../config";
import fonts from "../../../config/Fonts";


const styles = StyleSheet.create({
    rewardsContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    topContainer: {
        gap: Metrix.VerticalSize(10),
        marginTop: Metrix.VerticalSize(10)
    }
    ,
    buttonsContainer: {
        flexDirection: "row",
        width: "100%",
        gap: Metrix.HorizontalSize(3),
    },
    button: {
        textAlign: "center",
        flex: 1,
        borderBottomWidth: Metrix.HorizontalSize(5),
        borderColor: colors.buttonColor,
        height: Metrix.VerticalSize(32),
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterSemiBold
    },
    middleContainer: {
        gap: Metrix.HorizontalSize(10),
        justifyContent: "center",
        alignItems: 'center',
        marginTop: Metrix.VerticalSize(35)
    },
    profile: {
        width: Metrix.HorizontalSize(62),
        height: Metrix.HorizontalSize(62),
    },
    sameText1: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterRegular
    },
    sameText2: {
        fontSize: Metrix.normalize(20),
        fontFamily: fonts.InterBold
    },
    ratingText: {
        fontSize: Metrix.normalize(26),
        fontFamily: fonts.InterBold,
        marginLeft: Metrix.HorizontalSize(10)
    },
    bottomContainer: {
        width: "100%",
        marginTop: Metrix.VerticalSize(20),
        flex : 1
    },
    titleText: {
        fontSize: Metrix.normalize(14),
        fontFamily: fonts.InterBold,
        color: colors.buttonColor
    },
    itemsIdText: {
        fontSize: Metrix.normalize(11),
        fontFamily: fonts.InterSemiBold,
    },
    bitText: {
        fontSize: Metrix.normalize(20),
        fontFamily: fonts.InterBold,

    },
    resultsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 40,
        borderBottomWidth: 1,
        paddingVertical: Metrix.VerticalSize(10),
        borderStyle: "dotted",

    },
    bitContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: Metrix.HorizontalSize(68)
    },
    starImg:{
        width : Metrix.HorizontalSize(25),
        height : Metrix.HorizontalSize(25),
    },
    arrowImg:{
        width : Metrix.HorizontalSize(16),
        height : Metrix.HorizontalSize(9),
    },
    bitImg:{
        width : Metrix.HorizontalSize(16),
        height : Metrix.HorizontalSize(16),
    }
})


export default styles;