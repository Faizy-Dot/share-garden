import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Fonts, Metrix } from '../../../config';
import colors from '../../../config/Colors';

const ProductDetail = () => {
  const route = useRoute();
  const { item } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={item?.image} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.location}>{item?.location}</Text>
        <Text style={styles.price}>{item?.price}</Text>
        {/* Add more details as needed */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    width: '100%',
    height: Metrix.VerticalSize(200),
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: Metrix.HorizontalSize(15),
  },
  title: {
    fontSize: Metrix.FontLarge,
    fontFamily: Fonts.InterBold,
    color: colors.buttonColor,
    marginBottom: Metrix.VerticalSize(5),
  },
  location: {
    fontSize: Metrix.FontSmall,
    fontFamily: Fonts.InterRegular,
    color: colors.black,
    marginBottom: Metrix.VerticalSize(10),
  },
  price: {
    fontSize: Metrix.FontMedium,
    fontFamily: Fonts.InterSemiBold,
    color: colors.buttonColor,
  },
});

export default ProductDetail;