import { StyleSheet } from "react-native";
import colors from "../../../config/Colors";
import { Metrix } from "../../../config";
import fonts from "../../../config/Fonts";

const styles = StyleSheet.create({
    mySGItemsContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: Metrix.HorizontalSize(15)
    },
    topContainer: {
        marginTop: Metrix.VerticalSize(20),
        gap: Metrix.VerticalSize(7)
    },
    Container: {
        gap: Metrix.VerticalSize(10)
    },
    titleContainerText: {
        fontSize: Metrix.FontMedium,
        fontFamily: fonts.InterBold
    },
    itemsContainer: {
        borderWidth: 1,
        paddingTop: Metrix.HorizontalSize(20),
        borderColor: colors.borderColor,
        borderRadius: Metrix.VerticalSize(3),
    },
    postedImg: {
        width: Metrix.HorizontalSize(95),
        height: Metrix.HorizontalSize(95),
    },
    amount: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        gap: Metrix.HorizontalSize(5),
    },
    title: {
        fontSize: Metrix.FontMedium,
        fontFamily: fonts.InterSemiBold,
        color: colors.buttonColor
    },
    description: {
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterRegular,
        width: Metrix.HorizontalSize(200),
    },
    highestBidText: {
        fontSize: Metrix.FontRegular,
        fontFamily: fonts.InterSemiBold
    },
    bottomIcon: {
        flexDirection: "row",
        gap: Metrix.HorizontalSize(5),
        alignItems: "center"
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: Metrix.HorizontalSize(10),
        borderTopWidth: 1,
        borderColor: colors.borderColor,
        paddingVertical: Metrix.VerticalSize(15),
        marginTop: Metrix.VerticalSize(15)
    },
    draftsContainer: {
        borderWidth: 1,
        borderColor: colors.borderColor,
        padding : Metrix.VerticalSize(10),
        gap : Metrix.VerticalSize(10),
        borderRadius: Metrix.VerticalSize(3),
    },
    favouritesContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: colors.borderColor,
        gap : Metrix.HorizontalSize(10),
        padding : Metrix.VerticalSize(10),
        borderRadius: Metrix.VerticalSize(3),
    },
    draftButtonContainer:{
        flexDirection : "row",
        gap :Metrix.HorizontalSize(5),
        justifyContent : "flex-end",
    },
    favouritesButtonContainer:{
        flexDirection : "row",
        gap :Metrix.HorizontalSize(5),
        justifyContent : "flex-end",
        alignItems : "center",
        gap : Metrix.HorizontalSize(40)
    }
})

export default styles;