import { StyleSheet } from "react-native";
import colors from "../../config/Colors";
import { Metrix } from "../../config";
import fonts from "../../config/Fonts";

const styles = StyleSheet.create({
    notificationContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    topContainer: {
        marginTop: Metrix.VerticalSize(30),
        paddingHorizontal: Metrix.HorizontalSize(23),
        gap: Metrix.VerticalSize(10),
        borderBottomWidth: 2,
        borderColor: colors.borderColor,
        paddingBottom: Metrix.VerticalSize(30)
    },
    flatlistContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: colors.borderColor,
        alignItems : "center",
        padding : 20,
        gap : 20
    },
    textContainer: {
        flex: 1
    },
    title: {
        fontSize: Metrix.FontRegular,
        fontFamily: fonts.InterBold,
        color: colors.buttonColor,
        marginBottom: 4
    },
    description: {
        fontSize: Metrix.normalize(13),
        fontFamily: fonts.InterRegular,
        color: colors.black,
        lineHeight: 18
    },
    imageContainer: {
        width : Metrix.HorizontalSize(56),
        height : Metrix.HorizontalSize(56),
        alignItems : "center",
        justifyContent : "center",
        borderRadius: Metrix.VerticalSize(8),
        overflow: 'hidden',
        backgroundColor: colors.lightGray
    },
    notificationImage: {
        width: '100%',
        height: '100%'
    }
})

export default styles;