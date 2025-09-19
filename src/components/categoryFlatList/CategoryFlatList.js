import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Metrix } from '../../config';
import fonts from '../../config/Fonts';
import axiosInstance from '../../config/axios';

// ✅ Import all category SVGs
import { 
  ArtIcon, BabyIcon, BooksIcon, ElectronicIcon, FashionIcon, 
  FoodDrinksIcon, FurnitureIcon, LuxuryIcon, MobileIcon, 
  MusicIcon, OthersIcon, PetsIcon, PropertyIcon, ServicesIcon, 
  SportsIcon, StationaryIcon, ToolsIcon, ToysIcon, VehiclesIcon 
} from '../../assets/svg/categoryIconSVG';
import colors from '../../config/Colors';

// ✅ Default categories (all SVGs now)
// const defaultCategories = [
//   { id: "1", name: "Mobile", icon: MobileIcon },
//   { id: "2", name: "Furniture", icon: FurnitureIcon },
//   { id: "3", name: "Electronics", icon: ElectronicIcon },
//   { id: "4", name: "Fashion", icon: FashionIcon },
//   { id: "5", name: "Books", icon: BooksIcon },
//   { id: "6", name: "Tools", icon: ToolsIcon },
//   { id: "7", name: "Luxury", icon: LuxuryIcon },
//   { id: "8", name: "Services", icon: ServicesIcon },
//   { id: "9", name: "Vehicles", icon: VehiclesIcon },
//   { id: "10", name: "Property", icon: PropertyIcon },
//   { id: "11", name: "Baby", icon: BabyIcon },
//   { id: "12", name: "Toys", icon: ToysIcon },
//   { id: "13", name: "Pets", icon: PetsIcon },
//   { id: "14", name: "Food", icon: FoodDrinksIcon },
//   { id: "15", name: "Sports", icon: SportsIcon },
//   { id: "16", name: "Stationary", icon: StationaryIcon },
//   { id: "17", name: "Music", icon: MusicIcon },
//   { id: "18", name: "Art", icon: ArtIcon },
//   { id: "19", name: "Others", icon: OthersIcon },
// ];

export default function CategoryFlatList({ onCategorySelect, selectedCategory }) {
  const [selectedId, setSelectedId] = useState(selectedCategory);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setSelectedId(selectedCategory);
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/api/categories/getCategories');
      console.log("from category component==>>" , response.data)
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

  // ✅ Map API slugs to SVG icons
  const getCategoryIcon = (slug) => {
    switch (slug?.toLowerCase()) {
      case 'mobile': return MobileIcon;
      case 'furniture': return FurnitureIcon;
      case 'electronics': return ElectronicIcon;
      case 'fashion': return FashionIcon;
      case 'books': return BooksIcon;
      case 'tools': return ToolsIcon;
      case 'luxury': return LuxuryIcon;
      case 'services': return ServicesIcon;
      case 'vehicles': return VehiclesIcon;
      case 'property': return PropertyIcon;
      case 'baby': return BabyIcon;
      case 'toys': return ToysIcon;
      case 'pets': return PetsIcon;
      case 'food': return FoodDrinksIcon;
      case 'sports': return SportsIcon;
      case 'stationary': return StationaryIcon;
      case 'music': return MusicIcon;
      case 'art': return ArtIcon;
      default: return OthersIcon;
    }
  };

  const renderCategory = ({ item }) => {
    const isSelect = selectedId == item.id;
    const IconComponent = item.icon;

    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedId(item.id);
          if (onCategorySelect) {
            onCategorySelect(item);
          }
        }}
        activeOpacity={0.8}
        style={{ width: Metrix.HorizontalSize(73), height: Metrix.VerticalSize(130) }}
      >
        <View style={styles.category}>
          <IconComponent   />
        </View>
        <Text style={[styles.categoryText, isSelect && {color: colors.buttonColor }]}>{item.name}</Text>
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
    borderRadius: Metrix.HorizontalSize(32),
  },
  categoryText: {
    textAlign: "center",
    marginTop: Metrix.VerticalSize(10),
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterRegular,
  },
});
