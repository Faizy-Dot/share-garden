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
        height :Metrix.VerticalSize(60)
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
        padding: Metrix.VerticalSize(10),
        gap: Metrix.VerticalSize(10),
        borderRadius: Metrix.VerticalSize(3),
    },
    favouritesContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: colors.borderColor,
        gap: Metrix.HorizontalSize(10),
        padding: Metrix.VerticalSize(10),
        borderRadius: Metrix.VerticalSize(3),
    },
    draftButtonContainer: {
        flexDirection: "row",
        gap: Metrix.HorizontalSize(5),
        justifyContent: "flex-end",
    },
    favouritesButtonContainer: {
        flexDirection: "row",
        gap: Metrix.HorizontalSize(5),
        justifyContent: "flex-end",
        alignItems: "center",
        gap: Metrix.HorizontalSize(40)
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)", // Transparent background
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        backgroundColor: colors.white,
        borderRadius: Metrix.VerticalSize(15),
        alignItems: "center",
        justifyContent: "space-between",
        width: "95%",
        height: Metrix.VerticalSize(270),
        padding: Metrix.VerticalSize(20),
    },
    modalTitle: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterBold,
        width: Metrix.HorizontalSize(200),
        textAlign: "center"
    },
    successIcon: {
        width: Metrix.HorizontalSize(50),
        height: Metrix.HorizontalSize(50),
    },
    bottomModalContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: Metrix.HorizontalSize(10),
        paddingHorizontal: Metrix.HorizontalSize(20)
    },
    modalDescription: {
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterSemiBold,
    },
    closeButton: {
        alignSelf: "flex-end"
    },
    soldBadge: {
        backgroundColor: colors.green,
        paddingHorizontal: Metrix.HorizontalSize(8),
        paddingVertical: Metrix.VerticalSize(4),
        borderRadius: Metrix.VerticalSize(4),
    },
    soldText: {
        color: colors.white,
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterBold,
    },
    soldBottomContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    soldDateText: {
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterRegular,
        color: colors.grey,
    },
})

export default styles;