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
        marginTop: Metrix.VerticalSize(20),
        paddingHorizontal : Metrix.HorizontalSize(15)
    },
    topTitle: {
        fontSize: Metrix.FontMedium,
        fontFamily: fonts.InterSemiBold
    },
    averageRatingContainer: {
        alignItems: 'center',
        marginBottom: Metrix.VerticalSize(25),
        marginTop : Metrix.VerticalSize(20)
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
    ratingText:{
        fontSize : Metrix.FontMedium,
        fontFamily : fonts.InterSemiBold,
        marginLeft : Metrix.HorizontalSize(5)
    },
    bottomContainer:{
        flex :1,
        backgroundColor : "#E6E6E6",
        marginTop : Metrix.VerticalSize(20),
        paddingHorizontal : Metrix.HorizontalSize(20),
        justifyContent : "space-between",
        paddingVertical : Metrix.VerticalSize(15)
    },
    reviewDescription:{
        height : Metrix.VerticalSize(122),
        width : "100%",
        backgroundColor : "#FCFCFC",
        borderRadius : Metrix.VerticalSize(4),
        paddingLeft : Metrix.HorizontalSize(10)
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)", // Transparent background
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        marginTop: Metrix.VerticalSize(180),
        backgroundColor: colors.white,
        borderRadius: Metrix.VerticalSize(15),
        alignItems: "center",
        width: "95%",
        height: Metrix.VerticalSize(309),
        padding: Metrix.VerticalSize(20),
        justifyContent : "space-around"
    },
    modalText:{
        fontSize : Metrix.FontMedium,
        fontFamily : fonts.InterSemiBold,
        textAlign:"center"
    }
})

export default styles;