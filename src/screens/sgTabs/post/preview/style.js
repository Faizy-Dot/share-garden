import { StyleSheet } from "react-native";
import { Metrix } from "../../../../config";
import colors from "../../../../config/Colors";
import fonts from "../../../../config/Fonts";



const styles = StyleSheet.create({

    postContainer: {
        padding: Metrix.VerticalSize(10),
        flex: 1,
        backgroundColor: colors.white,
    }
    ,
    buttonsContainer: {
        flexDirection: "row",
        height: Metrix.VerticalSize(40),
        width: "100%",
        height: Metrix.VerticalSize(40),
    },
    button: {
        borderWidth: 1,
        borderColor: "#F3F3F3",
        flex: 1,
        height: Metrix.VerticalSize(40),
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterBold,
    },
    switchingCOntainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: Metrix.VerticalSize(15),
        justifyContent: "space-between"
    },
    Switch: {
        flexDirection: "row",
        alignItems: "center",
        gap: Metrix.HorizontalSize(5)
    },
    logos: {
        width: Metrix.HorizontalSize(16),
        height: Metrix.HorizontalSize(16)
    },

    inputsContainer: {
        marginTop: Metrix.VerticalSize(10),
        gap: Metrix.VerticalSize(10),
        marginBottom: Metrix.VerticalSize(30)
    },


    conditionContainer: {
        width: "100%",
        height: Metrix.VerticalSize(100),
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: Metrix.LightRadius,
        justifyContent: "center",
        gap: Metrix.VerticalSize(15),
        paddingHorizontal: 20
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8

    },
    checkboxText: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterRegular
    },

    checkBox: {
        width: Metrix.HorizontalSize(14),
        height: Metrix.HorizontalSize(14),
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    bottomButtons: {
        flexDirection: "row",
        gap: Metrix.HorizontalSize(10),
        paddingVertical : Metrix.VerticalSize(20)
    },
    middleContainer: {
        marginTop: Metrix.VerticalSize(10),
        gap: Metrix.VerticalSize(15)
    },
    middleBox: {
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: Metrix.VerticalSize(3)
    },
    imageContainer: {
        width: Metrix.HorizontalSize(100),
        height: Metrix.HorizontalSize(100),
        backgroundColor : colors.borderColor
    },
    updateImage: {
        width: Metrix.HorizontalSize(100),
        height: Metrix.HorizontalSize(100),
    },
    middleHeading: {
        fontSize: Metrix.FontRegular,
        fontFamily: fonts.InterBold,
        color: colors.buttonColor
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
    bitLogo: {
        width: Metrix.HorizontalSize(34),
        height: Metrix.HorizontalSize(32),
    },
    bidsValue: {
        fontSize: Metrix.FontExtraLarge,
        fontFamily: fonts.InterBold,
        color: colors.buttonColor
    },
    timeIcon: {
        width: Metrix.HorizontalSize(12),
        height: Metrix.HorizontalSize(12),
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
        height: Metrix.VerticalSize(40),
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
        alignSelf : "flex-end"
    }
})

export default styles;