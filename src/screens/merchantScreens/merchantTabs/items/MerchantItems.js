import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserSubscription } from '../../../../redux/Actions/authActions/loginAction';
import { isMerchantSubscribed, formatCurrency } from '../../../../utils/subscriptionUtils';
import { MerchantHomeAdImage } from '../../../../assets/svg';
import { Metrix } from '../../../../config';
import CustomButton from '../../../../components/Button/Button';
import fonts from '../../../../config/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MerchantNavbar from '../../../../components/navBar/MerchantNavbar';
import ApiCaller from '../../../../config/ApiCaller';
import { useFocusEffect } from '@react-navigation/native';
import SubscriptionService from '../../../../services/subscriptionService';
// Stripe imports
import { useStripe } from '@stripe/stripe-react-native';

// Package colors for different tiers
const packageColors = {
  "Basic": "#FEEDD2",
  "Premium": "#DCF3E9",
  "Ultimate": "#E8EBFE"
};

// Static package data
const staticPackages = [
  {
    id: "price_1Rn0eLBSnkvyM8bzouEkPRlB",
    name: "Basic",
    description: "Perfect for small businesses getting started with advertising",
    price: 2000,
    currency: "cad",
    interval: "day",
    intervalCount: 7,
    features: [
      "7 days period",
      "1 Ad Post",
      "1 Coupon"
    ],
    popular: false
  },
  {
    id: "price_1Rn0eLBSnkvyM8bzQfSess4S",
    name: "Premium",
    description: "Ideal for growing businesses with more advertising needs",
    price: 3000,
    currency: "cad",
    interval: "day",
    intervalCount: 14,
    features: [
      "14 days period",
      "1 Ad Post",
      "1 Coupon"
    ],
    popular: true
  },
  {
    id: "price_1Rn0eLBSnkvyM8bzEnyuMWHM",
    name: "Ultimate",
    description: "For large businesses requiring maximum advertising capabilities",
    price: 5000,
    currency: "cad",
    interval: "month",
    intervalCount: 1,
    features: [
      "30 days period",
      "1 Ad Post",
      "2 Coupons"
    ],
    popular: false
  }
];

const referralsData = [{
  description: "Steve is signed up as merchant, use this unique coupon to avail 25% off on any package.",
},
{
  description: "Ashley is signed up as merchant, use this unique coupon to avail 25% off on any package."
}]

