import { StyleSheet } from 'react-native';
import { Metrix } from '../../../../config';
import colors from '../../../../config/Colors';
import fonts from '../../../../config/Fonts';

const styles = StyleSheet.create({
  // Main container styles
  previewContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
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
    backgroundColor: colors.background,
    paddingHorizontal: Metrix.HorizontalSize(20),
  },
  errorText: {
    fontSize: Metrix.FontRegular,
    fontFamily: fonts.InterRegular,
    color: colors.red,
    textAlign: 'center',
    marginBottom: Metrix.VerticalSize(20),
  },
  scrollContainer: {
    paddingBottom: Metrix.VerticalSize(20),
  },

  // Header actions
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Metrix.HorizontalSize(10),
  },
  actionButton: {
    padding: Metrix.HorizontalSize(5),
  },

  // Status container
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Metrix.HorizontalSize(15),
    paddingVertical: Metrix.VerticalSize(10),
    backgroundColor: colors.white,
    marginBottom: Metrix.VerticalSize(5),
  },
  statusBadge: {
    paddingHorizontal: Metrix.HorizontalSize(12),
    paddingVertical: Metrix.VerticalSize(4),
    borderRadius: Metrix.VerticalSize(12),
  },
  statusText: {
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterBold,
    color: colors.white,
  },
  statusDate: {
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterRegular,
    color: colors.gray,
  },

  // Ad header styles
  headerContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: Metrix.HorizontalSize(15),
    paddingVertical: Metrix.VerticalSize(15),
    marginBottom: Metrix.VerticalSize(5),
  },
  titleText: {
    fontSize: Metrix.FontLarge,
    fontFamily: fonts.InterBold,
    color: colors.black,
    marginBottom: Metrix.VerticalSize(5),
  },
  categoryText: {
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterRegular,
    color: colors.gray,
    marginBottom: Metrix.VerticalSize(10),
  },
  image: {
    width: '100%',
    height: Metrix.VerticalSize(200),
    borderRadius: Metrix.VerticalSize(8),
    marginBottom: Metrix.VerticalSize(10),
  },
  descriptionText: {
    fontSize: Metrix.FontRegular,
    fontFamily: fonts.InterRegular,
    color: colors.black,
    lineHeight: Metrix.VerticalSize(20),
  },

  // Coupon card styles
  couponCard: {
    backgroundColor: colors.white,
    marginHorizontal: Metrix.HorizontalSize(15),
    marginBottom: Metrix.VerticalSize(5),
    borderRadius: Metrix.VerticalSize(8),
    borderWidth: 1,
    borderColor: colors.borderColor,
    padding: Metrix.HorizontalSize(15),
  },
  couponHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Metrix.VerticalSize(15),
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  userInitial: {
    width: Metrix.HorizontalSize(40),
    height: Metrix.HorizontalSize(40),
    borderRadius: Metrix.HorizontalSize(20),
    backgroundColor: colors.buttonColor,
    fontSize: Metrix.FontLarge,
    fontFamily: fonts.InterBold,
    color: colors.white,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: Metrix.HorizontalSize(15),
  },
  couponTitle: {
    fontSize: Metrix.FontRegular,
    fontFamily: fonts.InterBold,
    color: colors.black,
    marginBottom: Metrix.VerticalSize(5),
  },
  validUntil: {
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterRegular,
    color: colors.gray,
    marginBottom: Metrix.VerticalSize(5),
  },
  redeemText: {
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterRegular,
    color: colors.gray,
  },
  discountContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountText: {
    fontSize: Metrix.FontLarge,
    fontFamily: fonts.InterBold,
    color: colors.buttonColor,
  },
  couponFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Metrix.HorizontalSize(20),
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Metrix.HorizontalSize(5),
  },
  iconText: {
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterRegular,
    color: colors.black,
  },

  // Merchant info styles
  merchantContainer: {
    marginTop: Metrix.VerticalSize(20),
    paddingHorizontal: Metrix.HorizontalSize(15),
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
    flexDirection: 'row',
    alignItems: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Metrix.VerticalSize(3),
  },
  merchantPhone: {
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterRegular,
    color: colors.gray,
  },

  // Stats container
  statsContainer: {
    marginTop: Metrix.VerticalSize(20),
    paddingHorizontal: Metrix.HorizontalSize(15),
  },
  statsTitle: {
    fontSize: Metrix.FontLarge,
    fontFamily: fonts.InterBold,
    color: colors.black,
    marginBottom: Metrix.VerticalSize(15),
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: Metrix.VerticalSize(8),
    padding: Metrix.HorizontalSize(15),
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: Metrix.VerticalSize(15),
    marginBottom: Metrix.VerticalSize(10),
  },
  statNumber: {
    fontSize: Metrix.FontExtraLarge,
    fontFamily: fonts.InterBold,
    color: colors.buttonColor,
    marginBottom: Metrix.VerticalSize(5),
  },
  statLabel: {
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterRegular,
    color: colors.gray,
  },

  // Button styles
  buttonRow: {
    flexDirection: 'row',
    gap: Metrix.HorizontalSize(10),
    paddingHorizontal: Metrix.HorizontalSize(15),
    marginTop: Metrix.VerticalSize(20),
  },
});

export default styles;
