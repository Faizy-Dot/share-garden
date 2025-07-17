import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import colors from '../../../../config/Colors';
import MerchantNavbar from '../../../../components/navBar/MerchantNavbar';
import { useSelector } from 'react-redux';
import { Metrix } from '../../../../config';
import fonts from '../../../../config/Fonts';
import DropdownComponent from '../../../../components/dropDown/DropDownInput';
import CustomButton from '../../../../components/Button/Button';
import styles from './styles';

export default function MerchantCoupons() {

  const { user } = useSelector((state) => state.login);

  const [selectedOption, setSelectedOption] = useState("coupons");

  const data = [
    { label: "See Coupon", value: "coupons" },
    { label: "See Payments", value: "payments" }
  ];

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

  return (
    <View style={styles.container}>
      <MerchantNavbar title={user.firstName} />

      <View style={styles.header}>
        <Text style={styles.merchantId}>Merchant ID: M320006</Text>
        <Text style={styles.merchantEmail}>{user.email}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.dropdownRow}>
          <View style={styles.dropdownTextContainer}>
            <Text style={styles.title}>{selectedOption === "coupons" ? "Ads Payment History" : "Coupons Redemption History"}</Text>
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
            selectedOption == "coupons" ?
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
