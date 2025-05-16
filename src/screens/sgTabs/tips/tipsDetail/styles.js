import { StyleSheet } from "react-native";
import colors from "../../../../config/Colors";
import { Metrix } from "../../../../config";

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
        paddingHorizontal: Metrix.HorizontalSize(15),
        gap: Metrix.HorizontalSize(10),
        marginTop: Metrix.VerticalSize(15),
        alignItems: "center"
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
        alignItems : "center"
    },
    earnConatiner: {
        flexDirection: "row",
        paddingHorizontal: Metrix.HorizontalSize(15),
        justifyContent: "space-between",
        paddingVertical: Metrix.VerticalSize(18)
    },
    descriptionImgContainer:{
        borderWidth : 1 , 
        borderColor : colors.borderColor,
        marginTop : Metrix.VerticalSize(15),
        marginHorizontal : Metrix.HorizontalSize(15),
        paddingHorizontal : Metrix.HorizontalSize(15),
        paddingVertical : Metrix.VerticalSize(20)
    },
      SGTipimageContainer:{
        width: Metrix.HorizontalSize(100),
        height: Metrix.HorizontalSize(70),
        backgroundColor : colors.borderColor
    },
    SGTipupdateImage:{
        width: Metrix.HorizontalSize(100),
        height: Metrix.HorizontalSize(70),
    },
})

export default styles;