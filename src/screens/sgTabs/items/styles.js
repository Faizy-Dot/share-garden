import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../config/Colors";
import { Colors, Fonts, Metrix } from "../../../config";
import fonts from "../../../config/Fonts";

const { width } = Dimensions.get('window');
const productWidth = (width - (Metrix.HorizontalSize(40))) / 3; // 40 = padding (15+15) + gaps between items (5+5)

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
        width: Metrix.HorizontalSize(120),
        height: Metrix.VerticalSize(40),
        resizeMode: 'contain',
    },
    header: {
        paddingTop: Metrix.VerticalSize(15),
        paddingHorizontal: Metrix.HorizontalSize(15),
        alignItems: 'center',
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
    searchSection: {
        marginTop: Metrix.VerticalSize(15),
        gap: Metrix.VerticalSize(10),
    },
    categorySection: {
        marginTop: Metrix.VerticalSize(15),
        marginBottom: Metrix.VerticalSize(10),
    },
    productList: {
        paddingHorizontal: Metrix.HorizontalSize(15),
        paddingBottom: Metrix.VerticalSize(20),
    },
    productRow: {
        justifyContent: 'space-between',
        marginBottom: Metrix.VerticalSize(10),
    },
    productContainer: {
        width: productWidth,
        backgroundColor: colors.white,
        borderRadius: Metrix.VerticalSize(8),
        padding: Metrix.VerticalSize(5),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    productImage: {
        width: '100%',
        height: productWidth,
        borderRadius: Metrix.VerticalSize(8),
        resizeMode: 'cover',
    },
    productTitle: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterSemiBold,
        marginTop: Metrix.VerticalSize(5),
    },
    productDescription: {
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterRegular,
        color: colors.textGray,
        marginTop: Metrix.VerticalSize(2),
        height: Metrix.VerticalSize(30)
    },
    priceIcon: {
        width: Metrix.HorizontalSize(20),
        height: Metrix.VerticalSize(20),
        marginRight: Metrix.HorizontalSize(5),
    },
    priceText: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterSemiBold,
        color: colors.buttonColor,
    },
    loader: {
        marginTop: Metrix.VerticalSize(20),
    },
    errorText: {
        textAlign: 'center',
        color: colors.redColor,
        marginTop: Metrix.VerticalSize(20),
        fontFamily: fonts.InterRegular,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Metrix.HorizontalSize(10),
        marginTop : Metrix.VerticalSize(10),
        gap : Metrix.HorizontalSize(10)
    },
    searchInput: {
        flex: 1,
        height: Metrix.VerticalSize(46),
        backgroundColor: '#F3F3F3',
        borderWidth: 1,
        borderColor: '#E6E6E6',
        borderRadius: Metrix.VerticalSize(3),
        paddingLeft: Metrix.HorizontalSize(10),
        paddingRight: Metrix.HorizontalSize(10),
        fontFamily: Fonts.InterRegular,
        fontSize: Metrix.FontRegular,
        width : "100%"
    },
  
    
    clearButton: {
        position: 'absolute',
        right: Metrix.HorizontalSize(5), // Adjust based on FilterIcon position
    },
   
    clearIconText: {
        color: '#999',
        fontSize: 10,
        fontFamily: Fonts.InterMedium,
        lineHeight: 16,
    },
});

export default styles;