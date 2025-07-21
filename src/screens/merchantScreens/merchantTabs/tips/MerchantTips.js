import { FlatList, Image, Text, View, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";
// BackArrowIcon removed since MerchantNavbar already includes it
import MerchantNavbar from "../../../../components/navBar/MerchantNavbar";
import { Images, Metrix } from "../../../../config";
import CustomInput from "../../../../components/customInput/CustomInput";
import DropdownComponent from "../../../../components/dropDown/DropDownInput";
import fonts from "../../../../config/Fonts";
import colors from "../../../../config/Colors";
import { LikesIcon, ShareIcon, TimeIcon, ViewsIcon } from "../../../../assets/svg";
import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../../config/axios";
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default function MerchantTips({navigation}) {
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [likingTipId, setLikingTipId] = useState(null);

    const calculateTimeAgo = (publishedAt) => {
        if (!publishedAt) return '0h';
        
        const now = new Date();
        const published = new Date(publishedAt);
        const diffInMs = now - published;
        
        // Convert to hours
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        
        if (diffInHours < 24) {
            return `${diffInHours}h`;
        } else {
            const diffInDays = Math.floor(diffInHours / 24);
            return `${diffInDays}d`;
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('/api/categories/getCategories');
            const formattedCategories = response.data.map(category => ({
                label: category.name,
                value: category.id
            }));
            setCategories(formattedCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to fetch categories'
            });
        }
    };

    const fetchTips = useCallback(async () => {
        try {
            setLoading(true);
            let url = '/api/sgtips/published';
            const params = new URLSearchParams();

            if (selectedCategory?.value) {
                params.append('categoryId', selectedCategory.value);
            }
            if (searchQuery.trim()) {
                params.append('search', searchQuery.trim());
            }

            if (params.toString()) {
                url += `?${params.toString()}`;
            }

            console.log('Fetching tips from URL:', url);
            const response = await axiosInstance.get(url);
            console.log('Raw API Response:', response.data);

            let tipsData = [];
            if (Array.isArray(response.data)) {
                tipsData = response.data;
            } else if (response.data && Array.isArray(response.data.data)) {
                tipsData = response.data.data;
            } else {
                console.error('Unexpected API response format:', response.data);
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Invalid response format from server'
                });
            }

            // Process images for each tip
            tipsData = tipsData.map(tip => ({
                ...tip,
                imageArray: tip.images ? tip.images.split(',').map(url => url.trim()).filter(url => url) : []
            }));

            setTips(tipsData);
            console.log('Processed tips data:', tipsData.length, 'tips');
        } catch (error) {
            console.error('Error fetching tips:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to fetch tips'
            });
        } finally {
            setLoading(false);
        }
    }, [selectedCategory, searchQuery]);

    useFocusEffect(
        useCallback(() => {
            fetchCategories();
            fetchTips();
        }, [fetchTips])
    );

    const handleLike = async (tipId) => {
        try {
            setLikingTipId(tipId);
            const response = await axiosInstance.post(`/api/sgtips/${tipId}/like`);
            
            // Update the tip's like status in the local state
            setTips(prevTips => 
                prevTips.map(tip => 
                    tip.id === tipId 
                        ? { 
                            ...tip, 
                            isLiked: !tip.isLiked,
                            _count: {
                                ...tip._count,
                                likes: tip.isLiked ? (tip._count.likes || 1) - 1 : (tip._count.likes || 0) + 1
                            }
                        } 
                        : tip
                )
            );

            Toast.show({
                type: 'success',
                text1: tip.isLiked ? 'Tip unliked' : 'Tip liked',
            });
        } catch (error) {
            console.error('Error liking tip:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to like tip'
            });
        } finally {
            setLikingTipId(null);
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const clearCategory = () => {
        setSelectedCategory(null);
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    const handleSearchSubmit = () => {
        setIsSearching(true);
        fetchTips();
    };

    const clearSearch = () => {
        setSearchQuery('');
        setIsSearching(false);
    };

    const renderCategory = ({ item }) => {
        console.log('Rendering tip with ID:', item.id);
        const firstImage = item.imageArray && item.imageArray.length > 0 ? item.imageArray[0] : null;
        const timeAgo = calculateTimeAgo(item.publishedAt);
        
        return (
            <TouchableOpacity onPress={()=> navigation.navigate("TipsDetail",item)} style={styles.categoryContainer}>
                <View style={{ flexDirection: "row", padding: 20, gap: Metrix.HorizontalSize(15), width: "100%" }}>
                    <Image 
                        source={firstImage ? { uri: firstImage } : Images.homePopularListing} 
                        style={{ width: Metrix.HorizontalSize(119), height: Metrix.HorizontalSize(116) }}
                        resizeMode="cover"
                    />
                    <View style={{ width: Metrix.HorizontalSize(200), gap: 10, height: Metrix.VerticalSize(116) }}>
                        <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterSemiBold, color: colors.buttonColor }}>{item.title}</Text>
                        <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterRegular }}>{item.description}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <View style={styles.logoContainer}>
                        <ViewsIcon />
                        <Text style={styles.containertext}>{item.views || 0} Views</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.logoContainer}
                        onPress={() => handleLike(item.id)}
                        disabled={likingTipId === item.id}
                    >
                        <LikesIcon fill={item.isLiked ? colors.redColor : 'none'} />
                        <Text style={styles.containertext}>{item._count.likes || 0} Likes</Text>
                    </TouchableOpacity>
                    <View style={styles.logoContainer}>
                        <ShareIcon />
                        <Text style={styles.containertext}>{item.shares || 0} Shared</Text>
                    </View>
                    <View style={styles.logoContainer}>
                        <TimeIcon />
                        <Text style={styles.containertext}>{timeAgo}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.tipsContainer}>
            <View>
                <MerchantNavbar title={"Explore SG Tips"} />
            </View>

            <View style={{ marginTop: Metrix.VerticalSize(22), gap: 10, flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <View style={{ flex: 1 }}>
                        <CustomInput 
                            iconCondition={false} 
                            onChangeText={handleSearch}
                            value={searchQuery}
                            placeholder="Search tips..."
                            onSubmitEditing={handleSearchSubmit}
                            returnKeyType="search"
                        />
                    </View>
                    {searchQuery && (
                        <TouchableOpacity 
                            onPress={clearSearch}
                            style={styles.clearButton}
                        >
                            <Text style={{ color: colors.buttonColor }}>Clear</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <View style={{ flex: 1 }}>
                    <DropdownComponent
                            placeholder={"Select Category"}
                            data={categories}
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        />
                    </View>
                    {selectedCategory && (
                        <TouchableOpacity 
                            onPress={clearCategory}
                            style={styles.clearButton}
                        >
                            <Text style={{ color: colors.buttonColor }}>Clear</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {loading ? (
                    <View style={styles.loadingContainer}>
                        <Text>Loading...</Text>
                    </View>
                ) : (
                <FlatList
                        data={tips}
                    renderItem={renderCategory}
                        keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.categoryList}
                    showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                        ListEmptyComponent={() => (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>No tips found</Text>
                            </View>
                        )}
                    />
                )}
            </View>
        </View>
    );
}
