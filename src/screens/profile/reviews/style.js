import { StyleSheet } from "react-native";
import colors from "../../../config/Colors";
import { Metrix } from "../../../config";
import fonts from "../../../config/Fonts";

const styles = StyleSheet.create({
    reviewsContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    topContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: Metrix.HorizontalSize(25),
        paddingLeft: Metrix.HorizontalSize(30),
        marginTop: Metrix.VerticalSize(25)
    },
    topTitle: {
        fontSize: Metrix.FontMedium,
        fontFamily: fonts.InterSemiBold
    },
    averageRatingContainer: {
        alignItems: 'center',
        marginBottom: Metrix.VerticalSize(25),
        marginTop : Metrix.VerticalSize(35)
    },
    averageRating: {
        fontSize: Metrix.normalize(41),
        fontWeight: fonts.InterBold,
    },
    starsContainer: {
        flexDirection: 'row',
        alignItems: "center",
        gap: Metrix.HorizontalSize(15),
        marginTop: Metrix.VerticalSize(10),
    },
    renderStarContainer: {
        flexDirection: 'row',
        alignItems: "center",
        gap: Metrix.HorizontalSize(3),
        marginTop: Metrix.VerticalSize(5),
    },
    starIcon: {
        width: Metrix.HorizontalSize(27),
        height: Metrix.HorizontalSize(25),
    },
    renderStarIcon: {
        width: Metrix.HorizontalSize(13),
        height: Metrix.HorizontalSize(12),
    },

    reviewRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        justifyContent: "space-between",
        marginVertical: Metrix.VerticalSize(3),
        paddingHorizontal: Metrix.HorizontalSize(22)
    },
    reviewLabel: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterSemiBold
    },
    progressBar: {
        height: Metrix.VerticalSize(10),
        borderRadius: Metrix.LightRadius,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.borderColor,
        width: Metrix.HorizontalSize(220)
    },
    line:{
        width : "100%",
        backgroundColor : colors.borderColor,
        height : Metrix.VerticalSize(1),
        flexDirection : "row",
        marginTop : Metrix.VerticalSize(20),
    },
    profileImage:{
        width: Metrix.HorizontalSize(48),
        height: Metrix.HorizontalSize(48),
    },
    renderReviewDetail:{
        width:"100%",
        height:Metrix.VerticalSize(151),
        paddingHorizontal : Metrix.HorizontalSize(15)
    },
    nameTimeText:{
        fontSize: Metrix.normalize(15),
        fontFamily: fonts.InterSemiBold
    },
    descriptionText:{
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterRegular,
        lineHeight : Metrix.VerticalSize(18),
        marginTop : Metrix.VerticalSize(15)
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Metrix.VerticalSize(50)
    },
    loadingText: {
        fontSize: Metrix.FontMedium,
        fontFamily: fonts.InterRegular,
        color: colors.gray,
        marginTop: Metrix.VerticalSize(10)
    },
    totalReviewsText: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterRegular,
        color: colors.gray,
        marginTop: Metrix.VerticalSize(5)
    },
    ratingCount: {
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterRegular,
        color: colors.gray,
        marginLeft: Metrix.HorizontalSize(5)
    },
    noReviewsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Metrix.VerticalSize(50),
        paddingHorizontal: Metrix.HorizontalSize(20)
    },
    noReviewsText: {
        fontSize: Metrix.FontLarge,
        fontFamily: fonts.InterSemiBold,
        color: colors.gray,
        marginBottom: Metrix.VerticalSize(10)
    },
    noReviewsSubText: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterRegular,
        color: colors.gray,
        textAlign: 'center',
        lineHeight: Metrix.VerticalSize(20)
    }
})

export default styles;