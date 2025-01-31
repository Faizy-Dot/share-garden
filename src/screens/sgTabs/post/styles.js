import { StyleSheet } from "react-native";
import { Metrix } from "../../../config";
import fonts from "../../../config/Fonts";
import colors from "../../../config/Colors";


const styles = StyleSheet.create({

    postContainer: {
        padding: Metrix.VerticalSize(10),
        flex: 1,
        backgroundColor: colors.white,
    }
    ,
    buttonsContainer: {
        flexDirection: "row",
        height: Metrix.VerticalSize(40),
        width: "100%",
        height: Metrix.VerticalSize(40),
    },
    button: {
        borderWidth: 1,
        borderColor: "#F3F3F3",
        flex: 1,
        height: Metrix.VerticalSize(40),
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterBold,
    },
    switchingCOntainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: Metrix.VerticalSize(15),
        justifyContent: "space-between"
    },
    Switch: {
        flexDirection: "row",
        alignItems: "center",
        gap: Metrix.HorizontalSize(5)
    },
    logos: {
        width: Metrix.HorizontalSize(16),
        height: Metrix.HorizontalSize(16)
    },
    imageUploadContainer: {
        width: "100%",
        height: Metrix.VerticalSize(186),
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: Metrix.LightRadius,
        marginTop: Metrix.VerticalSize(10),
        justifyContent: "center",
        alignItems: "center",
        gap: Metrix.HorizontalSize(15)
    },
    image: {
        flex: 1,
        height: Metrix.VerticalSize(61),
        backgroundColor: "#F5F4F4"
    },
    imagesContainer: {
        height: Metrix.VerticalSize(61),
        flexDirection: "row",
        gap: Metrix.HorizontalSize(10),
        paddingHorizontal: Metrix.HorizontalSize(10)
    },
    inputsContainer: {
        marginTop: Metrix.VerticalSize(10),
        gap: Metrix.VerticalSize(10),
        marginBottom: Metrix.VerticalSize(30)
    },
    title: {
        width: "100%",
        height: Metrix.VerticalSize(58),
        borderWidth: 1,
        paddingHorizontal: Metrix.HorizontalSize(20),
        borderRadius: Metrix.LightRadius,
        borderColor: colors.borderColor,
        fontFamily: fonts.InterRegular,
        fontSize: Metrix.FontSmall,


    },
    description: {
        width: "100%",
        height: Metrix.VerticalSize(58),
        borderWidth: 1,
        paddingHorizontal: Metrix.HorizontalSize(20),
        borderRadius: Metrix.LightRadius,
        borderColor: colors.borderColor,
        fontFamily: fonts.InterRegular,
        fontSize: Metrix.FontSmall,
        height: Metrix.VerticalSize(106)


    },
    conditionContainer: {
        width: "100%",
        height: Metrix.VerticalSize(100),
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: Metrix.LightRadius,
        justifyContent: "center",
        gap: Metrix.VerticalSize(15),
        paddingHorizontal: 20
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8

    },
    checkboxText: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterRegular
    },
    heading: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterRegular
    },
    description: {
        width: "100%",
        height: Metrix.VerticalSize(106),
        borderWidth: 1,
        paddingHorizontal: Metrix.HorizontalSize(20),
        borderRadius: Metrix.LightRadius,
        borderColor: colors.borderColor,
        fontFamily: fonts.InterRegular,
        fontSize: Metrix.FontSmall
    },
    checkBox: {
        width: Metrix.HorizontalSize(14),
        height: Metrix.HorizontalSize(14),
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    bottomButtons: {
        flexDirection: "row",
        marginBottom: Metrix.VerticalSize(35),
        gap: Metrix.VerticalSize(10)
    }
})

export default styles;