import { StyleSheet } from 'react-native';
import colors from '../../../config/Colors';
import { Metrix } from '../../../config';
import fonts from '../../../config/Fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    content: {
        flex: 1,
    },
    header: {
        marginTop: Metrix.VerticalSize(13),
        paddingHorizontal: Metrix.HorizontalSize(15),
    },
    scrollContent: {
        paddingHorizontal: Metrix.HorizontalSize(15),
        paddingTop: Metrix.VerticalSize(20),
        paddingBottom: Metrix.VerticalSize(100), // Increased to ensure button is accessible above keyboard
        flexGrow: 1,
    },
    section: {
        gap: Metrix.VerticalSize(20),
    },
    sectionTitle: {
        fontSize: Metrix.FontLarge,
        fontFamily: fonts.InterBold,
        color: colors.black,
    },
    sectionDescription: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterRegular,
        color: colors.grey,
        marginTop: Metrix.VerticalSize(-10),
    },
    inputContainer: {
        gap: Metrix.VerticalSize(7),
    },
    label: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterSemiBold,
        color: colors.black,
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EAEAEA',
        borderRadius: Metrix.HorizontalSize(4),
        height: Metrix.VerticalSize(45),
    },
    passwordInput: {
        flex: 1,
        paddingHorizontal: Metrix.HorizontalSize(15),
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterRegular,
        color: colors.black,
    },
    eyeIcon: {
        paddingHorizontal: Metrix.HorizontalSize(15),
    },
    inputError: {
        borderColor: colors.redColor,
    },
    passwordValidationContainer: {
        marginTop: Metrix.VerticalSize(5),
        marginBottom: Metrix.VerticalSize(10),
        padding: Metrix.HorizontalSize(10),
        backgroundColor: '#f9f9f9',
        borderRadius: Metrix.HorizontalSize(4),
        borderWidth: 1,
        borderColor: '#EAEAEA',
    },
    validationTitle: {
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterRegular,
        marginBottom: Metrix.VerticalSize(5),
        fontWeight: '500',
    },
    validationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Metrix.VerticalSize(2),
    },
    validationText: {
        fontSize: Metrix.FontExtraSmall - 1,
        fontFamily: fonts.InterRegular,
        marginLeft: Metrix.HorizontalSize(5),
    },
    validRequirement: {
        color: colors.greenColor,
    },
    invalidRequirement: {
        color: colors.redColor,
    },
    errorText: {
        color: colors.redColor,
        fontSize: Metrix.FontExtraSmall,
        marginLeft: 4,
        marginTop: Metrix.VerticalSize(-8),
    },
});

export default styles;

