import { StyleSheet } from "react-native";
import colors from "../../../config/Colors";
import { Metrix } from "../../../config";
import fonts from "../../../config/Fonts";

const styles = StyleSheet.create({
    helpAndSupportContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    topContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: Metrix.HorizontalSize(15),
        paddingHorizontal: Metrix.HorizontalSize(35),
        marginTop: Metrix.VerticalSize(20)
    },
    topTitle: {
        fontSize: Metrix.FontMedium,
        fontFamily: fonts.InterSemiBold
    },
    middleContainer: {
        alignItems: "center",
        gap: Metrix.VerticalSize(15),
        marginTop: Metrix.VerticalSize(50)
    },
    logo: {
        width: Metrix.HorizontalSize(145),
        height: Metrix.HorizontalSize(89),
        marginBottom: Metrix.VerticalSize(10)
    },
    helpText: {
        fontSize: Metrix.FontMedium,
        fontFamily: fonts.InterBold,
        color: colors.buttonColor,
        textAlign: "center"
    },
    termsText: {
        fontSize: Metrix.normalize(15),
        fontFamily: fonts.InterRegular,
        textAlign: "center"
    },
    middleInputContainer: {
        height: Metrix.VerticalSize(108),
        backgroundColor: colors.buttonColor,
        width: "100%",
        paddingHorizontal: 30,
        justifyContent: "center"
    },

    bottomContainer: {
        paddingHorizontal: Metrix.HorizontalSize(25)
    },
    bottomInputs: {
        width: "100",
        height: Metrix.VerticalSize(40),
        backgroundColor: "#FCFCFC",
        borderColor: "#E4E4E4",
        borderWidth: 1
    },

    bottomSendText: {
        fontSize: Metrix.normalize(28),
        fontFamily: fonts.InterBold,
        marginVertical : Metrix.VerticalSize(10)
    },
    bottomHelpText: {
        fontSize: Metrix.FontMedium,
        fontFamily: fonts.InterBold,
        color : colors.buttonColor,
        marginTop : Metrix.VerticalSize(20)
    },
    bottomInputLabel: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterBold,
        marginBottom : Metrix.VerticalSize(5)
    }


})

export default styles;