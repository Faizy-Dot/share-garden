import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrix } from "../../../config";

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
        marginRight: Metrix.HorizontalSize(20)
    },
    skipText: {
        // fontWeight: "500",
        fontSize: Metrix.FontRegular,
        textAlign : "right",
        fontFamily:Fonts.InterBold,
    },
    skip: {
        marginTop: Metrix.VerticalSize(50),
        flex : 1,
        width : "100%",
        marginRight : Metrix.HorizontalSize(20)
    }
});

export default styles;