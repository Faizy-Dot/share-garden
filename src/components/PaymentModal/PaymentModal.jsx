import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Metrix } from '../../config';
import fonts from '../../config/Fonts';
import colors from '../../config/Colors';
import CustomButton from '../Button/Button';
// Stripe imports - will be uncommented after installing the package
// import { CardField, useStripe, useConfirmPayment } from '@stripe/stripe-react-native';

const PaymentModal = ({ visible, onClose, plan, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);
  
  // Stripe hooks - will be uncommented after installing the package
  // const { confirmPayment } = useConfirmPayment();
  // const { createToken } = useStripe();

  const handlePayment = async () => {
    if (!cardDetails) {
      Alert.alert('Error', 'Please enter card details');
      return;
    }

    try {
      setLoading(true);
      
      // This will be implemented with Stripe SDK
      // const { error, paymentIntent } = await confirmPayment(clientSecret, {
      //   paymentMethodType: 'Card',
      // });
      
      // For now, simulate payment
      setTimeout(() => {
        setLoading(false);
        onSuccess();
        onClose();
        Alert.alert('Success', 'Payment completed successfully!');
      }, 2000);
      
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Payment failed. Please try again.');
    }
  };

  const priceInDollars = plan ? (plan.price / 100).toFixed(2) : '0.00';

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Complete Payment</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            {plan && (
              <View style={styles.planSummary}>
                <Text style={styles.planName}>{plan.name}</Text>
                <Text style={styles.planPrice}>${priceInDollars}</Text>
                <Text style={styles.planDescription}>{plan.description}</Text>
                
                <View style={styles.featuresContainer}>
                  <Text style={styles.featuresTitle}>Includes:</Text>
                  {plan.features.map((feature, index) => (
                    <Text key={index} style={styles.feature}>• {feature}</Text>
                  ))}
                </View>
              </View>
            )}

            <View style={styles.paymentSection}>
              <Text style={styles.sectionTitle}>Payment Details</Text>
              
              {/* Card Field - will be uncommented after installing Stripe */}
              {/* <CardField
                postalCodeEnabled={false}
                placeholder={{
                  number: "4242 4242 4242 4242",
                }}
                cardStyle={styles.cardField}
                style={styles.cardFieldContainer}
                onCardChange={(cardDetails) => {
                  setCardDetails(cardDetails);
                }}
              /> */}
              
              {/* Temporary placeholder */}
              <View style={styles.cardFieldPlaceholder}>
                <Text style={styles.placeholderText}>
                  Card details will appear here after installing Stripe SDK
                </Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <CustomButton
              width="100%"
              height={Metrix.VerticalSize(50)}
              title={loading ? "Processing..." : `Pay $${priceInDollars}`}
              fontSize={Metrix.FontSmall}
              fontFamily={fonts.InterBold}
              borderRadius={8}
              onPress={handlePayment}
              disabled={loading}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
    padding: Metrix.HorizontalSize(20),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Metrix.VerticalSize(20),
  },
  modalTitle: {
    fontSize: Metrix.normalize(20),
    fontFamily: fonts.InterBold,
    color: colors.textColor,
  },
  closeButton: {
    padding: Metrix.HorizontalSize(5),
  },
  closeButtonText: {
    fontSize: Metrix.normalize(20),
    color: colors.textColor,
  },
  modalBody: {
    flex: 1,
  },
  planSummary: {
    backgroundColor: colors.lightGray,
    padding: Metrix.HorizontalSize(15),
    borderRadius: 8,
    marginBottom: Metrix.VerticalSize(20),
  },
  planName: {
    fontSize: Metrix.normalize(18),
    fontFamily: fonts.InterBold,
    color: colors.textColor,
  },
  planPrice: {
    fontSize: Metrix.normalize(24),
    fontFamily: fonts.InterBold,
    color: colors.buttonColor,
    marginVertical: Metrix.VerticalSize(5),
  },
  planDescription: {
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterRegular,
    color: colors.textColor,
    marginBottom: Metrix.VerticalSize(10),
  },
  featuresContainer: {
    marginTop: Metrix.VerticalSize(10),
  },
  featuresTitle: {
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterBold,
    color: colors.textColor,
    marginBottom: Metrix.VerticalSize(5),
  },
  feature: {
    fontSize: Metrix.FontExtraSmall,
    fontFamily: fonts.InterRegular,
    color: colors.textColor,
    marginBottom: Metrix.VerticalSize(2),
  },
  paymentSection: {
    marginBottom: Metrix.VerticalSize(20),
  },
  sectionTitle: {
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterBold,
    color: colors.textColor,
    marginBottom: Metrix.VerticalSize(10),
  },
  cardFieldContainer: {
    height: Metrix.VerticalSize(50),
    marginVertical: Metrix.VerticalSize(10),
  },
  cardField: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
  },
  cardFieldPlaceholder: {
    height: Metrix.VerticalSize(50),
    backgroundColor: colors.lightGray,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Metrix.VerticalSize(10),
  },
  placeholderText: {
    fontSize: Metrix.FontExtraSmall,
    fontFamily: fonts.InterRegular,
    color: colors.textColor,
    textAlign: 'center',
    paddingHorizontal: Metrix.HorizontalSize(10),
  },
  modalFooter: {
    marginTop: Metrix.VerticalSize(20),
  },
};

export default PaymentModal; 