import { StyleSheet } from "react-native";
import colors from "../../../../config/Colors";
import { Metrix } from "../../../../config";
import fonts from "../../../../config/Fonts";

export const styles =  StyleSheet.create({
    previewPostedSgItemsConatiner:{
        flex : 1,
        backgroundColor  :colors.white,
        paddingHorizontal: Metrix.HorizontalSize(15)

    },
     topContainer: {
            marginTop: Metrix.VerticalSize(20),
            gap: Metrix.VerticalSize(7)
        },
        middleToBottomContainer:{
            gap:Metrix.VerticalSize(10),
            marginTop :Metrix.VerticalSize(15)
        },
        sameMiddleBox: {
            paddingHorizontal: Metrix.HorizontalSize(20),
        },
        bidEndsText: {
            fontSize: Metrix.FontMedium,
            fontFamily: fonts.InterSemiBold,
        },
        timerRow: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            // borderWidth :1,
            // gap : 10
        },
        inputContainer: {
            alignItems: "flex-start",
            width: Metrix.HorizontalSize(50),
            height: Metrix.VerticalSize(60),
    
        },
        input: {
            width: Metrix.HorizontalSize(30),
            height: Metrix.VerticalSize(44),
            fontSize: Metrix.FontRegular,
            fontFamily: fonts.InterBold,
            paddingLeft: 0,
        },
        label: {
            fontSize: Metrix.FontExtraSmall,
            fontWeight: fonts.InterRegular,
            color: "#5A5A5A",
            position: "relative",
            bottom: Metrix.VerticalSize(7)
    
        },
        separator: {
            fontSize: Metrix.normalize(22),
            fontWeight: fonts.InterBold,
            color: colors.buttonColor,
            marginBottom: Metrix.VerticalSize(10),
        },

})