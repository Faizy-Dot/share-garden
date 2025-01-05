import { StyleSheet } from "react-native";
import colors from "../../../config/Colors";
import { Fonts, Metrix } from "../../../config";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        // paddingHorizontal: Metrix.HorizontalSize(15),
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
    inputContainer: {
        flexDirection: "row",
        marginTop: Metrix.VerticalSize(20),
        alignItems: "center",
        gap: Metrix.HorizontalSize(14),
        width: "100%",
        paddingHorizontal: Metrix.HorizontalSize(15),
    },
    input: {
        width: Metrix.HorizontalSize(300),
        height: Metrix.VerticalSize(60),
        backgroundColor: "#F3F3F3",
        borderColor: "#E6E6E6",
        borderWidth: 1,
        borderRadius: Metrix.LightRadius,
        paddingLeft: Metrix.HorizontalSize(45),
        fontSize: Metrix.FontRegular,
        fontFamily: Fonts.InterSemiBold
    },
    filterLogo: {
        width: Metrix.HorizontalSize(20),
        height: Metrix.VerticalSize(15)
    },
    searchIcon: {
        width: Metrix.HorizontalSize(25),
        height: Metrix.VerticalSize(27),
        position: "absolute",
        left: Metrix.HorizontalSize(23),
        zIndex: 1
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
        width: Metrix.HorizontalSize(171),
        height: Metrix.VerticalSize(43),
    },
    middleShown: {
        position: "absolute",
        gap: 10,
        width : "100%",
        alignItems : "center"
    },
    categoryContainer: {
        paddingHorizontal: Metrix.HorizontalSize(15),
        marginTop : Metrix.VerticalSize(15)
    },
    categoryList: {
        flexDirection: "row",
        gap: Metrix.HorizontalSize(10),
        alignItems : "center",
        marginTop : 15
    },
    category : {
        backgroundColor : "#F3F3F3",
        width: Metrix.HorizontalSize(64),
        height: Metrix.VerticalSize(64),
        justifyContent : "center",
        alignItems : "center",
        borderRadius : Metrix.HorizontalSize(50)
    },
  
    categoryText : {
        textAlign: "center",
        marginTop : Metrix.VerticalSize(10)
    }

})

export default styles;