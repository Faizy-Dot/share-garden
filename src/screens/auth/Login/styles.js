import { StyleSheet } from "react-native";
import { Colors, Metrix } from "../../../config";
import colors from "../../../config/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Metrix.HorizontalSize(40),
    },
    logo: {
        width: Metrix.HorizontalSize(150),
        height: Metrix.VerticalSize(150),
        resizeMode: 'contain',
        marginBottom: Metrix.VerticalSize(30),
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#F6F6F6',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    forgotPassword: {
        color: '#666',
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
        width: '100%',
    },
    loginButton: {
        backgroundColor: colors.buttonColor,
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signupButton: {
        backgroundColor: colors.buttonColor,
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
        marginTop : Metrix.VerticalSize(30)
    },
    signupButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    orText: {
        color: '#999',
        marginBottom: 20,
        fontSize: 14,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    socialButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signUpText: {
        color: '#666',
        marginTop: 20,
        fontSize: 14,
    },
    signUpLink: {
        color: '#009688',
        fontWeight: 'bold',
    },
    socialButtonIcon: {
        fontSize: 25,
        marginRight: Metrix.HorizontalSize(20)
    }
});

export default styles;