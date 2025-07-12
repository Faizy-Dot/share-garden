import { StyleSheet } from "react-native";
import colors from "../../../../config/Colors";
import { Metrix } from "../../../../config";
import fonts from "../../../../config/Fonts";

const styles = StyleSheet.create({
    merchantPostContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    formContainer: {
        marginTop: Metrix.VerticalSize(15),
        gap: Metrix.VerticalSize(10),
    },
      scrollContent: {
    paddingHorizontal: Metrix.HorizontalSize(15),
    paddingBottom: Metrix.VerticalSize(15),
  },

    imageContainer: {
        borderWidth: 1,
        height: Metrix.VerticalSize(186),
        borderColor: colors.borderColor,
        borderRadius: Metrix.VerticalSize(4),
        paddingHorizontal: Metrix.HorizontalSize(10),
        justifyContent: 'space-around',
    },
    uploadButton: {
        alignItems: 'center',
        gap: Metrix.HorizontalSize(10),
    },
    uploadedImage: {
        height: Metrix.VerticalSize(71),
        backgroundColor: colors.borderColor,
        width: "100%"
    },
    uploadText: {
        fontSize: Metrix.FontRegular,
        fontFamily: fonts.InterRegular,

    },
    inputs: {
        width: "100%",
        height: Metrix.VerticalSize(58),
        borderWidth: 1,
        borderColor: colors.borderColor,
        paddingLeft: Metrix.HorizontalSize(10),
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterRegular,
        borderRadius: Metrix.VerticalSize(4)
    },
    fakeInputWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: Metrix.VerticalSize(4),
        padding: Metrix.VerticalSize(12),
        justifyContent: 'flex-start',
        height: Metrix.VerticalSize(106)
    },

    label: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterRegular,
        marginBottom: Metrix.VerticalSize(4),
    },

    placeholderLine: {
        fontSize: Metrix.normalize(9),
        fontFamily: fonts.InterRegular,
        color: '#999',
        lineHeight: Metrix.VerticalSize(20),
    },
    checkBox:{
        width:Metrix.VerticalSize(19),
        height : Metrix.VerticalSize(19),
        borderWidth : 1,
        zIndex : 1
        
    },
    checkBoxText:{
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterRegular, 
    },
    hiddenTextInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: Metrix.VerticalSize(10),
    fontSize: Metrix.normalize(14),
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Metrix.VerticalSize(15),
  },

  switchLabel: {
    fontSize: Metrix.normalize(13),
    fontFamily: fonts.InterBold,
  },

  couponSection: {
    marginTop: Metrix.VerticalSize(10),
    gap: Metrix.VerticalSize(10),
  },

  percentageRow: {
    flexDirection: 'row',
    gap: Metrix.HorizontalSize(5),
  },

  flex1: {
    flex: 1,
  },

  offerText: {
    fontSize: Metrix.normalize(9),
    fontFamily: fonts.InterLight,
    color: colors.buttonColor,
  },

  redeemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Metrix.HorizontalSize(18),
    justifyContent: 'space-between',
    paddingHorizontal: Metrix.HorizontalSize(17),
    marginTop: Metrix.VerticalSize(10),
  },

  redeemOptions: {
    flexDirection: 'row',
    gap: Metrix.HorizontalSize(15),
  },

  checkBoxWrapper: {
    flexDirection: 'row',
    gap: Metrix.HorizontalSize(10),
    alignItems: 'center',
    position: 'relative',
  },

  checkIcon: {
    position: 'absolute',
    bottom: Metrix.VerticalSize(1),
  },

  redeemValueRow: {
    paddingVertical: Metrix.VerticalSize(15),
    paddingHorizontal: Metrix.HorizontalSize(17),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrix.VerticalSize(10),
    alignItems: 'center',
  },

  redeemInputWrap: {
    flexDirection: 'row',
    gap: Metrix.HorizontalSize(10),
    alignItems: 'center',
  },

  redeemInput: {
    width: Metrix.HorizontalSize(117),
  },

  buttonRow: {
    flexDirection: 'row',
    gap: Metrix.HorizontalSize(10),
    marginTop: Metrix.VerticalSize(20),
  },


})

export default styles;