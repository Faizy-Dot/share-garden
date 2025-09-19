import { StyleSheet } from "react-native";
import colors from "../../../config/Colors";
import { Metrix } from "../../../config";
import fonts from "../../../config/Fonts";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    content: {
        flex: 1,

    },

    editProfileContainer: {
        alignItems: "center",
        width: "100%",
        marginTop: Metrix.VerticalSize(15),
        paddingHorizontal: Metrix.HorizontalSize(15),
        gap: 10
    },

    inputs: {
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: Metrix.VerticalSize(3),
        backgroundColor: "#F3F3F3",
        fontSize: Metrix.normalize(15),
        fontFamily: fonts.InterLight,
        height: Metrix.VerticalSize(40),
        paddingLeft: Metrix.HorizontalSize(15),
    },
    editProfileText: {
        fontSize: Metrix.normalize(20),
        fontFamily: fonts.InterBold
    },
    cameraPicker: {
        backgroundColor: colors.buttonColor,
        width: Metrix.VerticalSize(33),
        height: Metrix.VerticalSize(33),
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16.5,
        left: Metrix.HorizontalSize(56),
        bottom: 0
    },
    userName: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterBold,

    },
    topInputContainer: {
        marginTop: Metrix.VerticalSize(30),
        gap: Metrix.VerticalSize(37),
        paddingHorizontal: Metrix.HorizontalSize(23)
    },
    bottomInputContainer: {
        marginTop: Metrix.VerticalSize(15),
        gap: Metrix.VerticalSize(30),
        paddingHorizontal: Metrix.HorizontalSize(23)
    },

    borderLineContainer: {
        paddingHorizontal: Metrix.HorizontalSize(10),
        marginTop: Metrix.VerticalSize(30),
    },

    borderLine: {
        backgroundColor: colors.borderColor,
        width: "100%",
        height: 2,

    },
    contactInformationText: {
        color: colors.buttonColor,
        fontSize: Metrix.normalize(20),
        fontFamily: fonts.InterBold

    },
    connectionContainer: {
        marginTop: Metrix.VerticalSize(15),
        gap: Metrix.VerticalSize(30),
        paddingHorizontal: Metrix.HorizontalSize(23)
    },
    connectionBoxes: {
        gap: Metrix.VerticalSize(18)
    },
    socialButtonIcon: {
        fontSize: Metrix.normalize(25),
        marginRight: 20
    },
    dropdown: {
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: Metrix.VerticalSize(3),
        backgroundColor: "#F3F3F3",
        height: Metrix.VerticalSize(40),
        paddingHorizontal: Metrix.HorizontalSize(15),
        width: "100%"
    },
    item: {
        padding: 5,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: colors.borderColor
    },

    placeholderStyle: {
        fontFamily: fonts.InterRegular,
    },
    selectedTextStyle: {
        fontSize: Metrix.FontSmall
    },
    profileContainer: {
        width: Metrix.HorizontalSize(80),
        height: Metrix.HorizontalSize(80),
        // borderRadius: Metrix.HorizontalSize(40),  // Half of width/height to make it a circle
        justifyContent: "center",
        alignItems: "center",
    },

    profileImage: {
        width: Metrix.HorizontalSize(80),
        height: Metrix.HorizontalSize(80),
        borderRadius: Metrix.HorizontalSize(40),
        borderWidth: 2,
        borderColor: colors.buttonColor,
    },
    camerIconConatiner: {
        backgroundColor: colors.buttonColor,
        height: Metrix.VerticalSize(33),
        width: Metrix.VerticalSize(33),
        borderRadius: Metrix.VerticalSize(16.5),
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: Metrix.VerticalSize(-5),
        right: Metrix.HorizontalSize(-5)
    },

    imagePickerContainer: {
        alignSelf: 'center',
    },
    imagePlaceholder: {
        width: Metrix.HorizontalSize(100),
        height: Metrix.HorizontalSize(100),
        borderRadius: Metrix.HorizontalSize(50),
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderStyle: 'dashed',
    },
    uploadText: {
        marginTop: 5,
        fontSize: 12,
        color: colors.grey,
    },

});

export default styles;