export default function MerchantItems() {
  const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [subscriptionPlans, setSubscriptionPlans] = useState(staticPackages);
  const [loading, setLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [referralEmail, setReferralEmail] = useState('');
  const [sendingReferral, setSendingReferral] = useState(false);

  // Check if merchant is subscribed using utility function
  const checkMerchantSubscribed = () => isMerchantSubscribed(user);
  
  // Get subscription from Redux state or local state (prioritize Redux)
  const activeSubscription = user?.subscription || currentSubscription;

  // Fetch subscription plans and current subscription when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchSubscriptionPlans();
      fetchCurrentSubscription();
      // Initialize currentSubscription from Redux state if available
      if (user?.subscription) {
        setCurrentSubscription(user.subscription);
      }
    }, [user?.subscription])
  );

  const fetchSubscriptionPlans = async () => {
    try {
      setLoading(true);

      console.log('Fetching subscription plans...');
      const plans = await SubscriptionService.getSubscriptionPlans();
      console.log('Subscription plans response:', plans);

      // Check if plans is in a nested structure
      const plansArray = plans?.data || plans?.plans || plans || staticPackages;
      console.log('Plans array:', plansArray);
      console.log('Plans array length:', plansArray.length);

      setSubscriptionPlans(plansArray);
    } catch (error) {
      console.error('Error fetching subscription plans:', error);
      // Fallback to static packages if API fails
      setSubscriptionPlans(staticPackages);
    } finally {
      setLoading(false);
    }
  };

  const handleSendReferral = async () => {
    if (!referralEmail.trim()) {
      Alert.alert('Error', 'Please enter an email address');
      return;
    }

    try {
      setSendingReferral(true);
      console.log('Referral email:', referralEmail.trim());

      Alert.alert('Success', 'Referral invitation sent successfully!');
      setReferralEmail('');
    } catch (error) {
      console.error('Referral error:', error);
      Alert.alert('Error', 'Failed to send referral. Please try again.');
    } finally {
      setSendingReferral(false);
    }
  };

  const fetchCurrentSubscription = async () => {
    try {
      const subscription = await SubscriptionService.getCurrentSubscription();
      setCurrentSubscription(subscription);
      console.log('Current subscription:', subscription);
    } catch (error) {
      console.error('Error fetching current subscription:', error);
    }
  };

  const initializePaymentSheet = async (clientSecret) => {
    try {
      const { error } = await initPaymentSheet({
        merchantDisplayName: 'Share Garden',
        paymentIntentClientSecret: clientSecret,
        defaultBillingDetails: {
          name: `${user?.firstName} ${user?.lastName}`,
          email: user?.email,
        },
      });

      if (error) {
        console.error('Payment sheet initialization error:', error);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Initialize payment sheet error:', error);
      return false;
    }
  };

  const purchasePlanFunc = async (item) => {
    if (processingPayment) return;

    try {
      setProcessingPayment(true);
      
      // Step 1: Create subscription and get client secret
      console.log('Creating subscription for plan:', item);
      const response = await SubscriptionService.createSubscription(item.id);
      console.log('Subscription response:', response);

      if (!response.success || !response.clientSecret) {
        Alert.alert('Error', response.message || 'Failed to create subscription');
        return;
      }

      // Step 2: Initialize payment sheet
      const paymentSheetInitialized = await initializePaymentSheet(response.clientSecret);
      if (!paymentSheetInitialized) {
        Alert.alert('Error', 'Failed to initialize payment sheet');
        return;
      }

      // Step 3: Present payment sheet
      const { error } = await presentPaymentSheet();

      if (error) {
        console.error('Payment failed:', error);
        Alert.alert('Payment Failed', error.message || 'Payment was cancelled or failed');
        return;
      }

      // Step 4: Payment successful
      Alert.alert(
        'Success!',
        `Your ${item.name} subscription has been activated successfully!`,
        [{ text: 'OK' }]
      );

      // Step 5: Update user state and refresh data
      const updatedSubscription = {
        id: response.subscriptionId,
        planName: item.name,
        status: 'active',
        amount: item.price,
        currency: item.currency,
        currentPeriodStart: new Date().toISOString(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      };

      dispatch(updateUserSubscription(updatedSubscription));
      setCurrentSubscription(updatedSubscription);
      
      // Refresh subscription data
      await fetchCurrentSubscription();
      
    } catch (error) {
      console.error('Purchase error:', error);
      Alert.alert('Error', 'Failed to process purchase. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  };

    const renderPackgesData = ({ item, index }) => {
    const color = packageColors[item.name] || "#FEEDD2";
    const priceInDollars = formatCurrency(item.price, item.currency);
    const isCurrentPlan = activeSubscription?.planName === item.name;
    const hasActiveSubscription = activeSubscription && activeSubscription.status === 'active';
    
    return (
      <View 
        key={index} 
        style={[
          styles.renderPackgesData, 
          { 
            backgroundColor: color,
            opacity: hasActiveSubscription && !isCurrentPlan ? 0.5 : 1
          }
        ]}
      >
        <View style={styles.packageTopSection}>
          <Text style={styles.packageTitle}>{item.name}</Text>
          <Text style={styles.packagePrice}>{priceInDollars}</Text>
          {item.popular && (
            <View style={styles.popularBadge}>
              <Text style={styles.popularText}>Popular</Text>
            </View>
          )}
          {isCurrentPlan && (
            <View style={[styles.popularBadge, { backgroundColor: '#4CAF50' }]}>
              <Text style={styles.popularText}>Current</Text>
            </View>
          )}
        </View>

        <View>
          <Text style={styles.includesText}>Includes</Text>
          {item.features.map((feature, featureIndex) => (
            <Text key={featureIndex} style={styles.packageDetail}>{feature}</Text>
          ))}
        </View>

        <CustomButton
          width={Metrix.HorizontalSize(92)}
          height={Metrix.VerticalSize(26)}
          title={processingPayment ? "Processing..." : isCurrentPlan ? "Current Plan" : "Purchase"}
          fontSize={Metrix.normalize(10)}
          fontFamily={fonts.InterBold}
          borderRadius={3}
          onPress={() => !isCurrentPlan && !hasActiveSubscription && purchasePlanFunc(item)}
          disabled={processingPayment || isCurrentPlan || hasActiveSubscription}
          backgroundColor={isCurrentPlan ? "#ccc" : hasActiveSubscription ? "#ccc" : undefined}
        />
      </View>
    );
  };

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
              {checkMerchantSubscribed() ? (
                <Text style={{ flex: 1, fontSize: Metrix.FontSmall, fontFamily: fonts.InterRegular }}>
                  You have an active {user?.subscription?.planName} subscription. Manage your subscription or upgrade to a higher tier.
                </Text>
              ) : (
                <Text style={{ flex: 1, fontSize: Metrix.FontSmall, fontFamily: fonts.InterRegular }}>
                  Choose from our available packages to unlock powerful tools and boost your sales today!
                </Text>
              )}
            </View>
          </View>
        </View>

        {processingPayment && (
          <View style={styles.processingPaymentContainer}>
            <ActivityIndicator size="large" color="#003034" />
            <Text style={styles.processingPaymentText}>Processing your payment...</Text>
          </View>
        )}

        <View style={styles.packageContainer}>
          <View style={{ marginBottom: Metrix.VerticalSize(10) }}>
            <Text style={{ fontSize: Metrix.normalize(20), fontFamily: fonts.InterBold }}>
              Available Packages
            </Text>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#003034" />
              <Text style={styles.loadingText}>Loading packages...</Text>
            </View>
          ) : (
            <View style={{ flexDirection: 'row', gap: Metrix.HorizontalSize(10) }}>
              {subscriptionPlans.map((item, index) => {
                return renderPackgesData({ item, index });
              })}
            </View>
          )}
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
              value={referralEmail}
              onChangeText={setReferralEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <CustomButton
              width={Metrix.HorizontalSize(103)}
              height={Metrix.VerticalSize(58)}
              title={sendingReferral ? "Sending..." : "Send"}
              fontSize={Metrix.FontSmall}
              fontFamily={fonts.InterBold}
              borderRadius={4}
              onPress={handleSendReferral}
              disabled={sendingReferral}
            />
          </View>
        </View>

      </KeyboardAwareScrollView>
    </View>
  );
}

