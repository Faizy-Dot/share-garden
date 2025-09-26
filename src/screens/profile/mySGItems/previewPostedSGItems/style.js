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
        height: Metrix.VerticalSize(167),
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
        borderRadius : Metrix.HorizontalSize(20)
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
    acceptedInfoContainer: {
        alignItems: 'center',
        paddingVertical: Metrix.VerticalSize(10),
        gap: Metrix.HorizontalSize(5),
        paddingLeft: Metrix.HorizontalSize(15),
        flexDirection :"row"
    },
    awaitingText: {
        fontSize: Metrix.normalize(11),
        fontFamily: fonts.InterRegular,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: Metrix.VerticalSize(20),
      },
      titleText: {
        fontSize: Metrix.FontRegular,
        fontFamily: fonts.InterBold,
      },
      iconRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: Metrix.HorizontalSize(5),
      },
      minBidText: {
        fontSize: Metrix.FontMedium,
        fontFamily: fonts.InterSemiBold,
        color: colors.buttonColor,
      },
      topMiddleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: Metrix.HorizontalSize(8),
      },
      iconRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: Metrix.HorizontalSize(5),
      },
      iconText: {
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterBold,
      },
      closedBox: {
        height: Metrix.VerticalSize(48),
        backgroundColor: colors.buttonColor,
        borderRadius: Metrix.VerticalSize(3),
        justifyContent: "center",
        width: "100%",
      },
      openBox: {
        backgroundColor: colors.white,
        borderColor: colors.borderColor,
        borderWidth: 1,
        paddingTop: Metrix.VerticalSize(10),
        borderRadius: Metrix.VerticalSize(3),
        justifyContent: "center",
        width: "100%",
      },
      headerRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: Metrix.HorizontalSize(20),
      },
      arrowButton: {
        paddingLeft: Metrix.HorizontalSize(20),
      },
      headerText: {
        fontSize: Metrix.FontRegular,
        fontFamily: fonts.InterSemiBold,
        color: colors.white,
      },
      headerTextBlack: {
        color: colors.black,
      },
      itemDetailsContainer: {
        paddingVertical: Metrix.VerticalSize(20),
        gap: Metrix.VerticalSize(10),
      },
      itemImage: {
        width: "100%",
        height: Metrix.VerticalSize(177),
      },
      itemDescription: {
        paddingLeft: Metrix.HorizontalSize(15),
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterRegular,
      },
      bidDetailsContainer: {
        paddingVertical: Metrix.VerticalSize(10),
        gap: Metrix.VerticalSize(10),
        marginTop: Metrix.VerticalSize(10),
      },
      bidSummaryBox: {
        height: Metrix.VerticalSize(48),
        width: "100%",
        backgroundColor: "#DADADA",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.borderColor,
      },
      bidSummaryText: {
        fontSize: Metrix.normalize(13),
        fontFamily: fonts.InterBold,
        color: colors.buttonColor,
      },
      bidValue: {
        color: colors.black,
      },
      sameMiddleBox: {
        flexDirection: "row",
        gap: Metrix.HorizontalSize(29),
        justifyContent : "center"
      },
      timeRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: Metrix.HorizontalSize(15),
      },
      bidEndsText: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterBold,
      },
   
      timeInputRow: {
        flexDirection: "row",
        alignItems: "center",
      },
      modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        paddingHorizontal : Metrix.HorizontalSize(15)
      },
      modalBox: {
        backgroundColor: colors.white,
        borderRadius: Metrix.VerticalSize(10),
        width:"100%",
        padding: Metrix.VerticalSize(20),
        alignItems: "center",
      },
      closeButton: {
        alignSelf: "flex-end",
      },
      modalContent: {
        marginTop: Metrix.VerticalSize(20),
        gap: Metrix.VerticalSize(30),
        alignItems: "center",
      },
      modalTitle: {
        fontSize: Metrix.FontRegular,
        fontFamily: fonts.InterSemiBold,
        textAlign: "center",
      },
      modalInputContainer: {
        alignItems: "center",
        gap: Metrix.VerticalSize(20),
      },
      inputRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: Metrix.HorizontalSize(10),
      },
      modalLabel: {
        fontSize: Metrix.FontRegular,
        fontFamily: fonts.InterSemiBold,
      },
      modalInput: {
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: Metrix.VerticalSize(5),
        paddingHorizontal: Metrix.HorizontalSize(10),
        width: Metrix.HorizontalSize(211),
        height: Metrix.VerticalSize(40),
        fontSize: Metrix.FontRegular,
        fontFamily: fonts.InterRegular,
        color: colors.black,
      },
      infoContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: Metrix.HorizontalSize(10),
        paddingHorizontal: Metrix.HorizontalSize(40),
      },
      infoText: {
        fontSize: Metrix.normalize(11),
        fontFamily: fonts.InterRegular,
        color: "#646464",
      },
     
 middleBox: {
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: Metrix.VerticalSize(3)
    },
    imageContainer: {
        width: Metrix.HorizontalSize(110),
        height: Metrix.HorizontalSize(110),
        backgroundColor : colors.borderColor
    },
       updateImage: {
        width: Metrix.HorizontalSize(110),
        height: Metrix.HorizontalSize(110),
    },
       middleTitle: {
        fontSize: Metrix.FontMedium,
        fontFamily: fonts.InterSemiBold,
        paddingVertical : 20
    },
    middleDescription: {
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterRegular,
    },
    sameMiddleBox: {
        borderBottomWidth: 1,
        paddingHorizontal: Metrix.HorizontalSize(20),
        borderColor: colors.borderColor,
        paddingVertical: Metrix.VerticalSize(15)
    },
    itemConditionText: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterSemiBold,
    },
       bidsValue: {
        fontSize: Metrix.FontExtraLarge,
        fontFamily: fonts.InterBold,
        color: colors.buttonColor
    },
})