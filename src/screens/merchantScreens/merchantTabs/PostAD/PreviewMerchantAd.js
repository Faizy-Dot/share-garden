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

const PreviewMerchantAd = ({ route , navigation }) => {

  const { image } = route.params

  const { user } = useSelector((state) => state.login)

  return (
    <View style={styles.previewContainer}>
      <MerchantNavbar title={"Ad Preview"} />

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>Family Day Event Promo, 30% off Store wide!</Text>
          <Text style={styles.categoryText}>Clothing</Text>
          <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.descriptionText}>description</Text>
        </View>

        <View style={styles.couponCard}>
          <View style={styles.couponHeader}>
            <View style={styles.userInfoContainer}>
              <Text style={styles.userInitial}>{user?.firstName.charAt(0).toUpperCase()}</Text>
              <View>
                <Text style={styles.couponTitle}>Family Day Promo</Text>
                <Text style={styles.validUntil}>Valid Until: July 06, 2025</Text>
                <Text style={styles.redeemText}>Redeem coupon: Online, Instore</Text>
              </View>
            </View>
            <View style={styles.discountContainer}>
              <Text style={styles.discountText}>20% OFF</Text>
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
              navigation.navigate("MerchantPostADScreen")
            }
          />
          <CustomButton
            flex={1}
            title={"PUBLISH"}
            height={Metrix.VerticalSize(42)}
            fontSize={Metrix.FontSmall}
            borderRadius={4}
          />
        </View>
      </KeyboardAwareScrollView>





    </View>
  )
}

export default PreviewMerchantAd
