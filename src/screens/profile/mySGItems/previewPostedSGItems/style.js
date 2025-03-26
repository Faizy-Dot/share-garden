import { StyleSheet } from "react-native";
import colors from "../../../../config/Colors";
import { Metrix } from "../../../../config";
import fonts from "../../../../config/Fonts";

export const styles = StyleSheet.create({
    previewPostedSgItemsConatiner: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: Metrix.HorizontalSize(15)

    },
    topContainer: {
        marginTop: Metrix.VerticalSize(20),
        gap: Metrix.VerticalSize(7)
    },
    middleToBottomContainer: {
        gap: Metrix.VerticalSize(10),
        marginTop: Metrix.VerticalSize(15)
    },
    sameMiddleBox: {
        paddingHorizontal: Metrix.HorizontalSize(20),
    },
    bidEndsText: {
        fontSize: Metrix.FontMedium,
        fontFamily: fonts.InterSemiBold,
    },
    timerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        // borderWidth :1,
        // gap : 10
    },
    inputContainer: {
        alignItems: "flex-start",
        width: Metrix.HorizontalSize(50),
        height: Metrix.VerticalSize(60),

    },
    input: {
        width: Metrix.HorizontalSize(30),
        height: Metrix.VerticalSize(44),
        fontSize: Metrix.FontRegular,
        fontFamily: fonts.InterBold,
        paddingLeft: 0,
    },
    label: {
        fontSize: Metrix.FontExtraSmall,
        fontWeight: fonts.InterRegular,
        color: "#5A5A5A",
        position: "relative",
        bottom: Metrix.VerticalSize(7)

    },
    separator: {
        fontSize: Metrix.normalize(22),
        fontWeight: fonts.InterBold,
        color: colors.buttonColor,
        marginBottom: Metrix.VerticalSize(10),
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
        width: "95%",
        height: Metrix.VerticalSize(311),
        padding: Metrix.VerticalSize(20),
        marginBottom: Metrix.VerticalSize(100)
    },
    closeButton: {
        alignSelf: "flex-end"
    },
    modalInput: {
        width: Metrix.HorizontalSize(211),
        height: Metrix.VerticalSize(36),
        borderWidth: 1,
        borderColor: "#A8A7B0",
        fontFamily: fonts.InterBold,
        borderRadius: Metrix.VerticalSize(3)
    },
    container: {
        width: '100%',
        height: Metrix.VerticalSize(108),
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: Metrix.VerticalSize(3),
    },
    containerAccepted: {
        backgroundColor: '#F3F3F3',
        borderWidth: 0,
        height: Metrix.VerticalSize(160),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Metrix.VerticalSize(5),
        paddingHorizontal: Metrix.HorizontalSize(8),
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Metrix.HorizontalSize(5),
        paddingVertical: Metrix.VerticalSize(7),
    },
    profileImage: {
        width: Metrix.HorizontalSize(40),
        height: Metrix.HorizontalSize(40),
    },
    bidText: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterSemiBold,
    },
    bidName: {
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterSemiBold,
        color: colors.buttonColor,
    },
    notificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Metrix.HorizontalSize(15),
    },
    bidAmountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Metrix.HorizontalSize(8),
    },
    bidAmount: {
        fontSize: Metrix.FontMedium,
        fontFamily: fonts.InterSemiBold,
    },
    actionContainer: {
        flexDirection: 'row',
        gap: Metrix.HorizontalSize(10),
        paddingHorizontal: Metrix.HorizontalSize(8),
    },
    actionContainerAccepted: {
        paddingHorizontal: 0,
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#C4C4C4',
        padding: Metrix.VerticalSize(10),
    },
    bidStatus: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterBold,
        color: colors.buttonColor,
    },
    statusAccepted: {
        color: colors.black,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Metrix.VerticalSize(10),
        gap: Metrix.HorizontalSize(5),
        paddingLeft: Metrix.HorizontalSize(15),
    },
    awaitingText: {
        fontSize: Metrix.normalize(11),
        fontFamily: fonts.InterRegular,
    },

})