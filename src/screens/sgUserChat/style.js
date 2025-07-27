import { StyleSheet } from "react-native";
import colors from "../../config/Colors";
import { Metrix } from "../../config";
import fonts from "../../config/Fonts";

const styles = StyleSheet.create({
    chatContainer: {
        flex: 1,
        backgroundColor: colors.white,
        width: "100%"
    },
    topContainer: {
        marginTop: Metrix.VerticalSize(30),
        paddingHorizontal: Metrix.HorizontalSize(23),
        gap: Metrix.VerticalSize(10),
        width: "100%"
    },
    chatLogo: {
        fontSize: Metrix.FontRegular,
        fontFamily: fonts.InterBold,
        color: colors.buttonColor,
        position: "relative",
        right: Metrix.HorizontalSize(10)
    },
    
    searchInput: {
        height: Metrix.HorizontalSize(40),
        backgroundColor: colors.inputBackgroundColor,
        borderRadius: Metrix.VerticalSize(24),
        width: "100%",
        borderWidth: 1,
        borderColor: colors.inputBackgroundColor,
        paddingLeft: Metrix.HorizontalSize(50)
    },
    searchInputContainer: {
        flexDirection: "row"
    },

    searchLogoContainer: {
        position: "absolute",
        zIndex: 1,
        backgroundColor: colors.white,
        height: Metrix.HorizontalSize(40),
        width: Metrix.HorizontalSize(40),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#EAF0F3"
    },
    searchLogo: {
        height: Metrix.HorizontalSize(19),
        width: Metrix.HorizontalSize(19),
    },
    chatImage: {
        height: Metrix.HorizontalSize(32),
        width: Metrix.HorizontalSize(32),
        borderRadius: Metrix.HorizontalSize(20),
    },
    chatBox: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: colors.borderColor,
        padding: Metrix.HorizontalSize(15),
        justifyContent: "space-between",
        alignItems: "center",
    },
    nameText: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterRegular
    },
    lastMessageText: {
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterLight,
    },
    dot: {
        height: Metrix.HorizontalSize(5),
        width: Metrix.HorizontalSize(5),
        backgroundColor: colors.borderColor,
        borderRadius: 2.5
    },
    messageCount: {
        height: Metrix.HorizontalSize(25),
        width: Metrix.HorizontalSize(25),
        backgroundColor: colors.buttonColor,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: Metrix.VerticalSize(12.5)
    },
    count: {
        fontSize: Metrix.normalize(15),
        fontFamily: fonts.InterBold,
        color: colors.white
    },
    noChatText: {
        textAlign: "center",
        fontSize: Metrix.FontRegular,
        fontFamily: fonts.InterRegular,
        marginTop : Metrix.VerticalSize(20)
    }
})

export default styles;