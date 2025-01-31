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
   
    popularListingsContainer: {
        paddingHorizontal: Metrix.HorizontalSize(15),
        // marginTop: Metrix.VerticalSize(15)
    },
    listingContainer: {
        width: Metrix.HorizontalSize(130),
        height: Metrix.VerticalSize(275),
    },
    categoryContainer: {
        paddingHorizontal: Metrix.HorizontalSize(15),
    },
    
    categoryList: {
        gap: Metrix.HorizontalSize(10),
        alignItems: "center",
        marginTop: Metrix.VerticalSize(15)
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
    

})

export default styles;