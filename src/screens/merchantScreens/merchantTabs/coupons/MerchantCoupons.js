import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import colors from '../../../../config/Colors';
import MerchantNavbar from '../../../../components/navBar/MerchantNavbar';
import { useSelector } from 'react-redux';
import { Metrix } from '../../../../config';
import fonts from '../../../../config/Fonts';
import DropdownComponent from '../../../../components/dropDown/DropDownInput';
import CustomButton from '../../../../components/Button/Button';
import styles from './styles';
import axiosInstance from '../../../../config/axios';
import Toast from 'react-native-toast-message';

export default function MerchantCoupons() {

  const { user } = useSelector((state) => state.login);

  const [selectedOption, setSelectedOption] = useState("coupons");
  const [paymentsData, setPaymentsData] = useState(null);
  const [loading, setLoading] = useState(false);

  const data = [
    { label: "See Coupon", value: "coupons" },
    { label: "See Payments", value: "payments" }
  ];

  // Fetch payments data from API
  const fetchPaymentsData = async () => {
    setLoading(true);
    try {
      console.log('Fetching payments data...');
      const response = await axiosInstance.get('/api/subscriptions/payments');
      console.log('=== PAYMENTS API RESPONSE ===');
      console.log('Full response:', response);
      console.log('Response data:', response.data);
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (response.data) {
        console.log('Success flag:', response.data.success);
        console.log('Summary:', response.data.summary);
        console.log('Payments object:', response.data.payments);
        console.log('Raw payments array:', response.data.rawPayments);
        console.log('Raw payments length:', response.data.rawPayments?.length);
        
        if (response.data.rawPayments && response.data.rawPayments.length > 0) {
          console.log('First payment example:', response.data.rawPayments[0]);
        }
      }
      console.log('=== END API RESPONSE ===');
      
      setPaymentsData(response.data);
    } catch (error) {
      console.error('=== PAYMENTS API ERROR ===');
      console.error('Error object:', error);
      console.error('Error message:', error.message);
      console.error('Error response:', error.response);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      }
      console.error('=== END ERROR ===');
      
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load payment history',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedOption === "payments") {
      fetchPaymentsData();
    }
  }, [selectedOption]);

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Helper function to convert cents to dollars
  const centsToDollars = (cents) => {
    return (cents / 100).toFixed(2);
  };

  // Helper function to get package name based on amount
  const getPackageName = (amount) => {
    const amountInDollars = centsToDollars(amount);
    if (amountInDollars <= 20) return "Basic";
    if (amountInDollars <= 50) return "Premium";
    return "Ultimate";
  };

  // Helper function to get package color
  const getPackageColor = (packageName) => {
    switch (packageName) {
      case "Basic": return "#FEEDD2";
      case "Premium": return "#DCF3E9";
      case "Ultimate": return "#E8EBFE";
      default: return "#FEEDD2";
    }
  };

  // Helper function to get currency symbol
  const getCurrencySymbol = (currency) => {
    switch (currency?.toLowerCase()) {
      case 'usd': return '$';
      case 'cad': return 'C$';
      case 'eur': return '€';
      case 'gbp': return '£';
      case 'inr': return '₹';
      default: return '$';
    }
  };

  // Process API data to match existing UI structure
  const processPaymentsData = () => {
    if (!paymentsData || !paymentsData.rawPayments) return [];

    // Filter payments for only paid/succeeded status
    const paidPayments = paymentsData.rawPayments.filter(payment => 
      payment.status === 'paid' || payment.status === 'succeeded'
    );

    console.log('Filtered paid payments:', paidPayments);

    if (paidPayments.length === 0) return [];

    // Group payments by date
    const groupedPayments = {};
    paidPayments.forEach(payment => {
      const date = formatDate(payment.date);
      if (!groupedPayments[date]) {
        groupedPayments[date] = [];
      }
      groupedPayments[date].push(payment);
    });

    return Object.entries(groupedPayments).map(([date, payments]) => ({
      date,
      payments: payments.map(payment => ({
        packageName: payment.planName || getPackageName(payment.amount),
        amount: centsToDollars(payment.amount),
        currency: payment.currency || 'usd',
        currencySymbol: getCurrencySymbol(payment.currency),
        referralDiscount: payment.referralDiscount || "none",
        recurring: payment.recurring || "none",
        backgroundColor: getPackageColor(payment.planName || getPackageName(payment.amount))
      }))
    }));
  };

  const basic = [
    { referralDiscount: "none", amount: 20 },
    { referralDiscount: "25%", amount: 15 },
  ];

  const redemptionCoupons = [
    {
      state: "Active",
      amount: 250,
      title: "20% OFF, Canada Day Sale"
    },
    {
      state: "Active",
      amount: 1250,
      title: "20% OFF, Canada Day Sale"
    },
    {
      state: "Expired",
      amount: 700,
      title: "20% OFF, Canada Day Sale"
    },
    {
      state: "Active",
      amount: 1250,
      title: "20% OFF, Canada Day Sale"
    },
  ]

  const processedPayments = processPaymentsData();

  return (
    <View style={styles.container}>
      <MerchantNavbar title={user.firstName} />

      <View style={styles.header}>
        <Text style={styles.merchantId}>Business: {user?.businessName || `${user?.firstName} ${user?.lastName}`}</Text>
        <Text style={styles.merchantEmail}>{user.email}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.dropdownRow}>
          <View style={styles.dropdownTextContainer}>
            <Text style={styles.title}>{selectedOption === "payments" ? "Ads Payment History" : "Coupons Redemption History"}</Text>
            <Text style={styles.subtitle}>Shows only last 60 days history</Text>
          </View>

          <DropdownComponent
            height={Metrix.VerticalSize(38)}
            data={data}
            value={selectedOption}
            fontSize={Metrix.normalize(10)}
            fontFamily={fonts.InterBold}
            width={Metrix.HorizontalSize(126)}
            onChange={(item) => setSelectedOption(item.value)}
            listText={Metrix.normalize(10)}
            paddingHorizontal={Metrix.HorizontalSize(10)}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {
            selectedOption == "payments" ?
              <>
                {processedPayments.length > 0 ? (
                  processedPayments.map((dateGroup, dateIndex) => (
                    <View key={dateIndex}>
                      <View style={styles.dateSection}>
                        <Text style={styles.dateText}>{dateGroup.date}</Text>
                      </View>

                      <View style={styles.cardGroup}>
                        {dateGroup.payments.map((item, index) => (
                          <View key={index} style={styles.card}>
                            <View style={styles.cardLeft}>
                              <CustomButton
                                title={item.packageName}
                                height={Metrix.VerticalSize(31)}
                                width={Metrix.HorizontalSize(112)}
                                backgroundColor={item.backgroundColor}
                                color={colors.black}
                                fontSize={Metrix.normalize(13)}
                                fontFamily={fonts.InterBold}
                              />
                              <View>
                                <Text style={styles.cardDetail}>Referral Discount: {item.referralDiscount}</Text>
                                <Text style={styles.cardDetail}>Recurring: {item.recurring}</Text>
                              </View>
                            </View>

                            <View>
                              <Text style={styles.cardAmount}>{item.currencySymbol}{item.amount}</Text>
                            </View>
                          </View>
                        ))}
                      </View>
                    </View>
                  ))
                ) : (
                  // Fallback to static data if no API data
                  <>
                    <View style={styles.dateSection}>
                      <Text style={styles.dateText}>Jun 21, 2025, 11:00 PM</Text>
                    </View>

                    <View style={styles.cardGroup}>
                      {basic.map((item, index) => (
                        <View key={index} style={styles.card}>
                          <View style={styles.cardLeft}>
                            <CustomButton
                              title={"Basic"}
                              height={Metrix.VerticalSize(31)}
                              width={Metrix.HorizontalSize(112)}
                              backgroundColor={"#FEEDD2"}
                              color={colors.black}
                              fontSize={Metrix.normalize(13)}
                              fontFamily={fonts.InterBold}
                            />
                            <View>
                              <Text style={styles.cardDetail}>Referral Discount: {item.referralDiscount}</Text>
                              <Text style={styles.cardDetail}>Recurring: none</Text>
                            </View>
                          </View>

                          <View>
                            <Text style={styles.cardAmount}>${item.amount}</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                    <View style={styles.dateSection}>
                      <Text style={styles.dateText}>Jun 21, 2025, 11:00 PM</Text>
                    </View>

                    <View style={styles.cardGroup}>
                      {basic.map((item, index) => (
                        <View key={index} style={styles.card}>
                          <View style={styles.cardLeft}>
                            <CustomButton
                              title={"Premium"}
                              height={Metrix.VerticalSize(31)}
                              width={Metrix.HorizontalSize(112)}
                              backgroundColor={"#DCF3E9"}
                              color={colors.black}
                              fontSize={Metrix.normalize(13)}
                              fontFamily={fonts.InterBold}
                            />
                            <View>
                              <Text style={styles.cardDetail}>Referral Discount: {item.referralDiscount}</Text>
                              <Text style={styles.cardDetail}>Recurring: none</Text>
                            </View>
                          </View>

                          <View>
                            <Text style={styles.cardAmount}>${item.amount}</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                    <View style={styles.dateSection}>
                      <Text style={styles.dateText}>Jun 21, 2025, 11:00 PM</Text>
                    </View>

                    <View style={styles.cardGroup}>
                      {basic.map((item, index) => (
                        <View key={index} style={styles.card}>
                          <View style={styles.cardLeft}>
                            <CustomButton
                              title={"Ultimate"}
                              height={Metrix.VerticalSize(31)}
                              width={Metrix.HorizontalSize(112)}
                              backgroundColor={"#E8EBFE"}
                              color={colors.black}
                              fontSize={Metrix.normalize(13)}
                              fontFamily={fonts.InterBold}
                            />
                            <View>
                              <Text style={styles.cardDetail}>Referral Discount: {item.referralDiscount}</Text>
                              <Text style={styles.cardDetail}>Recurring: none</Text>
                            </View>
                          </View>

                          <View>
                            <Text style={styles.cardAmount}>${item.amount}</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </>
                )}
              </>
              :
              <View>
                <View style={styles.dateSection}>
                  <Text style={styles.dateText}>Jun 21, 2025, 11:00 PM</Text>
                </View>

                <View style={styles.couponContainer}>
                  {redemptionCoupons.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={[
                          styles.couponCard,
                          { backgroundColor: item.state === "Active" ? "#E9F9FF" : "#EEEEEE" }
                        ]}
                      >
                        <View>
                          <Text style={styles.couponTitle}>{item.title}</Text>
                          <Text style={styles.couponDate}>June 4, 2025 - July 4, 2025</Text>
                        </View>

                        <View style={styles.couponDetailsRow}>
                          <View>
                            <Text style={styles.detailLabel}>Validity</Text>
                            <Text style={styles.detailValue}>30 days</Text>
                          </View>

                          <View>
                            <Text style={styles.detailLabel}>Offered</Text>
                            <Text style={styles.detailValue}>25% off</Text>
                          </View>

                          <View>
                            <Text style={styles.detailLabel}>Redeemed</Text>
                            <Text style={styles.detailValue}>12 times</Text>
                          </View>

                          <View
                            style={[
                              styles.stateBadge,
                              { backgroundColor: item.state === "Active" ? "#EBC856" : "#BDBDBD" }
                            ]}
                          >
                            <Text style={styles.stateText}>{item.state}</Text>
                          </View>

                          <View>
                            <Text style={styles.amount}>{item.amount}</Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>

          }

        </ScrollView>


      </View>
    </View>
  );
}
