import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import NavBar from '../../../components/navBar/NavBar';
import BackArrowIcon from '../../../components/backArrowIcon/BackArrowIcon';
import styles from './style';
import { Images, Metrix } from '../../../config';
import fonts from '../../../config/Fonts';
import colors from '../../../config/Colors';
import { EditIcon, GreenBitIcon, PointsEarnIcon, SgTipsIcon } from '../../../assets/svg';
import axiosInstance from '../../../config/axios';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';

const publishedSGTipsData = [
  {
    id: 1,
    title: "How to repair and upcycle old clothes",
    bids: "600"
  },
  {
    id: 2,
    title: "How to design and make new accessories",
    bids: "150"
  },

]

const favouriteSGTipsData = [
  {
    id: 1,
    title: "How to repair and upcycle old clothes",
  },
  {
    id: 2,
    title: "How to design and make new accessories",
  },

]

const draftsSGTipsData = [
  {
    id: 1,
    title: "How to style your wardrobe",
    edit: true
  },
  {
    id: 2,
    title: "How to style your wardrobe",
    edit: true
  }
]

const renderData = (item) => {
  return (
    <View key={item.id} style={styles.renderDataContainer}>
      <View style={styles.renderLeftContainer}>
        <SgTipsIcon />
        <Text style={styles.renderTitle}>{item.title}</Text>
      </View>
      {
        item.bids &&
        <View style={styles.bidsContainer}>
          <GreenBitIcon />
          <Text>{item.bids}</Text>
        </View>
      }
      {
        item.edit &&
        <EditIcon />
      }
    </View>
  )
}

export default function MySGTips() {

 const { user } = useSelector((state) => state.login);
 const [loading, setLoading] = useState(true);

//  console.log("user==>>",user)

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/api/sgtips/user/${user.id}`);
            console.log("response user tips==>>",response.data)
        } catch (error) {
            console.error('Failed to fetch SG Tip:', error?.response?.data || error.message);
        } finally {
            setLoading(false); 
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    if (loading) {
        return (
            <View style={[styles.mainContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={colors.buttonColor} />
            </View>
        );
    }

  return (
    <View style={styles.myTipsContainer}>
      <View style={styles.topContainer}>
        <BackArrowIcon />
        <NavBar title={"My SG Tips"} />
      </View>

      <View style={styles.middleContainer}>
        <Text style={styles.middleHeading}>Earned Points via SG Tips</Text>
        <View style={styles.middleSame}>
          <GreenBitIcon />
          <Text style={styles.middleBids}>10,300</Text>
        </View>
        <View style={styles.middleSame}>
          <PointsEarnIcon />
          <Text style={styles.middleEarn}>Points earned <Text style={{ fontFamily: fonts.InterBold }}>+300</Text> from last <Text style={{ fontFamily: fonts.InterBold, color: colors.buttonColor }}>SG Tips</Text></Text>
        </View>
        <View style={styles.middleTotalTips}>
          <View style={styles.middleTipsCount}>
            <Text style={styles.middleHeading}>Total Tips : 06</Text>
            <Text style={styles.middleHeading}>Active : 02</Text>
          </View>
        </View>
      </View>


      <ScrollView style={styles.bottomContainer} contentContainerStyle={{ gap: Metrix.VerticalSize(20), }}>
        <View>
          <Text style={[styles.bottomSameText, { color: colors.buttonColor }]}>Published SG Tips</Text>
          {publishedSGTipsData.map(renderData)}
        </View>
        <View>
          <Text style={[styles.bottomSameText, { color: colors.redColor }]}>Draft SG Tips</Text>
          {draftsSGTipsData.map(renderData)}
        </View>
        <View>
          <Text style={styles.bottomSameText}>Favourite SG Tips</Text>
          {favouriteSGTipsData.map(renderData)}
        </View>

      </ScrollView>

    </View>
  );
}
