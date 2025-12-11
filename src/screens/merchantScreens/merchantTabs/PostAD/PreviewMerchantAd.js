import { useState } from "react"
import { Image, Text, View, ActivityIndicator } from "react-native"
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
import { BASE_URL } from "../../../../config/constants"

const PreviewMerchantAd = ({ route , navigation }) => {
  const [isPublishing, setIsPublishing] = useState(false);

  const { 
    image,
    title,
    description,
    categoryId,
    categoryName,
    addCoupon,
    discountType,
    percentageValue,
    fixedValue,
    couponCode,
    redeemByOnline,
    redeemByInStore,
    expiryDate,
    redemptionPoints,
    disclaimer,
  } = route.params

  const { user } = useSelector((state) => state.login)

  return (
    <View style={styles.previewContainer}>
      {isPublishing && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary || '#F8443E'} />
            <Text style={{ marginTop: 10, fontSize: 16 }}>Publishing your ad...</Text>
          </View>
        </View>
      )}
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
            <Text style={styles.pointsText}>{redemptionPoints || '0'}</Text>
          </View>
        </View>

        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerBold}>
            Disclaimer:
            <Text style={styles.disclaimerRegular}>
              {" "}{disclaimer || 'Valid for one-time use only per user. Cannot be combined with other offers or discounts. Show this page to the merchant to avail this coupon in store.'}
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
                categoryId,
                categoryName,
                addCoupon,
                discountType,
                percentageValue,
                fixedValue,
                couponCode,
                redeemByOnline,
                redeemByInStore,
                expiryDate,
                redemptionPoints,
                disclaimer,
              })
            }
          />
          <CustomButton
            flex={1}
            title={isPublishing ? "PUBLISHING..." : "PUBLISH"}
            height={Metrix.VerticalSize(42)}
            fontSize={Metrix.FontSmall}
            borderRadius={4}
            disabled={isPublishing}
            onPress={async () => {
              setIsPublishing(true);
              try {
                const formData = new FormData();
                if (title) formData.append('title', title);
                if (description) formData.append('description', description);
                if (categoryId) {
                  formData.append('categoryId', categoryId);
                } else {
                  Toast.show({ type: 'error', text1: 'Error', text2: 'Category is required. Please go back and select a category.' });
                  return;
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
                  formData.append('disclaimer', disclaimer || description || '');
                } else {
                  formData.append('addCoupon', 'false');
                }

                // Get user token from Redux store
                const token = user?.token;
                if (!token) {
                  throw new Error('No authentication token found');
                }

                // Use fetch instead of axios for FormData upload
                const response = await fetch(`${BASE_URL}/api/ads`, {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    // Don't set Content-Type - let React Native set it automatically with boundary
                  },
                  body: formData,
                });

                const responseData = await response.json();

                if (!response.ok) {
                  throw new Error(responseData.message || `Server error: ${response.status}`);
                }

                if (response.status === 201) {
                  // Use fetch for publish as well
                  try {
                    const publishResponse = await fetch(`${BASE_URL}/api/ads/${responseData.id}/publish`, {
                      method: 'PATCH',
                      headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                      },
                    });
                    
                    if (!publishResponse.ok) {
                      const publishError = await publishResponse.json();
                      console.error('Publish error:', publishError);
                    }
                  } catch (publishErr) {
                    console.error('Publish error:', publishErr);
                  }
                  
                  setIsPublishing(false);
                  Toast.show({ 
                    type: 'success', 
                    text1: 'Ad Published', 
                    text2: 'Your ad has been successfully posted!' 
                  });
                  
                  // Navigate to MerchantItems tab (main screen) and reset navigation stack
                  // This will also clear the Post Ad and Preview screens
                  navigation.getParent()?.navigate('MerchantItems');
                } else {
                  setIsPublishing(false);
                  Toast.show({ type: 'error', text1: 'Error', text2: responseData?.message || 'Failed to publish ad' });
                }
              } catch (e) {
                console.error('Ad creation error:', e);
                setIsPublishing(false);
                Toast.show({ type: 'error', text1: 'Error', text2: e.message || 'Failed to publish ad' });
              }
            }}
          />
        </View>
      </KeyboardAwareScrollView>





    </View>
  )
}

export default PreviewMerchantAd
