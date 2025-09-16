import { Dimensions, StyleSheet } from "react-native"
import colors from "../../../config/Colors"
import { Metrix } from "../../../config"
import fonts from "../../../config/Fonts"

const { width } = Dimensions.get('window');
const productWidth = (width - (Metrix.HorizontalSize(40))) / 2;


export const styles = StyleSheet.create({
    adsContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: Metrix.HorizontalSize(15)
    },
    topContainer: {
        marginTop: Metrix.VerticalSize(15),
        gap: Metrix.HorizontalSize(10),
        width: "100%"
    },
    // bottomContainer removed since we're using ListHeaderComponent
    adsDataStyle: {
        paddingBottom: Metrix.VerticalSize(20),
        
    },
    rowContainer: {
        justifyContent: 'space-between',
        marginBottom: Metrix.VerticalSize(10),
        gap : Metrix.HorizontalSize(7)
    },
    image: {
        height: Metrix.VerticalSize(120),
        width: '100%',
        resizeMode: "cover",
        borderRadius: 8,
    },
    textContainer: {

    },
    title: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterSemiBold,
        height: Metrix.VerticalSize(45)
    },
    description: {
        fontSize: Metrix.normalize(8),
        fontFamily: fonts.InterRegular,
        color: "#168679",
        height: Metrix.VerticalSize(25)
    },
    adsDataContainer: {
        flex: 1,
        marginHorizontal: Metrix.HorizontalSize(2),
        gap: Metrix.VerticalSize(8),
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: Metrix.HorizontalSize(5),
        borderWidth: 1,
        borderColor: colors.borderColor,
        width: productWidth,

    },
    locationContainer: {
        flexDirection: "column",
        gap: Metrix.VerticalSize(2),
        marginTop: Metrix.VerticalSize(4),
    },
    locationText: {
        fontSize: Metrix.normalize(8),
        fontFamily: fonts.InterRegular,
        color: "#646262"
    },
    categoryText: {
        fontSize: Metrix.normalize(8),
        fontFamily: fonts.InterRegular,
        color: "#168679"
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Metrix.VerticalSize(50),
    },
    loadingText: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterRegular,
        color: colors.textColor,
        marginTop: Metrix.VerticalSize(10),
    },
    noAdsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Metrix.VerticalSize(50),
    },
    noAdsText: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterRegular,
        color: colors.textColor,
        textAlign: 'center',
    },
    filterStatusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.lightGray,
        paddingHorizontal: Metrix.HorizontalSize(10),
        paddingVertical: Metrix.VerticalSize(8),
        borderRadius: 5,
        marginTop: Metrix.VerticalSize(5),
    },
    filterStatusText: {
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterRegular,
        color: colors.textColor,
        flex: 1,
    },
    clearFiltersButton: {
        backgroundColor: colors.buttonColor,
        paddingHorizontal: Metrix.HorizontalSize(12),
        paddingVertical: Metrix.VerticalSize(4),
        borderRadius: 3,
    },
    clearFiltersText: {
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterBold,
        color: colors.white,
    },
    loadMoreContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Metrix.VerticalSize(20),
    },
    loadMoreButton: {
        backgroundColor: colors.buttonColor,
        paddingHorizontal: Metrix.HorizontalSize(20),
        paddingVertical: Metrix.VerticalSize(10),
        borderRadius: 5,
    },
    loadMoreText: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterBold,
        color: colors.white,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Metrix.HorizontalSize(10),
        marginTop: Metrix.VerticalSize(10),
        gap: Metrix.HorizontalSize(10)
    },
    searchInput: {
        height: Metrix.VerticalSize(50),
        backgroundColor: '#F3F3F3',
        borderWidth: 1,
        borderColor: '#E6E6E6',
        borderRadius: 3,
        paddingHorizontal: Metrix.HorizontalSize(15),
        fontSize: Metrix.FontRegular,
        fontFamily : fonts.InterRegular,
        color:  colors.black
    },
    clearButton: {
        position: 'absolute',
        right: Metrix.HorizontalSize(15),
        // top: '50%',
        // transform: [{ translateY: -12 }], // Half of the icon height (16px) to center it
        zIndex: 1,
        padding: Metrix.HorizontalSize(5), // Add padding for better touch target
    },
    clearFilterContainer: {
        marginTop: Metrix.VerticalSize(10),
        alignItems: 'center',
    },
    clearFilterButton: {
        backgroundColor: colors.buttonColor,
        paddingHorizontal: Metrix.HorizontalSize(20),
        paddingVertical: Metrix.VerticalSize(8),
        borderRadius: Metrix.HorizontalSize(20),
    },
    clearFilterText: {
        color: colors.white,
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterSemiBold,
    }
})