import { StyleSheet } from "react-native";
import colors from "../../../config/Colors";
import { Colors, Fonts, Metrix } from "../../../config";
import fonts from "../../../config/Fonts";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: Metrix.VerticalSize(25)
    },
    logo: {
        width: Metrix.HorizontalSize(171),
        height: Metrix.VerticalSize(43)
    },
    header: {
        marginTop: Metrix.VerticalSize(20)
    },
    locationLogo: {
        width: Metrix.HorizontalSize(15),
        height: Metrix.VerticalSize(22)
    },
    address: {
        flexDirection: "row",
        alignItems: "center",
        gap: Metrix.HorizontalSize(10),
        justifyContent: "flex-start",
        width: "100%",
        paddingHorizontal: Metrix.HorizontalSize(15),
    },
    inputContainer: {
        flexDirection: "row",
        marginTop: Metrix.VerticalSize(20),
        alignItems: "center",
        gap: Metrix.HorizontalSize(14),
        width: "100%",
        paddingHorizontal: Metrix.HorizontalSize(15),
    },
    input: {
        width: Metrix.HorizontalSize(300),
        height: Metrix.VerticalSize(60),
        backgroundColor: "#F3F3F3",
        borderColor: "#E6E6E6",
        borderWidth: 1,
        borderRadius: Metrix.LightRadius,
        paddingLeft: Metrix.HorizontalSize(45),
        fontSize: Metrix.FontRegular,
        fontFamily: Fonts.InterSemiBold
    },
    filterLogo: {
        width: Metrix.HorizontalSize(20),
        height: Metrix.VerticalSize(15)
    },
    searchIcon: {
        width: Metrix.HorizontalSize(25),
        height: Metrix.VerticalSize(27),
        position: "absolute",
        left: Metrix.HorizontalSize(23),
        zIndex: 1
    },

    middle: {
        marginTop: Metrix.VerticalSize(15),
        width: "100%",

    },
    homeBackgroundImg: {
        backgroundColor: "#F3F3F3",
        width: "100%",
        height: Metrix.VerticalSize(174),
    },
    middleLogo: {
        width: Metrix.VerticalSize(171),
        height: Metrix.VerticalSize(43),
    },
    middleShown: {
        position: "absolute",
        gap: 10,
        width: "100%",
        alignItems: "center"
    },
    categoryContainer: {
        paddingHorizontal: Metrix.HorizontalSize(15),
        marginTop: Metrix.VerticalSize(15)
    },
    categoryList: {
        flexDirection: "row",
        gap: Metrix.HorizontalSize(10),
        alignItems: "center",
        marginTop: Metrix.VerticalSize(15)
    },
    category: {
        backgroundColor: "#F3F3F3",
        width: Metrix.HorizontalSize(64),
        height: Metrix.HorizontalSize(64),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 32
    },

    categoryText: {
        textAlign: "center",
        marginTop: Metrix.VerticalSize(10)
    },
    popularListingsContainer: {
        paddingHorizontal: Metrix.HorizontalSize(15),
        // marginTop: Metrix.VerticalSize(15)
    },
    listingContainer: {
        width: Metrix.HorizontalSize(130),
        height: Metrix.VerticalSize(275),
    },
    listingImage: {
        width: "100%",
        height: Metrix.VerticalSize(167),
        borderRadius: Metrix.LightRadius,
        resizeMode: "contain"
    },
    listingTitle: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterSemiBold,
        marginTop: Metrix.VerticalSize(15),
        height: Metrix.VerticalSize(21),
        width: "100%",
    },
    listingLocation: {
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterRegular,
        marginTop: Metrix.VerticalSize(4),
        height: Metrix.VerticalSize(30),
        width: "100%",
    },
    listingPrice: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterSemiBold,
        color: colors.buttonColor,
        height: Metrix.VerticalSize(22),
        width: "100%",
    },

    priceContainer: {
        marginTop: Metrix.VerticalSize(10),
        flexDirection: "row",
        alignItems: "center",
        gap: Metrix.HorizontalSize(5)
    },
    merchantShowcaseContainer: {
        paddingHorizontal: Metrix.HorizontalSize(15),
        marginTop: Metrix.VerticalSize(25),
        gap: Metrix.VerticalSize(10)
    },
    merchantImg: {
        width: Metrix.HorizontalSize(200),
        height: Metrix.VerticalSize(96),
        resizeMode: "contain"
    },
    postContainer: {
        paddingHorizontal: Metrix.HorizontalSize(15),
        marginTop: Metrix.VerticalSize(25),
    },
    myPost: {
        gap: Metrix.HorizontalSize(10),
        alignItems: "center",
        marginTop: 15
    },
    postBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: Metrix.HorizontalSize(12),
        borderWidth: 1,
        borderColor: "#E6E6E6",
        borderRadius: Metrix.LightRadius,
        width: Metrix.HorizontalSize(160),
        height: Metrix.VerticalSize(48),
        justifyContent: "center",
        alignItems: "center"
    },
    userDetail: {
        flexDirection: "row",
        alignItems: "center",
        gap : Metrix.HorizontalSize(18),
        marginBottom : Metrix.VerticalSize(9)
    },

    profile: {
        width: Metrix.HorizontalSize(32),
        height: Metrix.HorizontalSize(32),
    },
    bellIcon: {
        width: Metrix.HorizontalSize(18),
        height: Metrix.HorizontalSize(18),
    },
    messageIcon: {
        width: Metrix.HorizontalSize(18),
        height: Metrix.HorizontalSize(18),
    },
    greenBit: {
        width: Metrix.VerticalSize(24),
        height: Metrix.VerticalSize(24),
    },

})

export default styles;