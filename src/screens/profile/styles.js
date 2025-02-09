import { StyleSheet } from "react-native";
import colors from "../../config/Colors";
import { Fonts, Metrix } from "../../config";
import fonts from "../../config/Fonts";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    content: {
        flex: 1,
    },
    profileImg: {
        width: Metrix.HorizontalSize(64),
        height: Metrix.HorizontalSize(64)
    },
    navBar: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: Metrix.HorizontalSize(20),
        marginTop: Metrix.VerticalSize(12)
    },

    geenBitImg: {
        width: Metrix.HorizontalSize(24),
        height: Metrix.HorizontalSize(24),
    },
    messageIcon: {
        width: Metrix.HorizontalSize(20),
        height: Metrix.HorizontalSize(20),
    },
    bellIcon: {
        width: Metrix.HorizontalSize(20),
        height: Metrix.HorizontalSize(20),
    },
    userName: {
        fontSize: Metrix.FontRegular,
        fontFamily: fonts.InterSemiBold,
        width : Metrix.HorizontalSize(105)
    },
    editProfile: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterBold,
        textDecorationLine: "underline",
        color: colors.buttonColor,
        
    },
    title: {
        fontSize: Metrix.FontMedium,
        fontFamily: fonts.InterBold,
        color: colors.buttonColor
    },
    description: {
        fontSize: Metrix.normalize(13),
        fontFamily: fonts.InterRegular
    },
    profileDataContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        padding: 13,
        borderBottomColor: colors.borderColor,
        marginHorizontal : Metrix.HorizontalSize(15)
    },
    helpBox: {
        borderTopWidth: Metrix.VerticalSize(10),
        borderBottomWidth: Metrix.VerticalSize(10),
        borderColor: colors.buttonColor,
        marginHorizontal : 0,
        paddingHorizontal : Metrix.HorizontalSize(27)
    },
    profileContainer: {
        width: Metrix.HorizontalSize(64),
        height: Metrix.HorizontalSize(64),
        borderRadius: Metrix.VerticalSize(32),  // Half of width/height to make it a circle
        overflow: "hidden", // Ensures the image is clipped to the circular shape
        borderWidth: 1,
        borderColor: colors.borderColor,
        justifyContent: "center",
        alignItems: "center",
    },
    
    profileImage: {
        width: "100%",
        height: "100%",
        borderRadius:  Metrix.VerticalSize(16), // Ensures the image itself is also rounded
    },
});

export default styles;