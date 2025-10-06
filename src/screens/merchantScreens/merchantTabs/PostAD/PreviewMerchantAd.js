import { Image, Text, View } from "react-native"
import styles from "./previewStyles"
import MerchantNavbar from "../../../../components/navBar/MerchantNavbar"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Metrix } from "../../../../config"
import colors from "../../../../config/Colors"
import fonts from "../../../../config/Fonts"
import { useSelector } from "react-redux"
import { BlackEyeIcon, GreenBitIcon, PurchaseIcon, ShareIcon } from "../../../../assets/svg"
import CustomButton from "../../../../components/Button/Button"
import axiosInstance from "../../../../config/axios"
import Toast from "react-native-toast-message"

const PreviewMerchantAd = ({ route , navigation }) => {

  const { 
    image,
    title,
    description,
    categoryName,
    addCoupon,
    discountType,
    percentageValue,
    fixedValue,
    couponCode,
    redeemByOnline,
    redeemByInStore,
    expiryDate,
  } = route.params

  const { user } = useSelector((state) => state.login)

  return (
    <View style={styles.previewContainer}>
      <MerchantNavbar title={"Ad Preview"} />

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>{title || 'Ad Title'}</Text>
          <Text style={styles.categoryText}>{categoryName || 'Category'}</Text>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : null}
          <Text style={styles.descriptionText}>{description || ''}</Text>
        </View>

        {addCoupon ? (
        <View style={styles.couponCard}>
          <View style={styles.couponHeader}>
            <View style={styles.userInfoContainer}>
              <Text style={styles.userInitial}>{user?.firstName.charAt(0).toUpperCase()}</Text>
              <View>
                <Text style={styles.couponTitle}>{title || 'Coupon'}</Text>
                <Text style={styles.validUntil}>Valid Until: {expiryDate ? new Date(expiryDate).toDateString() : 'N/A'}</Text>
                <Text style={styles.redeemText}>Redeem coupon: {(redeemByOnline ? 'Online' : '')}{(redeemByOnline && redeemByInStore) ? ', ' : ''}{(redeemByInStore ? 'Instore' : '')}</Text>
              </View>
            </View>
            <View style={styles.discountContainer}>
              <Text style={styles.discountText}>{discountType === 'PERCENTAGE' ? `${percentageValue || 0}% OFF` : (fixedValue ? `$${fixedValue} OFF` : '0 OFF')}</Text>
            </View>
          </View>

          <View style={styles.couponFooter}>
            <View style={styles.iconRow}>
              <View style={styles.iconWithText}>
                <ShareIcon stroke={colors.black} width={16} height={19} />
                <Text style={styles.iconText}>34</Text>
              </View>
              <View style={styles.iconWithText}>
                <BlackEyeIcon />
                <Text style={styles.iconText}>137</Text>
              </View>
              <View style={styles.iconWithText}>
                <PurchaseIcon />
                <Text style={styles.iconText}>15</Text>
              </View>
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>
        </View>
        ) : null}

        <View style={styles.grabCouponSection}>
          <Text style={styles.grabTitle}>Grab this coupon</Text>
          <View style={styles.pointsContainer}>
            <GreenBitIcon width={40} height={40} />
            <Text style={styles.pointsText}>1850</Text>
          </View>
        </View>

        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerBold}>
            Disclaimer:
            <Text style={styles.disclaimerRegular}>
              {" "}Valid for one-time use only per user. Cannot be combined with other offers or discounts. Show this page to the merchant to avail this coupon in store.
            </Text>
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <CustomButton
            flex={1}
            title={"EDIT AD"}
            height={Metrix.VerticalSize(42)}
            borderRadius={4}
            color={colors.black}
            backgroundColor={colors.white}
            borderColor={"#D0D0D0"}
            fontSize={Metrix.FontSmall}
            borderWidth={1}
            onPress={() =>
              navigation.navigate("MerchantPostADScreen", {
                image,
                title,
                description,
                categoryName,
                addCoupon,
                discountType,
                percentageValue,
                fixedValue,
                couponCode,
                redeemByOnline,
                redeemByInStore,
                expiryDate,
              })
            }
          />
          <CustomButton
            flex={1}
            title={"PUBLISH"}
            height={Metrix.VerticalSize(42)}
            fontSize={Metrix.FontSmall}
            borderRadius={4}
            onPress={async () => {
              try {
                const formData = new FormData();
                if (title) formData.append('title', title);
                if (description) formData.append('description', description);
                if (categoryName) {
                  // categoryId is not passed; Preview screen doesn't have id. Inform user to go back if missing.
                }
                if (image) {
                  formData.append('images', { uri: image, type: 'image/jpeg', name: 'ad.jpg' });
                }
                if (addCoupon) {
                  formData.append('addCoupon', 'true');
                  if (discountType) formData.append('discountType', discountType);
                  const redeemBy = redeemByOnline ? 'ONLINE' : (redeemByInStore ? 'ON_STORE' : 'ONLINE');
                  formData.append('redeemBy', redeemBy);
                  if (couponCode) formData.append('couponCode', couponCode);
                  if (expiryDate) formData.append('expiryDate', expiryDate);
                  formData.append('couponTitle', title || 'Coupon');
                  if (discountType === 'PERCENTAGE' && percentageValue) formData.append('percentageValue', String(percentageValue));
                  if (discountType === 'FIXED' && fixedValue) formData.append('fixedAmountValue', String(fixedValue));
                  formData.append('disclaimer', description || '');
                } else {
                  formData.append('addCoupon', 'false');
                }

                const res = await axiosInstance.post('/api/ads', formData);
                if (res.status === 201) {
                  try { await axiosInstance.patch(`/api/ads/${res.data.id}/publish`); } catch {}
                  Toast.show({ type: 'success', text1: 'Ad Published', text2: 'Your ad has been posted.' });
                  navigation.goBack();
                } else {
                  Toast.show({ type: 'error', text1: 'Error', text2: res.data?.message || 'Failed to publish ad' });
                }
              } catch (e) {
                Toast.show({ type: 'error', text1: 'Error', text2: e.response?.data?.message || 'Failed to publish ad' });
              }
            }}
          />
        </View>
      </KeyboardAwareScrollView>





    </View>
  )
}

export default PreviewMerchantAd
