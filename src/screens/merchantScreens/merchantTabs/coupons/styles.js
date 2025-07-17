import { StyleSheet } from "react-native";
import { Metrix } from "../../../../config";
import colors from "../../../../config/Colors";
import fonts from "../../../../config/Fonts";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F8FF"
  },
  header: {
    paddingHorizontal: Metrix.HorizontalSize(15),
    marginTop: Metrix.VerticalSize(25),
    paddingBottom: Metrix.VerticalSize(40)
  },
  merchantId: {
    fontSize: Metrix.FontRegular,
    color: colors.buttonColor,
    fontFamily: fonts.InterRegular
  },
  merchantEmail: {
    fontSize: Metrix.FontRegular,
    color: colors.buttonColor,
    fontFamily: fonts.InterBold
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: Metrix.VerticalSize(20),
    borderTopRightRadius: Metrix.VerticalSize(20),
    paddingHorizontal: Metrix.HorizontalSize(15)
  },
  dropdownRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: Metrix.VerticalSize(25),
    paddingBottom: Metrix.VerticalSize(20)
  },
  dropdownTextContainer: {
    gap: Metrix.VerticalSize(5)
  },
  title: {
    fontSize: Metrix.FontRegular,
    fontFamily: fonts.InterBold
  },
  subtitle: {
    fontSize: Metrix.normalize(10),
    fontFamily: fonts.InterRegular
  },
  dateSection: {
    paddingTop: Metrix.VerticalSize(20),
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
    borderStyle: "dashed",
    paddingBottom: Metrix.VerticalSize(15)
  },
  dateText: {
    fontSize: Metrix.normalize(13),
    fontFamily: fonts.InterRegular
  },
  cardGroup: {
    gap: Metrix.HorizontalSize(10),
    marginTop: Metrix.VerticalSize(10)
  },
  card: {
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
    borderStyle: "dashed",
    paddingBottom: Metrix.VerticalSize(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  cardLeft: {
    gap: Metrix.HorizontalSize(10),
    flexDirection: "row",
    alignItems: "center"
  },
  cardDetail: {
    fontSize: Metrix.normalize(8),
    fontFamily: fonts.InterRegular
  },
  cardAmount: {
    fontSize: Metrix.FontLarge,
    fontFamily: fonts.InterBold
  },
  couponContainer: {
    paddingVertical: Metrix.VerticalSize(20),
    gap: Metrix.VerticalSize(10)
  },
  couponCard: {
    justifyContent: "center",
    gap: Metrix.VerticalSize(8),
    paddingHorizontal: Metrix.HorizontalSize(10),
    width: "100%",
    height: Metrix.VerticalSize(90),
    borderRadius: Metrix.VerticalSize(4)
  },
  couponTitle: {
    fontSize: Metrix.FontExtraSmall,
    fontFamily: fonts.InterBold,
    color: "#5EA628"
  },
  couponDate: {
    fontSize: Metrix.normalize(9),
    fontFamily: fonts.InterRegular
  },
  couponDetailsRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  detailLabel: {
    fontSize: Metrix.normalize(11),
    fontFamily: fonts.InterSemiBold
  },
  detailValue: {
    fontSize: Metrix.normalize(11),
    fontFamily: fonts.InterRegular
  },
  stateBadge: {
    justifyContent: "center",
    height: Metrix.VerticalSize(21),
    width: Metrix.HorizontalSize(76),
    borderRadius: Metrix.VerticalSize(10.5)
  },
  stateText: {
    fontSize: Metrix.FontExtraSmall,
    fontFamily: fonts.InterBold,
    textAlign: "center"
  },
  amount: {
    fontSize: Metrix.FontRegular,
    fontFamily: fonts.InterBold
  }
});


export default styles;