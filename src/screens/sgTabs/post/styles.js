import { StyleSheet } from "react-native";
import { Metrix } from "../../../config";
import fonts from "../../../config/Fonts";
import colors from "../../../config/Colors";


const styles = StyleSheet.create({

    postContainer: {
        padding: Metrix.VerticalSize(10),
        flex: 1,
        backgroundColor: colors.white
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
        gap: 15
    },
    image: {
        flex: 1,
        height: 61,
        backgroundColor: "#F5F4F4"
    }
})

export default styles;