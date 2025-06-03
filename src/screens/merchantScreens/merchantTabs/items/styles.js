import { StyleSheet } from "react-native";
import colors from "../../../../config/Colors";
import { Metrix } from "../../../../config";
import fonts from "../../../../config/Fonts";

const styles = StyleSheet.create({
    MerchantItemsContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    topContainer: {
        marginTop: Metrix.VerticalSize(15),
        gap: Metrix.VerticalSize(15)
    },
    merchantName: {
        fontSize: Metrix.FontLarge,
        fontFamily: fonts.InterRegular
    },
    profileImage: {
        width: Metrix.HorizontalSize(45),
        height: Metrix.HorizontalSize(45),
        backgroundColor: "darkblue",
        borderRadius: Metrix.HorizontalSize(22.5),
        color: colors.white,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: Metrix.FontLarge,
        fontFamily: fonts.InterBold
    },
    topBottomContainer: {
        height: Metrix.VerticalSize(96),
        backgroundColor: "#BADEEE",
        marginHorizontal: Metrix.HorizontalSize(15),
        alignItems: "center",
        justifyContent: "center",
        padding: Metrix.VerticalSize(12),
        borderRadius: Metrix.VerticalSize(5),
    },
    renderPackgesData: {
        height: Metrix.VerticalSize(198),
        flex: 1,
        borderRadius : 5,
        justifyContent : "center",
        alignItems : "center",
        gap : Metrix.VerticalSize(10)
    },
    packageContainer : {
        paddingHorizontal  :Metrix.HorizontalSize (15),
        marginTop : Metrix.VerticalSize(15),
        gap : Metrix.VerticalSize(10)

    },
    packageTopSection: {
  gap: Metrix.VerticalSize(5),
},

packageTitle: {
  fontSize: Metrix.normalize(20),
  fontFamily: fonts.InterRegular,
},

packagePrice: {
  fontSize: Metrix.normalize(22),
  fontFamily: fonts.InterBold,
  textAlign: "center",
},

includesText: {
  fontSize: Metrix.normalize(9),
  fontFamily: fonts.InterLight,
  textAlign: "center",
},

packageDetail: {
  fontSize: Metrix.normalize(9),
  fontFamily: fonts.InterBold,
  textAlign: "center",
},
referralsConatiner:{
    paddingHorizontal : Metrix.HorizontalSize(15),
    marginTop : Metrix.VerticalSize(15), 
    gap : Metrix.VerticalSize(10)
},
 referralTitle: {
    fontSize: Metrix.normalize(20),
    fontFamily: fonts.InterBold,
  },
  referralSubTitle: {
    fontSize: Metrix.normalize(8),
    fontFamily: fonts.InterLight,
    color: "#CA364F",
  },
  referralItem: {
    flexDirection: "row",
    gap: Metrix.HorizontalSize(5),
    paddingBottom: Metrix.VerticalSize(10),
    alignItems :"center"
  },
  referralItemBorder: {
    borderBottomWidth: 1,
    borderColor: "#DCF3E9",
  },
  referralDescription: {
    fontSize: Metrix.FontExtraSmall,
    fontFamily: fonts.InterSemiBold,
    color: colors.buttonColor,
    flex: 1,
  },
  referralCouponButton: {
    width: Metrix.HorizontalSize(97),
    height: Metrix.VerticalSize(27),
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 3,
    borderColor: colors.buttonColor,
    justifyContent: "center",
    alignItems: "center",
  },
  referralCouponText: {
    fontSize: Metrix.normalize(10),
    fontFamily: fonts.InterBold,
    color: colors.buttonColor,
  },

  referFriend:{
    marginVertical : Metrix.VerticalSize(5),
    paddingHorizontal : Metrix.HorizontalSize(15),
    gap : Metrix.HorizontalSize(10)
  },
  referTitle: {
    fontSize: Metrix.normalize(20),
    fontFamily: fonts.InterBold,
  },
  referInputRow: {
    flexDirection: "row",
    gap: Metrix.HorizontalSize(8),
  },
  referInput: {
    height: Metrix.VerticalSize(58),
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterRegular,
    paddingHorizontal: Metrix.HorizontalSize(10),
    borderColor: colors.borderColor,
  },

})

export default styles; 