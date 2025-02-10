import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Images, Metrix } from '../../config';
import fonts from '../../config/Fonts';
import axiosInstance from '../../config/axios';

const defaultCategories = [
    { id: "1", name: "Mobile", icon: Images.homeCategoryMobile },
    { id: "2", name: "Furniture", icon: Images.homeCategoryFurniture },
    { id: "3", name: "Electronics", icon: Images.homeCategoryElectronics },
    // ... keep all existing default categories
];

export default function CategoryFlatList() {
    const [selectedId, setSelectedId] = useState(null);
    const [categories, setCategories] = useState(defaultCategories);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('/api/categories/getCategories');
            const mappedCategories = response.data.map(category => ({
                id: category.id,
                name: category.name,
                icon: getCategoryIcon(category.slug)
            }));
            setCategories(mappedCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const getCategoryIcon = (slug) => {
        switch (slug?.toLowerCase()) {
            case 'mobile': return Images.homeCategoryMobile;
            case 'furniture': return Images.homeCategoryFurniture;
            case 'electronics': return Images.homeCategoryElectronics;
            case 'fashion': return Images.homeCategoryShoes;
            case 'books': return Images.homeCategoryBooks;
            case 'tools': return Images.homeTools;
            case 'luxury': return Images.homeLuxury;
            case 'services': return Images.homeServices;
            case 'vehicles': return Images.homeVehicles;
            case 'property': return Images.homeProperty;
            case 'baby': return Images.homeBaby;
            case 'toys': return Images.homeToys;
            case 'pets': return Images.homePets;
            case 'food': return Images.homeFoodDrinks;
            case 'sports': return Images.homeSports;
            case 'stationary': return Images.homeStationary;
            case 'music': return Images.homeMusic;
            case 'art': return Images.homeArt;
            default: return Images.homeOthers;
        }
    };

    const renderCategory = ({ item }) => {
        const isSelect = selectedId == item.id;
        return (
            <TouchableOpacity 
                onPress={() => setSelectedId(item.id)} 
                activeOpacity={0.8} 
                style={{ width: Metrix.HorizontalSize(73), height: Metrix.VerticalSize(130) }}
            >
                <View style={[styles.category, isSelect && { backgroundColor: "#5B5B5B" }]}>
                    <Image source={item.icon} />
                </View>
                <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

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
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterRegular
    },
});