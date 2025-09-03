import { StyleSheet } from "react-native";
import colors from "../../../../config/Colors";
import { Metrix } from "../../../../config";
import fonts from "../../../../config/Fonts";

const styles = StyleSheet.create({
    forgotPasswordContainer: {
        flex: 1,
        backgroundColor: colors.white,
        width: "100%",
        paddingHorizontal: Metrix.HorizontalSize(30)
    },
    OneTimePassword: {
        flex: 1,
        backgroundColor: colors.white,
        width: "100%",
        paddingHorizontal: Metrix.HorizontalSize(50)
    },
    resetPasswordContainer: {
        flex: 1,
        backgroundColor: colors.white,
        width: "100%",
        paddingHorizontal: Metrix.HorizontalSize(30)
    },
    logo: {
        width: Metrix.HorizontalSize(156),
        height: Metrix.VerticalSize(96),
        resizeMode: "contain",
        marginTop: Metrix.VerticalSize(70),
    },
    input: {
        backgroundColor: "#FCFCFC",
        borderColor: colors.borderColor,
        borderWidth: 1,
        width: "100%",
        paddingLeft: Metrix.HorizontalSize(25),
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterRegular,
        borderRadius: Metrix.LightRadius,
        height: Metrix.VerticalSize(45),
    },
    emailContainer: {
        width: "100%",
        gap: Metrix.VerticalSize(30),
        marginTop: Metrix.VerticalSize(50)
    },
    description: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterBold, // Replace with your font family
        color: colors.black,
        marginBottom: Metrix.VerticalSize(10),
    },
    otpInputsContainer: {
        flexDirection: 'row',
       justifyContent : "space-between",
        marginBottom: Metrix.VerticalSize(30),
        width: '100%', // Adjust as needed
    },
    otpInput: {
        width: Metrix.HorizontalSize(50),
        height: Metrix.VerticalSize(50),
        backgroundColor: '#F3F3F3',
        borderColor: '#E6E6E6',
        borderWidth: 1,
        borderRadius: Metrix.LightRadius,
        textAlign: 'center',
        fontSize: Metrix.FontLarge,
        fontFamily: 'InterBold', // Replace with your font family
        color: '#333',
    },
    passwordContainer:{
        width : "100%",
        gap : Metrix.HorizontalSize(10),
        marginBottom : Metrix.VerticalSize(30)
    },
    eyeContainer: {
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
    },
    eyeIcon: {
        position: "absolute",
        right: Metrix.HorizontalSize(10)
    },
    passwordValidationContainer: {
        marginTop: Metrix.VerticalSize(5),
        marginBottom: Metrix.VerticalSize(10),
        padding: Metrix.HorizontalSize(10),
        backgroundColor: '#f9f9f9',
        borderRadius: Metrix.HorizontalSize(4),
        borderWidth: 1,
        borderColor: '#EAEAEA',
    },
    validationTitle: {
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterRegular,
        marginBottom: Metrix.VerticalSize(5),
        fontWeight: '500',
    },
    validationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Metrix.VerticalSize(2),
    },
    validationText: {
        fontSize: Metrix.FontExtraSmall - 1,
        fontFamily: fonts.InterRegular,
        marginLeft: Metrix.HorizontalSize(5),
    },
    validRequirement: {
        color: colors.greenColor,
    },
    invalidRequirement: {
        color: colors.redColor,
    },
    errorText: {
        color: colors.redColor,
        fontSize: Metrix.FontExtraSmall,
        marginLeft: 4,
        marginTop: Metrix.VerticalSize(2)
    },
    resendText: {
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterRegular,
        color: colors.black,
        textAlign: 'center',
    },
    resendLink: {
        color: colors.buttonColor,
        fontFamily: fonts.InterBold,
        textDecorationLine: 'underline',
    },
    cooldownText: {
        color: colors.grayColor || '#999',
        fontFamily: fonts.InterRegular,
    },
    disabledLink: {
        color: colors.grayColor || '#999',
        opacity: 0.6,
    }
})

export default styles;