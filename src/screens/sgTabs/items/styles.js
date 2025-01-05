import { StyleSheet } from "react-native";
import colors from "../../../config/Colors";
import { Metrix } from "../../../config";



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: Metrix.HorizontalSize(15),
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
        width: "100%"
    },
    inputContainer: {
        flexDirection: "row",
        marginTop : Metrix.VerticalSize(20),
        alignItems : "center",
        gap : Metrix.HorizontalSize(14),
        width : "100%",
        position : "relative"
    },
    input: {
        width: Metrix.HorizontalSize(300),
        height: Metrix.VerticalSize(60),
        backgroundColor: "#F3F3F3",
        borderColor: "#E6E6E6",
        borderWidth: 1,
        borderRadius : Metrix.LightRadius,
       paddingLeft : Metrix.HorizontalSize(40)
    },
    filterLogo:{
        width : Metrix.HorizontalSize(20),
        height : Metrix.VerticalSize(15)
    },
    searchIcon:{
        width : Metrix.HorizontalSize(25),
        height : Metrix.VerticalSize(27),
    //   position : "absolute"
    }
})

export default styles;