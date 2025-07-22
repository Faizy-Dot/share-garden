import { StyleSheet } from "react-native";
import { Metrix } from "../../../../config";
import fonts from "../../../../config/Fonts";
import colors from "../../../../config/Colors";

export const styles = StyleSheet.create({
    adsContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: Metrix.HorizontalSize(15),
    },
    topContainer: {
        marginTop: Metrix.VerticalSize(10),
        gap: Metrix.VerticalSize(12)
    },
    // bottomContainer removed since we're using ListHeaderComponent
    adsDataStyle: {
        paddingBottom: Metrix.VerticalSize(20),
        paddingTop: Metrix.VerticalSize(10)
    },
    rowContainer: {
        marginBottom: Metrix.VerticalSize(10),
        justifyContent : "space-between"
    },
    adsDataContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: Metrix.VerticalSize(8),
        height: Metrix.VerticalSize(260),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',
    },
    image: {
        width: "100%",
        height: Metrix.VerticalSize(148),
        borderRadius: Metrix.VerticalSize(8),
        resizeMode: 'cover',
    },
    textContainer: {
        padding: Metrix.VerticalSize(6),
        flex : 1,
        justifyContent : "space-between"
    },
    title: {
        fontSize: Metrix.FontSmall,
        fontWeight: fonts.InterSemiBold,
        lineHeight: Metrix.VerticalSize(16),
        
    },
    description: {
        fontSize: Metrix.normalize(8),
        color: colors.buttonColor,
        lineHeight: Metrix.VerticalSize(14),
    },
    locationContainer: {
        gap: Metrix.VerticalSize(2),
    },
    locationText: {
        fontSize: Metrix.normalize(8),
        color: "#646262",
        fontWeight: fonts.InterRegular
    },
    categoryText: {
        fontSize: Metrix.FontSmall,
        color: "#666666"
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: Metrix.VerticalSize(10)
    },
    loadingText: {
        fontSize: Metrix.FontRegular,
        color: "#003034"
    },
    noAdsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Metrix.HorizontalSize(20),
        gap: Metrix.VerticalSize(15)
    },
    noAdsText: {
        fontSize: Metrix.FontRegular,
        color: "#666666",
        textAlign: 'center',
        lineHeight: Metrix.VerticalSize(20)
    },
    loadMoreContainer: {
        alignItems: 'center',
        paddingVertical: Metrix.VerticalSize(15)
    },
    loadMoreButton: {
        backgroundColor: "#003034",
        paddingHorizontal: Metrix.HorizontalSize(20),
        paddingVertical: Metrix.VerticalSize(10),
        borderRadius: Metrix.VerticalSize(5)
    },
    loadMoreText: {
        color: "#FFFFFF",
        fontSize: Metrix.FontRegular,
        fontWeight: "600"
    },
    filterStatusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: Metrix.HorizontalSize(12),
        paddingVertical: Metrix.VerticalSize(8),
        borderRadius: Metrix.VerticalSize(6),
        marginTop: Metrix.VerticalSize(5)
    },
    filterStatusText: {
        fontSize: Metrix.FontSmall,
        color: "#003034",
        flex: 1
    },
    clearFiltersButton: {
        backgroundColor: "#003034",
        paddingHorizontal: Metrix.HorizontalSize(12),
        paddingVertical: Metrix.VerticalSize(4),
        borderRadius: Metrix.VerticalSize(4)
    },
    clearFiltersText: {
        color: "#FFFFFF",
        fontSize: Metrix.FontSmall,
        fontWeight: "600"
    }
}); 