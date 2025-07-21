import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { updateUserSubscription } from '../redux/Actions/authActions/loginAction';
import SubscriptionService from '../services/subscriptionService';
import { Metrix } from '../config';
import fonts from '../config/Fonts';
import colors from '../config/Colors';
import CustomButton from './Button/Button';

const SubscriptionStatus = () => {
  const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Check if merchant is subscribed
  const isMerchantSubscribed = () => {
    return user?.role === 'MERCHANT' && 
           user?.subscription && 
           user?.subscription.status === 'active';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount, currency = 'cad') => {
    if (!amount) return '$0.00';
    const dollars = (amount / 100).toFixed(2);
    return `$${dollars}`;
  };

  const handleManageSubscription = () => {
    navigation.navigate('MerchantItems');
  };

  const handleCancelSubscription = async () => {
    Alert.alert(
      'Cancel Subscription',
      'Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your current billing period.',
      [
        { text: 'Keep Subscription', style: 'cancel' },
        { 
          text: 'Cancel Subscription', 
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await SubscriptionService.cancelSubscription();
              if (response.subscription) {
                // Update user state with cancelled subscription
                dispatch(updateUserSubscription(response.subscription));
                Alert.alert('Subscription Cancelled', response.message || 'Your subscription will be cancelled at the end of the current billing period.');
              }
            } catch (error) {
              console.error('Error cancelling subscription:', error);
              Alert.alert('Error', 'Failed to cancel subscription. Please try again.');
            }
          }
        }
      ]
    );
  };

  if (user?.role !== 'MERCHANT') {
    return null; // Don't show for non-merchants
  }

  if (!isMerchantSubscribed()) {
    return (
      <View style={{
        backgroundColor: '#FFF3CD',
        borderWidth: 1,
        borderColor: '#FFEAA7',
        borderRadius: Metrix.VerticalSize(8),
        padding: Metrix.VerticalSize(15),
        marginHorizontal: Metrix.HorizontalSize(15),
        marginVertical: Metrix.VerticalSize(10)
      }}>
        <Text style={{
          fontSize: Metrix.FontSmall,
          fontFamily: fonts.InterBold,
          color: '#856404',
          marginBottom: Metrix.VerticalSize(5)
        }}>
          No Active Subscription
        </Text>
        <Text style={{
          fontSize: Metrix.FontExtraSmall,
          fontFamily: fonts.InterRegular,
          color: '#856404',
          marginBottom: Metrix.VerticalSize(10),
          lineHeight: Metrix.VerticalSize(16)
        }}>
          Subscribe to unlock premium features and boost your business growth.
        </Text>
        <CustomButton
          width={Metrix.HorizontalSize(150)}
          height={Metrix.VerticalSize(35)}
          title="Subscribe Now"
          fontSize={Metrix.FontExtraSmall}
          fontFamily={fonts.InterBold}
          borderRadius={5}
          onPress={handleManageSubscription}
        />
      </View>
    );
  }

  return (
    <View style={{
      backgroundColor: '#D4EDDA',
      borderWidth: 1,
      borderColor: '#C3E6CB',
      borderRadius: Metrix.VerticalSize(8),
      padding: Metrix.VerticalSize(15),
      marginHorizontal: Metrix.HorizontalSize(15),
      marginVertical: Metrix.VerticalSize(10)
    }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Metrix.VerticalSize(10)
      }}>
        <Text style={{
          fontSize: Metrix.FontSmall,
          fontFamily: fonts.InterBold,
          color: '#155724'
        }}>
          {user?.subscription?.planName} Plan
        </Text>
        <View style={{
          backgroundColor: '#28A745',
          paddingHorizontal: Metrix.HorizontalSize(8),
          paddingVertical: Metrix.VerticalSize(2),
          borderRadius: 3
        }}>
          <Text style={{
            fontSize: Metrix.normalize(8),
            fontFamily: fonts.InterBold,
            color: colors.white
          }}>
            ACTIVE
          </Text>
        </View>
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Metrix.VerticalSize(5)
      }}>
        <Text style={{
          fontSize: Metrix.FontExtraSmall,
          fontFamily: fonts.InterRegular,
          color: '#155724'
        }}>
          Billing Amount:
        </Text>
        <Text style={{
          fontSize: Metrix.FontExtraSmall,
          fontFamily: fonts.InterBold,
          color: '#155724'
        }}>
          {formatCurrency(user?.subscription?.amount, user?.subscription?.currency)}
        </Text>
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Metrix.VerticalSize(5)
      }}>
        <Text style={{
          fontSize: Metrix.FontExtraSmall,
          fontFamily: fonts.InterRegular,
          color: '#155724'
        }}>
          Next Billing:
        </Text>
        <Text style={{
          fontSize: Metrix.FontExtraSmall,
          fontFamily: fonts.InterBold,
          color: '#155724'
        }}>
          {formatDate(user?.subscription?.currentPeriodEnd)}
        </Text>
      </View>

      {user?.subscription?.cancelAtPeriodEnd && (
        <View style={{
          backgroundColor: '#F8D7DA',
          borderWidth: 1,
          borderColor: '#F5C6CB',
          borderRadius: Metrix.VerticalSize(5),
          padding: Metrix.VerticalSize(8),
          marginTop: Metrix.VerticalSize(10)
        }}>
          <Text style={{
            fontSize: Metrix.FontExtraSmall,
            fontFamily: fonts.InterBold,
            color: '#721C24',
            textAlign: 'center'
          }}>
            ⚠️ Subscription will be cancelled at the end of current period
          </Text>
        </View>
      )}

      <View style={{
        flexDirection: 'row',
        gap: Metrix.HorizontalSize(10),
        marginTop: Metrix.VerticalSize(10)
      }}>
        <CustomButton
          width={Metrix.HorizontalSize(100)}
          height={Metrix.VerticalSize(30)}
          title="Manage"
          fontSize={Metrix.FontExtraSmall}
          fontFamily={fonts.InterBold}
          borderRadius={5}
          onPress={handleManageSubscription}
        />
        <CustomButton
          width={Metrix.HorizontalSize(100)}
          height={Metrix.VerticalSize(30)}
          title="Cancel"
          fontSize={Metrix.FontExtraSmall}
          fontFamily={fonts.InterBold}
          borderRadius={5}
          backgroundColor="#DC3545"
          onPress={handleCancelSubscription}
        />
      </View>
    </View>
  );
};

export default SubscriptionStatus; 