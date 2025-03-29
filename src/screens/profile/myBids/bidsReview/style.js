import { StyleSheet } from "react-native";
import { Metrix } from "../../../../config";
import colors from "../../../../config/Colors";
import fonts from "../../../../config/Fonts";



const styles = StyleSheet.create({
    BidsReviewContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    topContainer: {
        marginTop: Metrix.VerticalSize(30),
        paddingHorizontal: Metrix.HorizontalSize(15),
        gap: Metrix.VerticalSize(5),
        borderBottomWidth: 1,
        borderColor: "#C4C4C4",
        paddingBottom: Metrix.VerticalSize(30)
    },
    profileImage: {
        width: Metrix.HorizontalSize(40),
        height: Metrix.HorizontalSize(40),
        borderRadius: Metrix.HorizontalSize(20)
    },
    bidHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: Metrix.VerticalSize(10),
        paddingHorizontal: Metrix.HorizontalSize(25),
        borderBottomWidth: 1,
        borderColor: "#C4C4C4",
        width: "100%",
    },
    bidHeaderLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: Metrix.VerticalSize(10),
        flex: 1,
        marginRight: Metrix.HorizontalSize(10),
    },
    titleText: {
        fontSize: Metrix.FontRegular,
        fontFamily: fonts.InterBold,
        flexShrink: 1,
    },
    subtitleText: {
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterSemiBold,
        color: colors.buttonColor,
        flexShrink: 1,
    },
    publishDateText: {
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterRegular,
        flexShrink: 1,
    },
    bidHeaderRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: Metrix.VerticalSize(10),
        flexShrink: 0,
    },
    bitValue: {
        fontSize: Metrix.normalize(25),
        fontFamily: fonts.InterSemiBold,
    },
    chatContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#C4C4C4",
        justifyContent: "center",
        paddingVertical: Metrix.VerticalSize(10),
        gap: Metrix.HorizontalSize(10),
    },
    chatText: {
        fontSize: Metrix.normalize(14),
        fontFamily: fonts.InterBold,
    },
    redText: {
        color: colors.redColor,
    },
    bidInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: Metrix.HorizontalSize(25),
        borderBottomWidth: 1,
        borderColor: "#C4C4C4",
        paddingVertical: Metrix.VerticalSize(10),
    },
    myBidText: {
        fontSize: Metrix.FontRegular,
        fontFamily: fonts.InterSemiBold,
    },
    myBidAcceptedText: {
        fontSize: Metrix.FontRegular,
        fontFamily: fonts.InterSemiBold,
        color: colors.buttonColor,
    },
    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: Metrix.HorizontalSize(10),
    },
    buttonsContainer: {
        marginTop: Metrix.VerticalSize(15),
        paddingHorizontal: Metrix.HorizontalSize(15),
        gap: Metrix.VerticalSize(7),
    },
    buttonWrapper: {
        borderWidth: 1,
        borderColor: "#C4C4C4",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: Metrix.VerticalSize(15),
        gap: Metrix.VerticalSize(15),
        borderRadius: Metrix.VerticalSize(5),
    },
    infoWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: Metrix.HorizontalSize(10),
        marginTop: Metrix.VerticalSize(10),
        paddingHorizontal: Metrix.HorizontalSize(20),
    },
    infoText: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterRegular,
        color: colors.black,
        lineHeight: Metrix.FontSmall * 1.5,
    },
    confirmWrapper: {
        borderWidth: 1,
        borderColor: "#C4C4C4",
        width: "100%",
        height: Metrix.VerticalSize(160),
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: Metrix.VerticalSize(15),
        gap: Metrix.VerticalSize(15),
        borderRadius: Metrix.VerticalSize(5),
        paddingHorizontal: Metrix.HorizontalSize(25),
    },
    confirmInfoWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        gap: Metrix.HorizontalSize(5),
    },
    confirmInfoText: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterSemiBold,

    },
    closeButton: {
        alignSelf: "flex-end"
    },

    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)", // Transparent background
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        marginTop: Metrix.VerticalSize(180),
        backgroundColor: colors.white,
        borderRadius: Metrix.VerticalSize(15),
        alignItems: "center",
        // justifyContent: "space-between",
        width: "95%",
        height: Metrix.VerticalSize(330),
        padding: Metrix.VerticalSize(20),
    },
    tradeProgress: {
        fontSize: Metrix.FontLarge,
        fontFamily: fonts.InterBold,
        color: colors.buttonColor
    },
    modalContentWrapper: { marginTop: Metrix.VerticalSize(25), alignItems: 'center', gap: Metrix.VerticalSize(10) },
    modalSmallText: { fontSize: Metrix.FontSmall, fontFamily: fonts.InterRegular },
    modalRegularText: { fontSize: Metrix.FontRegular, fontFamily: fonts.InterSemiBold, textAlign: 'center' },
    modalSmallBoldText: { fontSize: Metrix.FontSmall, fontFamily: fonts.InterSemiBold, textAlign: 'center' },
    tradeIdText: { fontSize: Metrix.FontMedium, fontFamily: fonts.InterBold },
    tradeIdHighlight: { color: colors.buttonColor },
    modalCenterText: { textAlign: 'center', fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterSemiBold },
    modalGap: { gap: Metrix.VerticalSize(10) },
    transferText: { fontSize: Metrix.FontMedium, fontFamily: fonts.InterBold, textAlign: 'center' },
    modalSmallCenterText: { fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterSemiBold, textAlign: 'center' },
    thanksText: { fontSize: Metrix.FontMedium, fontFamily: fonts.InterBold },
})

export default styles; 