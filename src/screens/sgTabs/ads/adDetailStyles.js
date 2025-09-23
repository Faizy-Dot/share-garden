import { StyleSheet } from "react-native";
import colors from "../../../config/Colors";
import { Metrix } from "../../../config";
import fonts from "../../../config/Fonts";

const styles = StyleSheet.create({
  // Main container styles
  previewContainer: {
    flex: 1,
    backgroundColor: colors.white
  },
  scrollContainer: {
    paddingBottom: Metrix.VerticalSize(40),
    paddingHorizontal: Metrix.HorizontalSize(15),
    marginTop: Metrix.VerticalSize(15),
  },

  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Metrix.HorizontalSize(15),
    paddingVertical: Metrix.VerticalSize(15),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  backButton: {
    padding: Metrix.HorizontalSize(5),
  },
  headerTitle: {
    fontSize: Metrix.FontLarge,
    fontFamily: fonts.InterSemiBold,
    color: colors.black,
  },
  shareButton: {
    padding: Metrix.HorizontalSize(5),
  },

  // Ad header container
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
    color: colors.gray,
  },
  image: {
    height: Metrix.VerticalSize(249),
    borderRadius: Metrix.VerticalSize(8),
  },
  descriptionText: {
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterRegular,
    lineHeight: Metrix.VerticalSize(20),
  },

  // Coupon card styles
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
    paddingHorizontal: Metrix.HorizontalSize(10),
  },
  userInitial: {
    width: Metrix.HorizontalSize(49),
    height: Metrix.HorizontalSize(49),
    backgroundColor: colors.buttonColor,
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
    color: colors.black,
  },
  validUntil: {
    color: "#458880",
    fontSize: Metrix.normalize(9),
    fontFamily: fonts.InterBold,
  },
  redeemText: {
    fontSize: Metrix.normalize(9),
    fontFamily: fonts.InterRegular,
    color: colors.gray,
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
    color: colors.black,
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
    color: colors.black,
  },

  // Merchant info styles
  merchantContainer: {
    marginTop: Metrix.VerticalSize(20),
  },
  merchantTitle: {
    fontSize: Metrix.FontLarge,
    fontFamily: fonts.InterBold,
    color: colors.black,
    marginBottom: Metrix.VerticalSize(10),
  },
  merchantCard: {
    backgroundColor: colors.white,
    borderRadius: Metrix.VerticalSize(8),
    borderWidth: 1,
    borderColor: colors.borderColor,
    padding: Metrix.HorizontalSize(15),
  },
  merchantInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: Metrix.HorizontalSize(15),
  },
  merchantDetails: {
    flex: 1,
  },
  merchantName: {
    fontSize: Metrix.FontRegular,
    fontFamily: fonts.InterSemiBold,
    color: colors.black,
    marginBottom: Metrix.VerticalSize(5),
  },
  merchantLocation: {
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterRegular,
    color: colors.gray,
    flexDirection: "row",
    alignItems: "center",
  },

  // Grab coupon section
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
    color: colors.black,
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

  // Disclaimer
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

  // Action buttons
  buttonRow: {
    flexDirection: "row",
    gap: Metrix.HorizontalSize(10),
    marginTop: Metrix.VerticalSize(30),
  },

  // Loading and error states
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  loadingText: {
    marginTop: Metrix.VerticalSize(10),
    fontSize: Metrix.FontRegular,
    fontFamily: fonts.InterRegular,
    color: colors.gray,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: Metrix.HorizontalSize(20),
  },
  errorText: {
    fontSize: Metrix.FontRegular,
    fontFamily: fonts.InterRegular,
    color: colors.red,
    textAlign: 'center',
    marginBottom: Metrix.VerticalSize(20),
  },
});

export default styles;
