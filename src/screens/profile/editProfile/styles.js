import { StyleSheet } from "react-native";
import colors from "../../../config/Colors";
import { Metrix } from "../../../config";
import fonts from "../../../config/Fonts";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    content: {
        flex: 1,
    },
    logo: {
        width: Metrix.HorizontalSize(114),
        height: Metrix.HorizontalSize(84),
        resizeMode: "contain"
    },
    editProfileContainer: {
        alignItems: "center",
        width: "100%",
        marginTop: Metrix.VerticalSize(15),
        paddingHorizontal : Metrix.HorizontalSize(15),
        gap : 10
    },
    inputContainer:{
        alignItems: "center",
        width: "100%",
        marginTop: Metrix.VerticalSize(15),
        gap : 10
    },
    inputs: {
        borderWidth: 1,
        borderColor: colors.borderColor,
        width: "100%",
        borderRadius :Metrix.LightRadius,
        backgroundColor: "#F3F3F3",
        padding : Metrix.HorizontalSize(15),
        fontSize : Metrix.FontMedium,
        fontFamily : fonts.InterSemiBold
    },
    title:{
fontSize : Metrix.FontLarge,
fontFamily : fonts.InterBold
    },
    tabBarContainer: {
        flexDirection: 'row',
        height: Metrix.VerticalSize(60),
        width: "100%",
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.borderColor,
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabLabel: {
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterMedium,
        marginTop: Metrix.VerticalSize(2),
    },
    profile: {
        width: Metrix.HorizontalSize(110),
        height: Metrix.HorizontalSize(110),
    }

});

export default styles;