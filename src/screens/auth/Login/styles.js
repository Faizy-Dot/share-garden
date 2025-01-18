import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrix } from "../../../config";
import fonts from "../../../config/Fonts";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    logo: {
        width: Metrix.HorizontalSize(156),
        height: Metrix.VerticalSize(96),
        resizeMode: 'contain',
        marginTop: Metrix.VerticalSize(65)
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: Metrix.VerticalSize(65)
    },
    input: {
        backgroundColor: '#FCFCFC',
        borderRadius: Metrix.LightRadius,
        width: Metrix.HorizontalSize(320),
        height: Metrix.VerticalSize(40),
        marginBottom: Metrix.VerticalSize(10),
        borderWidth: 1,
        borderColor: '#EAEAEA',
        padding: Metrix.HorizontalSize(10),
        fontSize: Metrix.FontExtraSmall,
        fontFamily : fonts.InterSemiBold
    },
    forgotPassword: {
        color: '#000000',
        fontSize: Metrix.FontExtraSmall,
        fontWeight: 500,
        marginBottom: Metrix.VerticalSize(20),
        textAlign: 'center',
        width: '100%',
    },
    orText: {
        color: '#000000',
        fontSize: Metrix.FontSmall,
        fontWeight: "500",
        margin: Metrix.VerticalSize(16)
    },

    socialButtonIcon: {
        fontSize: Metrix.FontLarge,
        marginRight: Metrix.HorizontalSize(20),
    },
    
    skipText: {
        fontSize: Metrix.FontRegular,
        fontFamily: Fonts.InterBold,
    },
    skip: {
        position: "absolute",
        bottom: Metrix.VerticalSize(-50),
        right: Metrix.HorizontalSize(30),
    }
});

export default styles;