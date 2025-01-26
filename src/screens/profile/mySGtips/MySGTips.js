import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import NavBar from '../../../components/navBar/NavBar';
import BackArrowIcon from '../../../components/backArrowIcon/BackArrowIcon';
import styles from './style';
import { Images, Metrix } from '../../../config';
import fonts from '../../../config/Fonts';
import colors from '../../../config/Colors';


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
    edit : true
  },
  {
    id: 2,
    title: "How to style your wardrobe",
    edit : true
  }
]

const renderData = (item) => {
  return (
    <View key={item.id} style={styles.renderDataContainer}>
      <View style={styles.renderLeftContainer}>
        <Image source={Images.tipsBlackTab} style={styles.renderTipsIcon} />
        <Text style={styles.renderTitle}>{item.title}</Text>
      </View>
      {
        item.bids &&
        <View style={styles.bidsContainer}>
          <Image source={Images.homeGreenBit} style={styles.bitIcon} />
          <Text>{item.bids}</Text>
        </View>
      }
      {
        item.edit &&
        <Image source={Images.editIcon} style={styles.editIcon}/>
      }
    </View>
  )
}

export default function MySGTips() {
  return (
    <View style={styles.myTipsContainer}>
      <View style={styles.topContainer}>
        <BackArrowIcon />
        <NavBar title={"My Bids"} />
      </View>

      <View style={styles.middleContainer}>
        <Text style={styles.middleHeading}>Earned Points via SG Tips</Text>
        <View style={styles.middleSame}>
          <Image source={Images.homeGreenBit} />
          <Text style={styles.middleBids}>10,300</Text>
        </View>
        <View style={styles.middleSame}>
          <Image source={Images.earnArrowIcon} />
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
