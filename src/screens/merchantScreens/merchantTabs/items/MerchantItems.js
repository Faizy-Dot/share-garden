import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles';
import { useSelector } from 'react-redux';
import {  MerchantHomeAdImage} from '../../../../assets/svg';
import { Metrix } from '../../../../config';
import CustomButton from '../../../../components/Button/Button';
import fonts from '../../../../config/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MerchantNavbar from '../../../../components/navBar/MerchantNavbar';



const packagesData = [
  {
    title: "Basic",
    price: 20,
    days: 7,
    color: "#FEEDD2"
  },
  {
    title: "Premiuim",
    price: 30,
    days: 14,
    color: "#DCF3E9"
  },
  {
    title: "Ultimate",
    price: 50,
    days: 30,
    color: "#E8EBFE"
  },

]

const referralsData = [{
  description: "Steve is signed up as merchant, use this unique coupon to avail 25% off on any package.",

},
{
  description: "Ashley is signed up as merchant, use this unique coupon to avail 25% off on any package."
}]

export default function MerchantItems() {

  const { user } = useSelector((state) => state.login)

  const renderPackgesData = ({ item, index }) => {
    return (
      <View key={index} style={[styles.renderPackgesData, { backgroundColor: item.color }]}>
        <View style={styles.packageTopSection}>
          <Text style={styles.packageTitle}>{item.title}</Text>
          <Text style={styles.packagePrice}>${item.price}</Text>
        </View>

        <View>
          <Text style={styles.includesText}>Includes</Text>
          <Text style={styles.packageDetail}>{item.days} days period</Text>
          <Text style={styles.packageDetail}>1 Ad Post</Text>
          <Text style={styles.packageDetail}>1 Coupon</Text>
        </View>

        <CustomButton
          width={Metrix.HorizontalSize(92)}
          height={Metrix.VerticalSize(26)}
          title={"Purchase"}
          fontSize={Metrix.normalize(10)}
          fontFamily={fonts.InterBold}
          borderRadius={3}
        />
      </View>
    );
  };




  // console.log(user.firstName.charAt(0).toUpperCase())

  return (
    <View style={styles.MerchantItemsContainer}>

    <MerchantNavbar />

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        <View style={styles.topContainer}>

          <View>
            <MerchantHomeAdImage />
          </View>

          <View style={styles.topBottomContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ flex: 1, fontSize: Metrix.FontSmall, fontFamily: fonts.InterRegular }}>You haven’t purchased a package yet. Unlock powerful tools to boost your sales today!</Text>
              <CustomButton width={Metrix.HorizontalSize(106)}
                height={Metrix.VerticalSize(24)}
                backgroundColor="#003034"
                title={"Buy a Package"}
                fontSize={Metrix.FontExtraSmall}
                borderRadius={3}

              />
            </View>
          </View>
        </View>


        <View style={styles.packageContainer}>
          <Text style={{ fontSize: Metrix.normalize(20), fontFamily: fonts.InterBold }}>Select Your Package</Text>
          <View style={{ flexDirection: 'row', gap: Metrix.HorizontalSize(10) }}>
            {
              packagesData.map((item, index) => {
                return (
                  renderPackgesData({ item, index })
                )
              })
            }
          </View>

        </View>


        <View style={styles.referralsConatiner}>
          <View>
            <Text style={styles.referralTitle}>Your Referrals</Text>
            <Text style={styles.referralSubTitle}>
              Referral Coupons expires in 7 days
            </Text>
          </View>

          <View style={{ gap: Metrix.VerticalSize(10), marginTop: Metrix.VerticalSize(10) }}>
            {referralsData.map((item, index) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.referralItem,
                    index !== referralsData.length - 1 && styles.referralItemBorder,
                  ]}
                >
                  <Text style={styles.referralDescription}>{item.description}</Text>
                  <TouchableOpacity style={styles.referralCouponButton}>
                    <Text style={styles.referralCouponText}>APPSPECIAL25</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.referFriend}>
          <Text style={styles.referTitle}>Refer a Friend</Text>
          <View style={styles.referInputRow}>
            <TextInput
              placeholder="Enter Email Address:"
              style={styles.referInput}
            />
            <CustomButton
              width={Metrix.HorizontalSize(103)}
              height={Metrix.VerticalSize(58)}
              title={"Send"}
              fontSize={Metrix.FontSmall}
              fontFamily={fonts.InterBold}
              borderRadius={4}
            />
          </View>
        </View>


      </KeyboardAwareScrollView>

    </View>
  );
}
