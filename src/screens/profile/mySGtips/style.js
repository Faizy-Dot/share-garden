import { StyleSheet } from "react-native";
import { Metrix } from "../../../config";
import colors from "../../../config/Colors";
import fonts from "../../../config/Fonts";

const styles = StyleSheet.create({
    myTipsContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    topContainer: {
        marginTop: Metrix.VerticalSize(30),
        paddingHorizontal: Metrix.HorizontalSize(15),
        gap: Metrix.VerticalSize(5),
        paddingBottom: Metrix.VerticalSize(30)
    },
    middleHeading: {
        fontSize: Metrix.FontRegular,
        fontFamily: fonts.InterBold
    },
    middleBids: {
        fontSize: Metrix.normalize(20),
        fontFamily: fonts.InterBold
    },
    middleEarn: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterRegular
    },
    middleSame: {
        flexDirection: "row",
        alignItems: "center",
        gap: Metrix.HorizontalSize(5)
    },
    middleContainer: {
        alignItems: "center",
        gap: Metrix.VerticalSize(10)
    },
    middleTotalTips: {
        paddingHorizontal: Metrix.HorizontalSize(15),
        width: "100%",
        marginTop: Metrix.VerticalSize(10)
    },
    middleTipsCount: {
        backgroundColor: colors.inputBackgroundColor,
        height: Metrix.VerticalSize(58),
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    bottomContainer: {
        
        paddingHorizontal : Metrix.HorizontalSize(15),
        marginTop: Metrix.VerticalSize(20)
        
    },
    renderDataContainer: {
        height: Metrix.VerticalSize(45),
        width: "100%",
        borderWidth: 1,
        borderColor: colors.borderColor,
        marginTop: Metrix.VerticalSize(7),
        flexDirection : "row",
        alignItems :"center",
        justifyContent : "space-between",
        paddingHorizontal : Metrix.HorizontalSize(15)
    },
    bottomSameText:{
        fontSize : Metrix.FontRegular,
        fontFamily : fonts.InterBold
    },
    renderTitle:{
        fontSize : Metrix.FontExtraSmall,
        fontFamily : fonts.InterSemiBold
    },
    renderTipsIcon:{
        height: Metrix.VerticalSize(24),
        width: Metrix.VerticalSize(24),
    },
    bidsContainer:{
        flexDirection:"row",
        gap:Metrix.HorizontalSize(10),
        alignItems:"center"
    },
    bitIcon:{
        height: Metrix.VerticalSize(24),
        width: Metrix.VerticalSize(24),
    },
    renderLeftContainer:{
        flexDirection :"row",
        alignItems :"center",
        gap:Metrix.HorizontalSize(10)
    },
    editIcon:{
        height: Metrix.VerticalSize(19),
        width: Metrix.VerticalSize(16),
    },
    noPublishTips :{
        textAlign : "center",
        fontSize : Metrix.normalize(16),
        fontFamily : fonts.InterRegular,
        position : "relative",
        top : Metrix.VerticalSize(10)
    }
})

export default styles;