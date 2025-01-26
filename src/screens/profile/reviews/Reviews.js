import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import BackArrowIcon from '../../../components/backArrowIcon/BackArrowIcon';
import styles from './style';
import { ProgressBar } from 'react-native-paper';
import { Colors, Images, Metrix } from '../../../config';
import colors from '../../../config/Colors';
import CustomButton from '../../../components/Button/Button';

const reviewsData = [
  { label: 'Excellent', percentage: 0.8 },
  { label: 'Good', percentage: 0.6 },
  { label: 'Average', percentage: 0.4 },
  { label: 'Below Average', percentage: 0.2 },
  { label: 'Poor', percentage: 0.1 },
];

const reviewDetail = [
  {
    id: 1,
    name: "Joan Perkins",
    description: "Love this sofa ! Does exactly what it is supposed to do and so far without any real issues. (You might want to review some Dummy Text generation which contains words and even sentences with a meaning and that should not suppose to happen)",
    time: "1 day ago"
  },
  {
    id: 2,
    name: "Robinson",
    description: "Love this sofa ! Does exactly what it is supposed to do and so far without any real issues. (You might want to review some Dummy Text generation which contains words and even sentences with a meaning and that should not suppose to happen)",
    time: "3 month ago"
  },


]

export default function Reviews() {

  const renderReviewDetail = ({ item }) => {
    return (
      <View style={styles.renderReviewDetail}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(10), alignItems: "center" }}>
            <Image source={Images.homeProfile} style={styles.profileImage} />
            <View>
              <Text style={styles.nameTimeText}>{item.name}</Text>
              <View style={styles.renderStarContainer}>
                {[1, 2, 3, 4].map((_, index) => (
                  <Image source={Images.starGreen} style={styles.renderStarIcon} key={index} />
                ))}
                <Image source={Images.starWhite} style={styles.renderStarIcon} />
              </View>
            </View>
          </View>
          <Text style={styles.nameTimeText}>{item.time}</Text>
        </View>

        <Text style={styles.descriptionText}>{item.description}</Text>
      </View>
    )
  }

  return (
    <View style={styles.reviewsContainer}>
      <View style={styles.topContainer}>
        <BackArrowIcon />
        <Text style={styles.topTitle}>Reviews</Text>
      </View>

      <View style={styles.averageRatingContainer}>
        <Text style={styles.averageRating}>4.0</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4].map((_, index) => (
            <Image source={Images.starGreen} style={styles.starIcon} key={index} />
          ))}
          <Image source={Images.starWhite} style={styles.starIcon} />
        </View>
      </View>

      {/* Review Breakdown */}
      {reviewsData.map((item, index) => (
        <View style={styles.reviewRow} key={index}>
          <Text style={styles.reviewLabel}>{item.label}</Text>
          <ProgressBar progress={item.percentage} color={colors.buttonColor} style={styles.progressBar} />
        </View>
      ))}

      <View style={{ paddingHorizontal: Metrix.HorizontalSize(15) }}>
        <View style={styles.line}></View>
      </View>

      <FlatList data={reviewDetail}
        renderItem={renderReviewDetail}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ marginTop: Metrix.VerticalSize(15), gap: Metrix.VerticalSize(10), borderBottomWidth: 1, borderColor: colors.borderColor, }} />

        <View style={{paddingHorizontal : Metrix.HorizontalSize(40),marginBottom:Metrix.VerticalSize(5)}}>
          <CustomButton title={"Write reviews"}
          height={Metrix.VerticalSize(48)}
          width={"100%"}
          borderRadius={Metrix.VerticalSize(37)}/>
        </View>

    </View>
  );
}
