

import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Images, Metrix } from '../../config';
import fonts from '../../config/Fonts';

const categories = [
    { id: "1", name: "Mobile", icon: Images.homeCategoryMobile },
    { id: "2", name: "Furniture", icon: Images.homeCategoryFurniture },
    { id: "3", name: "Electronics", icon: Images.homeCategoryElectronics },
    { id: "4", name: "Fashion", icon: Images.homeCategoryShoes },
    { id: "5", name: "Books", icon: Images.homeCategoryBooks },
    { id: "6", name: "Tools", icon: Images.homeTools },
    { id: "7", name: "Luxury", icon: Images.homeLuxury },
    { id: "8", name: "Services", icon: Images.homeServices },
    { id: "9", name: "Vehicles", icon: Images.homeVehicles },
    { id: "10", name: "Property", icon: Images.homeProperty },
    { id: "11", name: "Baby", icon: Images.homeBaby },
    { id: "12", name: "Toys", icon: Images.homeToys },
    { id: "13", name: "Pets", icon: Images.homePets },
    { id: "14", name: "Foods & Drinks", icon: Images.homeFoodDrinks },
    { id: "15", name: "Sports   Equipment", icon: Images.homeSports },
    { id: "16", name: "Staionary", icon: Images.homeStationary },
    { id: "17", name: "Music", icon: Images.homeMusic },
    { id: "18", name: "Art", icon: Images.homeArt },
    { id: "19", name: "Others", icon: Images.homeOthers },
];

export default function CategoryFlatList() {
    
    const [selectedId, setSelectedId] = useState(null)

    const renderCategory = ({ item }) => {

        const isSelect = selectedId == item.id
        return (
            <TouchableOpacity onPress={() => setSelectedId(item.id)} activeOpacity={0.8} style={{ width: Metrix.HorizontalSize(73), height: Metrix.VerticalSize(130) }}>
                <View style={[styles.category, isSelect && { backgroundColor: "#5B5B5B" }]}>
                    <Image source={item.icon} />
                </View>
                <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>

        )
    }



  return (
    <FlatList
    data={categories}
    renderItem={renderCategory}
    keyExtractor={(item) => item.id}
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.categoryList}
/>
  );
}


const styles = StyleSheet.create({
   
    categoryList: {
        gap: Metrix.HorizontalSize(10),
        alignItems: "center",
       
    },
    category: {
        backgroundColor: "#F3F3F3",
        width: Metrix.HorizontalSize(64),
        height: Metrix.HorizontalSize(64),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: Metrix.VerticalSize(32)
    },

    categoryText: {
        textAlign: "center",
        marginTop: Metrix.VerticalSize(10),
        fontSize : Metrix.FontSmall,
        fontFamily : fonts.InterRegular
    },
})