import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
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



export default function MySGTips({ navigation }) {

  const { user } = useSelector((state) => state.login);
  const [loading, setLoading] = useState(true);
  const [mySGTips, setMySGTips] = useState([])
  const [activeTips, setActiveTips] = useState([]);
  const [draftTips, setDraftTips] = useState([])
  const [error, setError] = useState(null)

  //  console.log("user==>>",user)

  const renderData = (item) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Post", {
        screen: "PostList",
        params: { ...item }
      })}
       key={item.id} style={styles.renderDataContainer}>
        <View style={styles.renderLeftContainer}>
          <SgTipsIcon />
          <Text style={styles.renderTitle}>{item.title}</Text>
        </View>
        {
          item.status === "PUBLISHED" &&
          <View style={styles.bidsContainer}>
            <GreenBitIcon />
            <Text>600</Text>
          </View>
        }
        {
          item.status === "DRAFT" &&
          <EditIcon />
        }
      </TouchableOpacity>
    )
  }

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/api/sgtips/user/${user.id}`);
      // console.log("response user tips==>>", response.data)
      setMySGTips(response.data)
      const publishedTips = response.data.filter(tip => tip.status === "PUBLISHED");
      const draftTips = response.data.filter(tip => tip.status === "DRAFT");
      setActiveTips(publishedTips)
      setDraftTips(draftTips)

    } catch (error) {
      console.error('Failed to fetch SG Tip:', error?.response?.data || error.message);
      setError("Failed to fetch tips. Please try again later.")
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log("mysgTips===>>>", mySGTips)
  // console.log("activeTips===>>>", activeTips)
  // console.log("draftTips===>>>", draftTips)

  if (loading) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator size="large" color={colors.buttonColor} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text>{error}</Text>
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
            <Text style={styles.middleHeading}>Total Tips : 0{mySGTips.length}</Text>
            <Text style={styles.middleHeading}>Active : 0{activeTips.length}</Text>
          </View>
        </View>
      </View>


      <ScrollView style={styles.bottomContainer} contentContainerStyle={{ gap: Metrix.VerticalSize(20), }}>
        <View>
          <Text style={[styles.bottomSameText, { color: colors.buttonColor }]}>Published SG Tips</Text>
          {activeTips.map(renderData)}
          {
            activeTips.length === 0 &&
            <Text style={styles.noPublishTips}>No Published Tips</Text>
          }

        </View>
        <View>
          <Text style={[styles.bottomSameText, { color: colors.redColor }]}>Draft SG Tips</Text>
          {draftTips.map(renderData)}
          {
            draftTips.length === 0 &&
            <Text style={styles.noPublishTips}>No Draft Tips</Text>
          }
        </View>
        <View>
          <Text style={styles.bottomSameText}>Favourite SG Tips</Text>
          {favouriteSGTipsData.map(renderData)}
        </View>

      </ScrollView>

    </View>
  );
}
