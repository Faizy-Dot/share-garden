import { StyleSheet } from "react-native";
import colors from "../../../../config/Colors";
import { Metrix } from "../../../../config";
import fonts from "../../../../config/Fonts";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white
    },

    topContainer: {
        paddingHorizontal: Metrix.HorizontalSize(15),
        marginTop: Metrix.VerticalSize(15),
        gap: Metrix.VerticalSize(10)
    },
    tipTitle: {
        flexDirection: "row",
        gap: Metrix.HorizontalSize(10),
        marginTop: Metrix.VerticalSize(15),
        alignItems: "center"
    },
    tipTitleConatiner: {
        paddingHorizontal: Metrix.HorizontalSize(15),
        flexDirection: "column",
        alignItems: "flex-start"
    },
    authorContainer: {
        marginTop: Metrix.VerticalSize(8),
        alignSelf: "flex-start"
    },
    categoryEarnContainer: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.borderColor,
        marginTop: Metrix.VerticalSize(15)
    },
    categoryContainer: {
        flexDirection: "row",
        paddingHorizontal: Metrix.HorizontalSize(15),
        paddingVertical: Metrix.VerticalSize(18),
        borderBottomWidth: 1,
        borderColor: colors.borderColor,
        gap: Metrix.HorizontalSize(25),
        alignItems: "center"
    },
    earnConatiner: {
        flexDirection: "row",
        paddingHorizontal: Metrix.HorizontalSize(15),
        justifyContent: "space-between",
        paddingVertical: Metrix.VerticalSize(18)
    },
    descriptionImgContainer: {
        borderWidth: 1,
        borderColor: colors.borderColor,
        marginTop: Metrix.VerticalSize(15),
        marginHorizontal: Metrix.HorizontalSize(15),
        paddingHorizontal: Metrix.HorizontalSize(15),
        paddingVertical: Metrix.VerticalSize(20)
    },
    SGTipimageContainer: {
        width: Metrix.HorizontalSize(100),
        height: Metrix.HorizontalSize(70),
        backgroundColor: colors.borderColor
    },
    SGTipupdateImage: {
        width: Metrix.HorizontalSize(100),
        height: Metrix.HorizontalSize(70),
    },
    commentContainer: {
        paddingHorizontal: Metrix.HorizontalSize(15),
        marginTop: Metrix.VerticalSize(20),
        gap: Metrix.VerticalSize(15)
    },
    commentHeading: {
        fontSize: Metrix.FontRegular,
        fontFamily: fonts.InterSemiBold,
        color: colors.buttonColor
    },
    commentTopContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: Metrix.HorizontalSize(10)
    },

    profileImage: {
        width: Metrix.HorizontalSize(42),
        height: Metrix.HorizontalSize(42),
        borderRadius: Metrix.HorizontalSize(21),
        alignSelf: "flex-start"
    },
    commentText: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterRegular,
    },
    commentListRenderConatiner: {
        paddingHorizontal: Metrix.HorizontalSize(20)
    },
    renderImageText: {
        gap: Metrix.HorizontalSize(10),
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#DADADA",
        borderRadius: Metrix.VerticalSize(25)
    },
    timeText: {
        fontSize: Metrix.normalize(11),
        fontFamily: fonts.InterRegular,
        color: colors.buttonColor,
    },
    commentFooterContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        marginTop: Metrix.VerticalSize(3),
        paddingHorizontal: Metrix.HorizontalSize(10)
    },
    editDeleteText:{
        textDecorationLine : "underline",
        fontSize : Metrix.FontSmall,
        fontFamily : fonts.InterSemiBold,
    }

})

export default styles;