import { StyleSheet } from "react-native";
import colors from "../../../../config/Colors";
import { Metrix } from "../../../../config";
import fonts from "../../../../config/Fonts";




const styles = StyleSheet.create({
    previewContainer:{
    flex : 1 , 
    backgroundColor  :colors.white
},
  scrollContainer: {
    paddingBottom: Metrix.VerticalSize(40),
    paddingHorizontal: Metrix.HorizontalSize(15),
    marginTop: Metrix.VerticalSize(15),
  },
  headerContainer: {
    paddingBottom: Metrix.VerticalSize(15),
    gap: Metrix.VerticalSize(10),
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
  },
  titleText: {
    fontSize: Metrix.normalize(21),
    fontFamily: fonts.InterSemiBold,
    color: colors.buttonColor,
  },
  categoryText: {
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterRegular,
  },
  image: {
    height: Metrix.VerticalSize(249),
  },
  descriptionText: {
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterRegular,
  },
  couponCard: {
    borderRadius: Metrix.VerticalSize(8),
    marginTop: Metrix.VerticalSize(20),
    height: Metrix.VerticalSize(128),
    borderWidth: 1,
    borderStyle: "dashed",
    backgroundColor: "#D0F8FF",
    borderColor: colors.buttonColor,
  },
  couponHeader: {
    flexDirection: "row",
    alignItems: "center",
    height: Metrix.VerticalSize(84),
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.buttonColor,
  },
  userInfoContainer: {
    justifyContent: "center",
    gap: Metrix.HorizontalSize(10),
    flexDirection: "row",
    alignItems: "center",
    flex: 2,
    borderRightWidth: 1,
    borderStyle: "dashed",
    height: Metrix.VerticalSize(84),
    borderColor: colors.buttonColor,
  },
  userInitial: {
    width: Metrix.HorizontalSize(49),
    height: Metrix.HorizontalSize(49),
    backgroundColor: "darkblue",
    borderRadius: Metrix.HorizontalSize(24.5),
    color: colors.white,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: Metrix.FontLarge,
    fontFamily: fonts.InterBold,
  },
  couponTitle: {
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterSemiBold,
  },
  validUntil: {
    color: "#458880",
    fontSize: Metrix.normalize(9),
    fontFamily: fonts.InterBold,
  },
  redeemText: {
    fontSize: Metrix.normalize(9),
    fontFamily: fonts.InterRegular,
  },
  discountContainer: {
    flex: 1,
    alignItems: "center",
  },
  discountText: {
    color: colors.buttonColor,
    fontSize: Metrix.normalize(20),
    fontFamily: fonts.InterBold,
  },
  couponFooter: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 2,
    justifyContent: "center",
    gap: Metrix.HorizontalSize(20),
  },
  iconWithText: {
    flexDirection: "row",
    alignItems: "center",
    gap: Metrix.HorizontalSize(5),
  },
  iconText: {
    fontSize: Metrix.FontRegular,
    fontFamily: fonts.InterRegular,
  },
  statusContainer: {
    flex: 1,
    alignItems: "center",
  },
  statusText: {
    width: Metrix.HorizontalSize(76),
    height: Metrix.VerticalSize(21),
    backgroundColor: "#EBC856",
    borderRadius: Metrix.VerticalSize(10),
    fontSize: Metrix.FontExtraSmall,
    fontFamily: fonts.InterBold,
    textAlign: "center",
    textAlignVertical: "center",
  },
  grabCouponSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Metrix.VerticalSize(20),
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
    paddingBottom: Metrix.VerticalSize(15),
  },
  grabTitle: {
    fontSize: Metrix.FontLarge,
    fontFamily: fonts.InterBold,
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Metrix.HorizontalSize(10),
  },
  pointsText: {
    fontSize: Metrix.FontExtraLarge,
    fontFamily: fonts.InterBold,
    color: colors.buttonColor,
  },
  disclaimerContainer: {
    marginTop: Metrix.VerticalSize(10),
  },
  disclaimerBold: {
    lineHeight: Metrix.VerticalSize(18),
    fontSize: Metrix.normalize(11),
    fontFamily: fonts.InterSemiBold,
    color: "#707070",
  },
  disclaimerRegular: {
    fontFamily: fonts.InterLight,
  },
  buttonRow: {
    flexDirection: "row",
    gap: Metrix.HorizontalSize(10),
    marginTop: Metrix.VerticalSize(30),
  },
});


export default styles ;